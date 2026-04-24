#!/usr/bin/env node
/**
 * Migrate src/program-management-with-jira/*.md to Confluence pages
 *
 * - Creates child pages under parent page 1290764313 (APMTM space)
 * - Uploads images as attachments to each page
 * - Converts markdown/HTML to ADF (Atlassian Document Format)
 * - Unsupported HTML elements are wrapped in `<!-- BITOVI_CUSTOM -->` html code blocks
 * - Outputs migration-report.json with details on skipped/degraded elements
 *
 * Usage:
 *   node scripts/migrate-to-confluence.mjs
 *   node scripts/migrate-to-confluence.mjs --page=program-management  # single page
 *   node scripts/migrate-to-confluence.mjs --dry-run                  # preview only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const ENV_PATH = path.join(ROOT, '.env');
loadEnv(ENV_PATH);

const ATLASSIAN_BASE = 'https://bitovi.atlassian.net';
const ATLASSIAN_EMAIL = process.env.ATLASSIAN_EMAIL;
const ATLASSIAN_API_TOKEN = process.env.ATLASSIAN_API_TOKEN;
const PARENT_PAGE_ID = '1290764313';
const SOURCE_DIR = path.join(ROOT, 'src/program-management-with-jira');
const IMAGES_BASE = path.join(ROOT, 'static/img/program-management-with-jira');

if (!ATLASSIAN_EMAIL || !ATLASSIAN_API_TOKEN) {
  console.error('Missing ATLASSIAN_EMAIL or ATLASSIAN_API_TOKEN in .env');
  process.exit(1);
}

const AUTH_HEADER = `Basic ${Buffer.from(`${ATLASSIAN_EMAIL}:${ATLASSIAN_API_TOKEN}`).toString('base64')}`;

// CLI flags
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SINGLE_PAGE = args.find(a => a.startsWith('--page='))?.split('=')[1];

if (DRY_RUN) console.log('[DRY RUN] No pages will be created or modified.\n');

// ---------------------------------------------------------------------------
// Page definitions - order matters (parents before children)
// ---------------------------------------------------------------------------

/** @type {Array<{file: string, title: string, order: number}>} */
const PAGES = [
  { file: 'program-management.md',             title: 'Agile Program Management With Jira',    order: 0, updatePageId: '1290764313' },
  { file: '0-jira-account-setup.md',           title: 'Jira Account Setup',                    order: 1 },
  { file: '1-continuous-exploration-overview.md', title: 'Continuous Exploration',              order: 2 },
  { file: '2-product-overview.md',             title: 'Product Overview',                      order: 3 },
  { file: '3-cx-board-setup.md',               title: 'Continuous Exploration Board',          order: 4 },
  { file: '4-ideas.md',                        title: 'Ideas',                                 order: 5 },
  { file: '5-refinement.md',                   title: 'Refinement',                            order: 6 },
  { file: '6-validating.md',                   title: 'Validating',                            order: 7 },
  { file: '7-advanced-roadmap-setup.md',       title: 'Advanced Roadmap Setup',                order: 8 },
  { file: '8-estimating.md',                   title: 'Estimating',                            order: 9 },
  { file: '9-breaking-long-poles.md',          title: 'Breaking Long Poles',                   order: 10 },
  { file: '10-prioritizing.md',                title: 'Prioritizing',                          order: 11 },
  { file: '11-scheduling.md',                  title: 'Scheduling',                            order: 12 },
  { file: '12-reporting.md',                   title: 'Reporting',                             order: 13 },
  { file: '13-manage.md',                      title: 'Managing',                              order: 14 },
];

// ---------------------------------------------------------------------------
// Migration report
// ---------------------------------------------------------------------------

const report = {
  pagesCreated: [],
  pagesUpdated: [],
  imagesUploaded: [],
  skipped: [],       // { file, element, reason, line }
  errors: [],
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const pagesToMigrate = SINGLE_PAGE
    ? PAGES.filter(p => p.file.includes(SINGLE_PAGE))
    : PAGES;

  if (pagesToMigrate.length === 0) {
    console.error(`No pages matched --page=${SINGLE_PAGE}`);
    process.exit(1);
  }

  // Map of title -> confluencePageId for cross-linking
  const createdPageIds = {};

  for (const pageDef of pagesToMigrate) {
    const filePath = path.join(SOURCE_DIR, pageDef.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`  [WARN] File not found: ${pageDef.file}`);
      continue;
    }

    console.log(`\n→ Processing: ${pageDef.file}`);
    const raw = fs.readFileSync(filePath, 'utf8');

    // Parse the content
    const { markdown, imagePaths, skippedElements } = parseSourceFile(raw, pageDef.file);

    // Track skipped elements
    report.skipped.push(...skippedElements);

    // Convert to ADF
    const adf = markdownToAdf(markdown);

    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would create/update: "${pageDef.title}"`);
      console.log(`  Images to upload: ${imagePaths.length}`);
      console.log(`  Skipped elements: ${skippedElements.length}`);
      if (skippedElements.length) {
        skippedElements.forEach(s => console.log(`    - ${s.element}: ${s.reason}`));
      }
      continue;
    }

    // Create or update the Confluence page
    const pageId = pageDef.updatePageId
      ? await updatePageContent(pageDef.updatePageId, pageDef.title, adf).then(() => pageDef.updatePageId)
      : await upsertPage(pageDef.title, adf);
    if (!pageId) continue;

    createdPageIds[pageDef.title] = pageId;
    console.log(`  ✓ Page ready: ${pageId} "${pageDef.title}"`);

    // Upload images and update page with attachment references
    if (imagePaths.length > 0) {
      const attachmentMap = await uploadImages(pageId, imagePaths, pageDef.file);
      if (Object.keys(attachmentMap).length > 0) {
        const updatedAdf = replaceImageRefsInAdf(adf, attachmentMap);
        await updatePageContent(pageId, pageDef.title, updatedAdf);
        console.log(`  ✓ Updated page with ${Object.keys(attachmentMap).length} image(s)`);
      }
    }
  }

  // Write report
  const reportPath = path.join(ROOT, 'scripts/migration-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n✓ Migration complete. Report: ${reportPath}`);
  console.log(`  Pages created: ${report.pagesCreated.length}`);
  console.log(`  Pages updated: ${report.pagesUpdated.length}`);
  console.log(`  Images uploaded: ${report.imagesUploaded.length}`);
  console.log(`  Skipped elements: ${report.skipped.length}`);
  if (report.errors.length) {
    console.log(`  Errors: ${report.errors.length}`);
    report.errors.forEach(e => console.error(`    - ${e}`));
  }
}

// ---------------------------------------------------------------------------
// Source file parser
// ---------------------------------------------------------------------------

/**
 * Parse a .md source file, stripping bit-docs directives and converting
 * problematic HTML to either plain markdown or BITOVI_CUSTOM code blocks.
 *
 * Returns:
 *  - markdown: cleaned markdown string ready for ADF conversion
 *  - imagePaths: list of local image paths found
 *  - skippedElements: list of elements that couldn't be converted natively
 */
function parseSourceFile(raw, filename) {
  const imagePaths = [];
  const skippedElements = [];
  let lineNum = 0;

  // Remove bit-docs directives at top
  let content = raw
    .replace(/^@page .+$/gm, '')
    .replace(/^@parent .+$/gm, '')
    .replace(/^@description .+(\n.+)*/gm, '')  // may span lines until @body
    .replace(/^@metaogimage .+$/gm, '')
    .replace(/^@body\s*$/gm, '')
    .replace(/^@outline .+$/gm, '')
    .replace(/^@hide\s*$/gm, '')
    .trim();

  // Track line numbers (approximate)
  const lines = content.split('\n');
  const processedLines = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    lineNum = i + 1;

    // -----------------------------------------------------------------------
    // <img src="..."> → collect path, replace with markdown image
    // May span multiple lines e.g.:
    //   <img src="..."
    //        class="..."/>
    // -----------------------------------------------------------------------
    if (line.trim().startsWith('<img ') || line.trim().startsWith('<img\t')) {
      // Collect all lines until the tag closes
      const imgLines = [line];
      let j = i;
      while (j < lines.length && !imgLines.join('').includes('/>') && !imgLines.join('').includes('</img>')) {
        j++;
        if (j < lines.length) imgLines.push(lines[j]);
      }
      const imgTag = imgLines.join(' ');
      const srcMatch = imgTag.match(/src="([^"]+)"/);
      const altMatch = imgTag.match(/alt="([^"]*)"/);
      if (srcMatch) {
        const srcAttr = srcMatch[1];
        const localPath = resolveImgPath(srcAttr);
        if (localPath && fs.existsSync(localPath)) {
          imagePaths.push(localPath);
          const alt = altMatch ? altMatch[1] : path.basename(localPath, path.extname(localPath));
          const placeholder = `![${alt}](ATTACHMENT:${encodeURIComponent(localPath)})`;
          processedLines.push(placeholder);
        } else {
          processedLines.push(imgTag.trim());
          skippedElements.push({ file: filename, line: lineNum, element: 'img', reason: `Local file not found: ${srcAttr}` });
        }
      }
      i = j + 1;
      continue;
    }

    // -----------------------------------------------------------------------
    // <iframe ...> → native Confluence iframe macro (ADF extension node)
    // -----------------------------------------------------------------------
    if (line.includes('<iframe')) {
      // Collect full iframe (may span multiple lines)
      const iframeLines = [line];
      while (i + 1 < lines.length && !lines[i].includes('</iframe>') && !lines[i].includes('/>')) {
        i++;
        iframeLines.push(lines[i]);
      }
      if (!iframeLines[iframeLines.length - 1].includes('</iframe>') && !iframeLines[iframeLines.length - 1].includes('/>')) {
        i++;
        if (i < lines.length) iframeLines.push(lines[i]);
      }
      const iframeHtml = iframeLines.join('\n');
      const srcMatch = iframeHtml.match(/src="([^"]+)"/);
      const src = srcMatch ? srcMatch[1] : '';

      // YouTube embed URLs → embedCard node
      const youtubeMatch = src.match(/youtube\.com\/embed\/([^?&"]+)/);
      let iframeAdf;
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        iframeAdf = {
          type: 'embedCard',
          attrs: {
            layout: 'wide',
            originalHeight: 480,
            width: 100,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            originalWidth: 853.34,
          },
        };
      } else {
        iframeAdf = {
          type: 'extension',
          attrs: {
            layout: 'full-width',
            extensionType: 'com.atlassian.confluence.macro.core',
            extensionKey: 'iframe',
            parameters: {
              macroParams: {
                src: { value: src },
                width: { value: '99%' },
                height: { value: '600px' },
                marginwidth: { value: '10' },
                marginheight: { value: '10' },
                allowfullscreen: { value: 'true' },
              },
              macroMetadata: {
                schemaVersion: { value: '1' },
                title: 'Iframe',
              },
            },
          },
        };
      }
      processedLines.push('%%ADF_NODE%%' + JSON.stringify(iframeAdf));
      i++;
      continue;
    }

    // -----------------------------------------------------------------------
    // <div class="ads-red-border-300"> → BITOVI_CUSTOM, capture whole block
    // -----------------------------------------------------------------------
    if (line.includes('class="ads-red-border-300"')) {
      const blockLines = collectHtmlBlock(lines, i, '<div', '</div>');
      processedLines.push('```html');
      processedLines.push('<!-- BITOVI_CUSTOM -->');
      processedLines.push(blockLines.html);
      processedLines.push('```');
      skippedElements.push({
        file: filename,
        line: lineNum,
        element: 'div.ads-red-border-300',
        reason: 'Marketing promo widget → BITOVI_CUSTOM block',
      });
      i += blockLines.consumed;
      continue;
    }

    // -----------------------------------------------------------------------
    // <div class='jira-issue'> → BITOVI_CUSTOM block
    // -----------------------------------------------------------------------
    if (line.includes("class='jira-issue'") || line.includes('class="jira-issue"')) {
      const blockLines = collectHtmlBlock(lines, i, '<div', '</div>');
      processedLines.push('```html');
      processedLines.push('<!-- BITOVI_CUSTOM -->');
      processedLines.push(blockLines.html);
      processedLines.push('```');
      skippedElements.push({
        file: filename,
        line: lineNum,
        element: 'div.jira-issue',
        reason: 'Jira issue mockup → BITOVI_CUSTOM block',
      });
      i += blockLines.consumed;
      continue;
    }

    // -----------------------------------------------------------------------
    // <span class="color-*"> → strip to plain text
    // -----------------------------------------------------------------------
    if (line.includes('<span class="color-') || line.includes("<span class='color-")) {
      const cleaned = line.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
      processedLines.push(cleaned);
      skippedElements.push({
        file: filename,
        line: lineNum,
        element: 'span.color-*',
        reason: 'Color styling stripped (no ADF equivalent)',
      });
      i++;
      continue;
    }

    // -----------------------------------------------------------------------
    // <span class="color-* bold"> inline in headings etc → strip tags
    // -----------------------------------------------------------------------
    if (line.includes('<span ')) {
      const cleaned = line.replace(/<span[^>]*>/g, '').replace(/<\/span>/g, '');
      processedLines.push(cleaned);
      i++;
      continue;
    }

    // -----------------------------------------------------------------------
    // [learn-agile-program-management-with-jira/page-slug Link Text] →
    // convert to plain text with a note (links resolved after all pages made)
    // -----------------------------------------------------------------------
    const internalLinkMatch = line.match(/\[learn-agile-program-management-with-jira\/([^\s\]]+)(?:\s+([^\]]+))?\]/g);
    if (internalLinkMatch) {
      let cleaned = line;
      for (const match of internalLinkMatch) {
        const inner = match.match(/\[learn-agile-program-management-with-jira\/([^\s\]]+)(?:\s+([^\]]+))?\]/);
        const slug = inner[1];
        const linkText = inner[2] || slug;
        // Replace with italicized text noting it's a cross-reference
        cleaned = cleaned.replace(match, `*${linkText}*`);
      }
      processedLines.push(cleaned);
      i++;
      continue;
    }

    // -----------------------------------------------------------------------
    // <code>[timestamp](url) → convert to plain markdown link
    // -----------------------------------------------------------------------
    if (line.includes('<code>[') && line.includes('](http')) {
      const cleaned = line.replace(/<code>/g, '').replace(/<\/code>/g, '');
      processedLines.push(cleaned);
      i++;
      continue;
    }

    // -----------------------------------------------------------------------
    // <table ...> → convert to ADF table node via passthrough marker
    // -----------------------------------------------------------------------
    if (line.match(/^<table[^>]*>/i)) {
      const blockData = collectHtmlBlock(lines, i, '<table', '</table>');
      const adfNode = htmlTableToAdf(blockData.html);
      processedLines.push('%%ADF_NODE%%' + JSON.stringify(adfNode));
      i += blockData.consumed;
      continue;
    }

    // -----------------------------------------------------------------------
    // Remaining raw HTML tags that are block-level → BITOVI_CUSTOM if complex
    // -----------------------------------------------------------------------
    const complexHtmlMatch = line.match(/^<(form|div)[^>]*>/);
    if (complexHtmlMatch && !line.includes('</')) {
      const tag = complexHtmlMatch[1];
      const blockLines = collectHtmlBlock(lines, i, `<${tag}`, `</${tag}>`);
      processedLines.push('```html');
      processedLines.push('<!-- BITOVI_CUSTOM -->');
      processedLines.push(blockLines.html);
      processedLines.push('```');
      skippedElements.push({
        file: filename,
        line: lineNum,
        element: tag,
        reason: `Complex HTML <${tag}> block → BITOVI_CUSTOM block`,
      });
      i += blockLines.consumed;
      continue;
    }

    processedLines.push(line);
    i++;
  }

  return {
    markdown: processedLines.join('\n'),
    imagePaths: [...new Set(imagePaths)],
    skippedElements,
  };
}

// ---------------------------------------------------------------------------
// HTML table → ADF converter
// ---------------------------------------------------------------------------

function htmlTableToAdf(html) {
  const tableRows = [];

  // Extract header rows from <thead>, body rows from <tbody> (or bare <tr>)
  function extractRows(source, defaultIsHeader) {
    const result = [];
    let pos = 0;
    while (true) {
      const start = source.indexOf('<tr', pos);
      if (start === -1) break;
      const end = source.indexOf('</tr>', start);
      if (end === -1) break;
      result.push({ html: source.slice(start, end + 5), isHeader: defaultIsHeader });
      pos = end + 5;
    }
    return result;
  }

  const theadStart = html.toLowerCase().indexOf('<thead');
  const theadEnd = html.toLowerCase().indexOf('</thead>');
  const tbodyStart = html.toLowerCase().indexOf('<tbody');
  const tbodyEnd = html.toLowerCase().indexOf('</tbody>');

  let allRows = [];
  if (theadStart !== -1 && theadEnd !== -1) {
    allRows.push(...extractRows(html.slice(theadStart, theadEnd + 8), true));
  }
  if (tbodyStart !== -1 && tbodyEnd !== -1) {
    allRows.push(...extractRows(html.slice(tbodyStart, tbodyEnd + 8), false));
  }
  if (allRows.length === 0) {
    allRows = extractRows(html, false);
  }

  for (const { html: rowHtml, isHeader: rowIsHeader } of allRows) {
    const cells = [];
    let pos = 0;
    while (true) {
      // find next <th or <td
      const thStart = rowHtml.indexOf('<th', pos);
      const tdStart = rowHtml.indexOf('<td', pos);
      let cellStart, isHeaderCell;
      if (thStart === -1 && tdStart === -1) break;
      if (thStart === -1) { cellStart = tdStart; isHeaderCell = false; }
      else if (tdStart === -1) { cellStart = thStart; isHeaderCell = true; }
      else if (thStart < tdStart) { cellStart = thStart; isHeaderCell = true; }
      else { cellStart = tdStart; isHeaderCell = false; }

      const closeTag = isHeaderCell ? '</th>' : '</td>';
      const cellEnd = rowHtml.indexOf(closeTag, cellStart);
      if (cellEnd === -1) break;

      const cellOuter = rowHtml.slice(cellStart, cellEnd + closeTag.length);
      // strip the opening tag to get inner content
      const innerStart = cellOuter.indexOf('>');
      const cellContent = innerStart !== -1 ? cellOuter.slice(innerStart + 1) : '';

      cells.push({
        type: isHeaderCell || rowIsHeader ? 'tableHeader' : 'tableCell',
        attrs: { colspan: 1, rowspan: 1, colwidth: null, background: null },
        content: htmlCellToAdfParagraphs(cellContent),
      });
      pos = cellEnd + closeTag.length;
    }
    if (cells.length > 0) {
      tableRows.push({ type: 'tableRow', content: cells });
    }
  }

  return {
    type: 'table',
    attrs: { isNumberColumnEnabled: false, layout: 'default' },
    content: tableRows,
  };
}

function htmlCellToAdfParagraphs(html) {
  const paragraphs = [];
  let pos = 0;
  let found = false;
  while (true) {
    const start = html.indexOf('<p', pos);
    if (start === -1) break;
    const end = html.indexOf('</p>', start);
    if (end === -1) break;
    found = true;
    const innerStart = html.indexOf('>', start);
    const inner = html.slice(innerStart + 1, end);
    const nodes = htmlToAdfInline(inner);
    if (nodes.length > 0) paragraphs.push({ type: 'paragraph', content: nodes });
    pos = end + 4;
  }
  if (!found) {
    const nodes = htmlToAdfInline(html);
    if (nodes.length > 0) paragraphs.push({ type: 'paragraph', content: nodes });
  }
  return paragraphs.length > 0 ? paragraphs : [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }];
}

function htmlToAdfInline(html) {
  // Replace <br> with space
  let src = html.replace(/<br\s*\/?>/gi, ' ');
  const nodes = [];

  // Split on recognized inline tags; everything else is plain text
  const tagPattern = '<strong>|</strong>|<em>|</em>|<code>|</code>|<a [^>]+>|</a>';
  const parts = src.split(new RegExp(`(${tagPattern})`, 'i'));

  let marks = [];
  let currentHref = null;

  for (const part of parts) {
    if (!part) continue;
    const lp = part.toLowerCase();
    if (lp === '<strong>') { marks.push({ type: 'strong' }); }
    else if (lp === '</strong>') { marks = marks.filter(m => m.type !== 'strong'); }
    else if (lp === '<em>') { marks.push({ type: 'em' }); }
    else if (lp === '</em>') { marks = marks.filter(m => m.type !== 'em'); }
    else if (lp === '<code>') { marks.push({ type: 'code' }); }
    else if (lp === '</code>') { marks = marks.filter(m => m.type !== 'code'); }
    else if (lp.startsWith('<a ')) {
      const hrefM = part.match(/href="([^"]+)"/);
      currentHref = hrefM ? hrefM[1] : null;
      if (currentHref) marks.push({ type: 'link', attrs: { href: currentHref } });
    }
    else if (lp === '</a>') {
      marks = marks.filter(m => m.type !== 'link');
      currentHref = null;
    }
    else {
      // plain text (may contain stray tags — strip them)
      const text = part.replace(/<[^>]+>/g, '');
      if (text) nodes.push(marks.length > 0 ? { type: 'text', text, marks: [...marks] } : { type: 'text', text });
    }
  }
  return nodes;
}

// ---------------------------------------------------------------------------
// HTML block collector (handles nested divs)
// ---------------------------------------------------------------------------

function collectHtmlBlock(lines, startIndex, openTag, closeTag) {
  let depth = 0;
  const collected = [];
  let i = startIndex;
  const MAX_LINES = 500; // safety guard

  // Build simple string patterns (not regex) for counting
  const openStr = openTag;   // e.g. '<div'
  const closeStr = closeTag; // e.g. '</div>'

  while (i < lines.length && (i - startIndex) < MAX_LINES) {
    const line = lines[i];
    collected.push(line);

    // Count tag occurrences using simple indexOf loop (no regex = no backtracking)
    let pos = 0;
    while ((pos = line.indexOf(openStr, pos)) !== -1) { depth++; pos += openStr.length; }
    pos = 0;
    while ((pos = line.indexOf(closeStr, pos)) !== -1) { depth--; pos += closeStr.length; }

    if (depth <= 0 && i > startIndex) {
      i++;
      break;
    }
    i++;
  }

  return {
    html: collected.join('\n'),
    consumed: Math.max(1, i - startIndex), // always advance at least 1
  };
}

// ---------------------------------------------------------------------------
// Resolve image path from src attribute
// ---------------------------------------------------------------------------

function resolveImgPath(src) {
  // src like "../static/img/program-management-with-jira/home/foo.png"
  const stripped = src.replace(/^\.\.\//, '');
  return path.join(ROOT, stripped);
}

// ---------------------------------------------------------------------------
// Markdown → ADF converter (using marklassian approach)
// ---------------------------------------------------------------------------

/**
 * Convert markdown string to ADF document.
 * We implement a lightweight parser that handles the constructs in these files.
 */
function markdownToAdf(markdown) {
  const lines = markdown.split('\n');
  const content = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Embedded ADF node (e.g. from HTML table conversion)
    if (line.startsWith('%%ADF_NODE%%')) {
      try {
        content.push(JSON.parse(line.slice(12)));
      } catch { /* ignore malformed */ }
      i++;
      continue;
    }

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // consume closing ```
      content.push({
        type: 'codeBlock',
        attrs: { language: lang || null },
        content: [{ type: 'text', text: codeLines.join('\n') }],
      });
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      content.push({
        type: 'heading',
        attrs: { level },
        content: parseInline(headingMatch[2]),
      });
      i++;
      continue;
    }

    // Setext-style headings: text followed by === (H1) or --- (H2)
    const nextLine = lines[i + 1];
    if (nextLine && /^=+$/.test(nextLine.trim()) && line.trim()) {
      content.push({ type: 'heading', attrs: { level: 1 }, content: parseInline(line.trim()) });
      i += 2;
      continue;
    }
    if (nextLine && /^-+$/.test(nextLine.trim()) && nextLine.trim().length >= 2 && line.trim()) {
      content.push({ type: 'heading', attrs: { level: 2 }, content: parseInline(line.trim()) });
      i += 2;
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/) || line.match(/^\*\*\*+$/) || line.match(/^___+$/)) {
      content.push({ type: 'rule' });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      content.push({
        type: 'blockquote',
        content: [{ type: 'paragraph', content: parseInline(quoteLines.join(' ')) }],
      });
      continue;
    }

    // Unordered list
    if (line.match(/^(\s*)[-*+]\s/)) {
      const baseIndent = line.match(/^(\s*)/)[1].length;
      const result = parseList(lines, i, false, baseIndent);
      content.push(result.node);
      i += Math.max(1, result.consumed);
      continue;
    }

    // Ordered list
    if (line.match(/^(\s*)\d+\.\s/)) {
      const baseIndent = line.match(/^(\s*)/)[1].length;
      const result = parseList(lines, i, true, baseIndent);
      content.push(result.node);
      i += Math.max(1, result.consumed);
      continue;
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const result = parseTable(lines, i);
      if (result) {
        content.push(result.node);
        i += result.consumed;
        continue;
      }
    }

    // Image (markdown format from our pre-processor)
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      // For attachment placeholders, we'll replace after upload
      // For now emit a mediaSingle with the src in attrs for later replacement
      content.push({
        type: 'mediaSingle',
        attrs: { layout: 'center' },
        content: [{
          type: 'media',
          attrs: {
            type: 'external',
            url: src,
            alt,
            // __localPath is a hint for post-processing
            __localPath: src.startsWith('ATTACHMENT:') ? decodeURIComponent(src.slice(11)) : null,
          },
        }],
      });
      i++;
      continue;
    }

    // Paragraph (default) — accumulate soft-wrapped lines until a blank line or block element
    const paraLines = [line.trim()];
    i++;
    while (i < lines.length) {
      const next = lines[i];
      if (next.trim() === '') break;
      if (next.startsWith('```')) break;
      if (next.match(/^#{1,6}\s/)) break;
      if (next.match(/^---+$/) || next.match(/^\*\*\*+$/) || next.match(/^___+$/)) break;
      if (/^[=-]+$/.test(next.trim()) && next.trim().length >= 2) break; // setext underline
      if (next.startsWith('> ')) break;
      if (next.match(/^(\s*)[-*+]\s/)) break;
      if (next.match(/^(\s*)\d+\.\s/)) break;
      if (next.includes('|') && next.trim().startsWith('|')) break;
      if (next.match(/^!\[/)) break;
      if (next.trim().startsWith('<')) break; // any HTML block
      if (next.startsWith('%%ADF_NODE%%')) break;
      paraLines.push(next.trim());
      i++;
    }
    const paraText = paraLines.join(' ');
    if (paraText) {
      content.push({
        type: 'paragraph',
        content: parseInline(paraText),
      });
    }
  }

  return { version: 1, type: 'doc', content };
}

// ---------------------------------------------------------------------------
// Inline parser
// ---------------------------------------------------------------------------

function parseInline(text) {
  if (!text) return [];
  const nodes = [];

  // Tokenize inline markdown: **bold**, *italic*, `code`, [text](url), ![alt](url)
  const regex = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]*)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*|__([^_]+)__|_([^_]+)_/g;

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      nodes.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      // Inline image ![alt](url) - emit as text reference (images handled at block level)
      nodes.push({ type: 'text', text: match[1] || match[2] });
    } else if (match[3] !== undefined) {
      // Link [text](url)
      nodes.push({
        type: 'text',
        text: match[3],
        marks: [{ type: 'link', attrs: { href: match[4] } }],
      });
    } else if (match[5] !== undefined) {
      // `code`
      nodes.push({ type: 'text', text: match[5], marks: [{ type: 'code' }] });
    } else if (match[6] !== undefined) {
      // **bold**
      nodes.push({ type: 'text', text: match[6], marks: [{ type: 'strong' }] });
    } else if (match[7] !== undefined || match[9] !== undefined) {
      // *italic* or _italic_
      nodes.push({ type: 'text', text: match[7] || match[9], marks: [{ type: 'em' }] });
    } else if (match[8] !== undefined) {
      // __bold__
      nodes.push({ type: 'text', text: match[8], marks: [{ type: 'strong' }] });
    }

    lastIndex = regex.lastIndex;
  }

  // Remaining text
  if (lastIndex < text.length) {
    nodes.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return nodes.length > 0 ? nodes : [{ type: 'text', text }];
}

// ---------------------------------------------------------------------------
// List parser
// ---------------------------------------------------------------------------

function parseList(lines, startIndex, ordered, baseIndent = 0) {
  const items = [];
  let i = startIndex;

  while (i < lines.length) {
    const line = lines[i];
    const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
    if (!listMatch) break;

    const indent = listMatch[1].length;
    if (indent < baseIndent) break;
    if (indent > baseIndent) break; // handled as sublist by caller

    const marker = listMatch[2];
    const text = listMatch[3];
    // Continuation indent = spaces before marker + marker length + 1 space
    const contIndent = indent + marker.length + 1;
    i++;

    // Collect continuation blocks (code blocks, paragraphs, sub-lists)
    // that are indented at least contIndent columns
    const continuationBlocks = [];

    while (i < lines.length) {
      const cur = lines[i];

      // Blank line — peek ahead to see if continuation follows
      if (cur.trim() === '') {
        let j = i + 1;
        while (j < lines.length && lines[j].trim() === '') j++;
        if (j >= lines.length) { i = j; break; }
        const afterIndent = lines[j].match(/^(\s*)/)[1].length;
        // New item at same level → end of this item
        if (afterIndent === indent && lines[j].match(/^(\s*)([-*+]|\d+\.)\s/)) { i = j; break; }
        // Not indented enough → end of this item
        if (afterIndent < contIndent) { i = j; break; }
        // Otherwise it's a continuation — skip blank line(s)
        i = j;
        continue;
      }

      const curIndent = cur.match(/^(\s*)/)[1].length;
      if (curIndent < contIndent) break; // back to parent level

      // Sub-list continuation
      const subMatch = cur.match(/^(\s*)([-*+]|\d+\.)\s/);
      if (subMatch && subMatch[1].length >= contIndent) {
        const isOrdered = /^\d+\./.test(subMatch[2]);
        const result = parseList(lines, i, isOrdered, subMatch[1].length);
        continuationBlocks.push(result.node);
        i += result.consumed;
        continue;
      }

      // Fenced code block continuation
      const dedented = cur.length >= contIndent ? cur.slice(contIndent) : cur.trimStart();
      if (dedented.startsWith('```')) {
        const lang = dedented.slice(3).trim();
        const codeLines = [];
        i++;
        while (i < lines.length) {
          const cl = lines[i];
          const dl = cl.length >= contIndent ? cl.slice(contIndent) : cl.trimStart();
          if (dl.startsWith('```')) { i++; break; }
          codeLines.push(dl);
          i++;
        }
        continuationBlocks.push({
          type: 'codeBlock',
          attrs: { language: lang || null },
          content: [{ type: 'text', text: codeLines.join('\n') }],
        });
        continue;
      }

      // Continuation paragraph — accumulate until blank or lower indent or sub-list
      const paraLines = [];
      while (i < lines.length) {
        const pl = lines[i];
        if (pl.trim() === '') break;
        const plIndent = pl.match(/^(\s*)/)[1].length;
        if (plIndent < contIndent) break;
        if (pl.match(/^(\s*)([-*+]|\d+\.)\s/) && plIndent >= contIndent) break;
        paraLines.push(pl.slice(contIndent));
        i++;
      }
      if (paraLines.length > 0) {
        continuationBlocks.push({
          type: 'paragraph',
          content: parseInline(paraLines.join(' ')),
        });
      }
    }

    const itemContent = [{ type: 'paragraph', content: parseInline(text) }];
    itemContent.push(...continuationBlocks);
    items.push({ type: 'listItem', content: itemContent });
  }

  return {
    node: {
      type: ordered ? 'orderedList' : 'bulletList',
      content: items,
    },
    consumed: Math.max(1, i - startIndex),
  };
}

// ---------------------------------------------------------------------------
// Table parser
// ---------------------------------------------------------------------------

function parseTable(lines, startIndex) {
  let i = startIndex;
  const rows = [];

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) break;
    // Skip separator rows like |---|---|
    if (line.match(/^\|[\s\-|:]+\|$/)) {
      i++;
      continue;
    }
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    rows.push(cells);
    i++;
  }

  if (rows.length === 0) return null;

  const tableRows = rows.map((cells, rowIndex) => ({
    type: 'tableRow',
    content: cells.map(cell => ({
      type: rowIndex === 0 ? 'tableHeader' : 'tableCell',
      attrs: {},
      content: [{ type: 'paragraph', content: parseInline(cell) }],
    })),
  }));

  return {
    node: {
      type: 'table',
      attrs: { isNumberColumnEnabled: false, layout: 'default' },
      content: tableRows,
    },
    consumed: i - startIndex,
  };
}

// ---------------------------------------------------------------------------
// Replace image placeholder refs in ADF with real attachment URLs
// ---------------------------------------------------------------------------

function replaceImageRefsInAdf(adf, attachmentMap) {
  return transformAdfNodes(adf, node => {
    if (node.type === 'mediaSingle') {
      const mediaChild = node.content?.[0];
      if (mediaChild?.type === 'media' && mediaChild.attrs?.__localPath) {
        const localPath = mediaChild.attrs.__localPath;
        const attachmentInfo = attachmentMap[localPath];
        if (attachmentInfo) {
          const mediaAttrs = {
            id: attachmentInfo.mediaId,
            type: 'file',
            collection: attachmentInfo.collectionName,
            alt: mediaChild.attrs.alt || '',
          };
          if (attachmentInfo.width) mediaAttrs.width = attachmentInfo.width;
          if (attachmentInfo.height) mediaAttrs.height = attachmentInfo.height;
          const displayWidth = attachmentInfo.width ? Math.min(attachmentInfo.width, 760) : 760;
          return {
            ...node,
            attrs: { ...node.attrs, width: displayWidth, widthType: 'pixel' },
            content: [{ type: 'media', attrs: mediaAttrs }],
          };
        }
      }
    }
    return node;
  });
}

import { execSync } from 'child_process';

function getImageDimensions(filePath) {
  try {
    const out = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}" 2>/dev/null`, { encoding: 'utf8' });
    const w = out.match(/pixelWidth:\s*(\d+)/)?.[1];
    const h = out.match(/pixelHeight:\s*(\d+)/)?.[1];
    if (w && h) return { width: parseInt(w, 10), height: parseInt(h, 10) };
  } catch (_) {}
  return {};
}

function transformAdfNodes(adf, transformer) {
  function transformNode(node) {
    const transformed = transformer(node);
    if (transformed.content) {
      return { ...transformed, content: transformed.content.map(transformNode) };
    }
    return transformed;
  }
  return { ...adf, content: adf.content.map(transformNode) };
}


async function confluenceRequest(method, path, body = null, isFormData = false) {
  const url = `${ATLASSIAN_BASE}${path}`;
  const headers = {
    Authorization: AUTH_HEADER,
    Accept: 'application/json',
  };
  if (body && !isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (isFormData) {
    headers['X-Atlassian-Token'] = 'no-check';
  }

  const options = {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Confluence API ${method} ${path} → ${res.status}: ${text.slice(0, 300)}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

async function getPageByTitle(title) {
  try {
    const data = await confluenceRequest(
      'GET',
      `/wiki/rest/api/content?title=${encodeURIComponent(title)}&spaceKey=APMTM&expand=version`
    );
    return data.results?.[0] || null;
  } catch (e) {
    return null;
  }
}

async function createPage(title, adf) {
  const body = {
    type: 'page',
    title,
    ancestors: [{ id: PARENT_PAGE_ID }],
    space: { key: 'APMTM' },
    body: {
      atlas_doc_format: {
        value: JSON.stringify(adf),
        representation: 'atlas_doc_format',
      },
    },
  };

  const result = await confluenceRequest('POST', '/wiki/rest/api/content', body);
  report.pagesCreated.push({ id: result.id, title });
  return result.id;
}

async function updatePage(pageId, title, adf, version) {
  const body = {
    type: 'page',
    title,
    version: { number: version + 1 },
    body: {
      atlas_doc_format: {
        value: JSON.stringify(adf),
        representation: 'atlas_doc_format',
      },
    },
  };

  const result = await confluenceRequest('PUT', `/wiki/rest/api/content/${pageId}`, body);
  report.pagesUpdated.push({ id: pageId, title });
  return result.id;
}

async function updatePageContent(pageId, title, adf) {
  const existing = await confluenceRequest('GET', `/wiki/rest/api/content/${pageId}?expand=version`);
  await updatePage(pageId, title, adf, existing.version.number);
}

async function upsertPage(title, adf) {
  try {
    const existing = await getPageByTitle(title);
    if (existing) {
      console.log(`  Updating existing page: ${existing.id}`);
      await updatePage(existing.id, title, adf, existing.version.number);
      return existing.id;
    } else {
      console.log(`  Creating new page: "${title}"`);
      return await createPage(title, adf);
    }
  } catch (e) {
    const msg = `Failed to upsert "${title}": ${e.message}`;
    console.error(`  ✗ ${msg}`);
    report.errors.push(msg);
    return null;
  }
}

async function uploadImages(pageId, imagePaths, sourceFile) {
  const attachmentMap = {};

  for (const localPath of imagePaths) {
    if (!fs.existsSync(localPath)) {
      console.warn(`  [WARN] Image not found: ${localPath}`);
      report.skipped.push({ file: sourceFile, element: 'img', reason: `File not found: ${localPath}` });
      continue;
    }

    const filename = path.basename(localPath);
    const ext = path.extname(localPath).toLowerCase();
    const mimeTypes = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml' };
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    try {
      // Check if attachment already exists
      let attachmentId = null;
      let mediaId = null;

      let collectionName = `contentId-${pageId}`;

      try {
        const existing = await confluenceRequest('GET', `/wiki/rest/api/content/${pageId}/child/attachment?filename=${encodeURIComponent(filename)}`);
        if (existing.results?.length > 0) {
          attachmentId = existing.results[0].id;
          mediaId = existing.results[0].extensions?.fileId || attachmentId;
          collectionName = existing.results[0].extensions?.collectionName || collectionName;
          console.log(`  ↑ Attachment exists: ${filename}`);
        }
      } catch (_) {}

      if (!attachmentId) {
        const fileContent = fs.readFileSync(localPath);
        const formData = new FormData();
        formData.append('file', new Blob([fileContent], { type: mimeType }), filename);
        formData.append('minorEdit', 'true');

        const result = await confluenceRequest(
          'POST',
          `/wiki/rest/api/content/${pageId}/child/attachment`,
          formData,
          true
        );

        attachmentId = result.results?.[0]?.id;
        mediaId = result.results?.[0]?.extensions?.fileId || attachmentId;
        collectionName = result.results?.[0]?.extensions?.collectionName || collectionName;
        console.log(`  ↑ Uploaded: ${filename}`);
        report.imagesUploaded.push({ file: filename, pageId, attachmentId });
      }

      const imgDims = getImageDimensions(localPath);
      attachmentMap[localPath] = { attachmentId, mediaId, collectionName, ...imgDims };
    } catch (e) {
      const msg = `Failed to upload ${filename}: ${e.message}`;
      console.error(`  ✗ ${msg}`);
      report.errors.push(msg);
      report.skipped.push({ file: sourceFile, element: 'img', src: localPath, reason: msg });
    }
  }

  return attachmentMap;
}

// ---------------------------------------------------------------------------
// Env loader
// ---------------------------------------------------------------------------

function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

main().catch(e => {
  console.error('Fatal error:', e);
  report.errors.push(e.message);
  fs.writeFileSync(path.join(ROOT, 'scripts/migration-report.json'), JSON.stringify(report, null, 2));
  process.exit(1);
});
