const cheerio = require('cheerio')

class AcademyPage {
  constructor(html, fileLocation) {
    this.html = html
    this.$ = cheerio.load(html, {decodeEntities: true});
    this.fileLocation = fileLocation;
    if(this.fileLocation.split('/')[1] === 'index.html'){
      this.slug = 'academy/';
    } else {
      this.slug = this.fileLocation;
    }
    this.hubSpotId = null;
  }

  setHtml(html){
    this.$ = cheerio.load(html, {decodeEntities: true});
  }

  // returns all page data at once for easier debugging
  getPageData() {
    return {
      title: this.getTitle(),
      headHtml: this.getHead(),
      bodyHtml: this.getPageContents(),
      slug: this.slug,
      metaDescription: this.getMetaDescription()
    }
  }

  getTitle(){
    return this.$('title').html();
  }

  getMetaDescription(){

      return this.$('meta[name=description]').attr("content");
  }

  getPageContents(){
    // const pageContent = this.$('#content-wrapper').html();
    // const pageScripts = this.$('#scripts').html();
    // return updateStaticAssetLinks(pageContent + pageScripts);
    const pageContent = this.$('body').html();
    return updateStaticAssetLinks(pageContent);
  }
  getHead() {
    const socialMetas = this.getSocialMetas();
    return this.getCSSLinks()+socialMetas;

  }
  getSocialMetas(){
    const metas = this.$("meta[property^=og], meta[name^=twitter]").toArray();
    return updateStaticAssetLinks( metas.map( element => this.$.html(element)).join('') );
  }
  
  getCSSLinks(){
    const cssLinks = this.$('link')
    .toArray()
    .map(element => `<link rel="stylesheet" type="text/css" href="${element.attribs.href}">`)
    .join();

    return updateStaticAssetLinks(cssLinks);
  }
}

const updateStaticAssetLinks = (html) => {
  const assetBaseUrl = 'https://bitovi.github.io/academy/static';

  // Update ./static/ paths in JavaScript data (ie: not in hardcoded HTML)
  let processedHtml = html.replace(/<script[^>]*id=["'`]dynamic-card-generator["'`][^>]*>([\s\S]*?)<\/script>/g, (match, scriptContent) => {
    const updatedScript = scriptContent.replace(/\.\/static\//g, `${assetBaseUrl}/`);
    return `<script id="dynamic-card-generator">${updatedScript}</script>`;
  });
  
  // Then handle regular HTML attributes with simple replacements
  return processedHtml
    .replace(/src="\.*\/static/g, `src="${assetBaseUrl}`)
    .replace(/src='\.*\/static/g, `src='${assetBaseUrl}`)
    .replace(/href="\.*\/static/g, `href="${assetBaseUrl}`)
    .replace(/href='\.*\/static/g, `href='${assetBaseUrl}`)
    .replace(/url\(&apos;\.*\/static/g, `url(&apos;${assetBaseUrl}`)
    .replace(/url\('\.*\/static/g, `url('${assetBaseUrl}`)
    .replace(/content='\.*\/static/g, `content='${assetBaseUrl}`)
    .replace(/content="\.*\/static/g, `content="${assetBaseUrl}`);
}

module.exports = AcademyPage;
