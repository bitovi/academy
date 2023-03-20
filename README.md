# Academy

Everything we know about frontend, backend, UX, and Devops consulting and management. Go to https://bitovi.com/academy/ to learn what we know.

## Developing

The following sections detail how to make various improvements to the site. Make sure you have cloned this repo and run:

```
npm install
```

### Watch mode

When actively working on the content, the most useful option is the watch mode. Run:

```
npm run dev
```

This will take a while the first time. The site will be created in the `academy` folder. Use `http-server` or something similar to view site with automatic refreshing on file-save. (In your browser you may need to open the academy folder if running from root.) If you don't use something like `http-server`, you will need to refresh after changes.

### Changing styles or images

Change `academy/static/styles/styles.less` or add images to `academy/img`, then run:

```
npm run rebuild-assets
```

This should take about 5 seconds.

### Building

If you want to do a full production build from scratch, run:

```
npm run build
```

This will take a while.

## Deploying

Academy is automatically deployed when anything is merged into `main`.

Academy can be deployed manually by running the following command:

```
npm run deploy
```

Doing so requires access to the Bitovi Hubspot Access token and Campaign Id, which can be found in Bitovi's 1Password `Academy` vault. Add them to a new `.env` file in this repos root directory:

```
HUBSPOT_TOKEN=<access token>
HUBSPOT_CAMPAIGN_ID=<campaign id>
```

If you do not have access to 1Password, please reach out to one of the maintainers of the project.

---

## Adding a Course

> (This section may have errors and missing information)

Create your course in the `src` folder. For best results, follow the organization and formatting of the [Angular course](/src/angular/). Course is available by typing in the appropriate url. Update `bit-u.md` to make it appear on the `/academy` page.

- The first page in your course should use the following template at the top of the file:

```
@page <subdirectory-url> <Page Title>
@parent bit-academy 4

@description <This will be displayed at the top of the page>

@body
```

> In the first page, please include an overview of what the course will cover as well as a links for all subsequent pages in the course.

Pages other than the first, introductory page should change the header to this format:

```
@page <subdirectory-url>/<specific-page-url> <Page Title>
@parent <subdirectory-url> <page order number>

@description <This will be displayed at the top of the page>

@body
```

- Navigation links at bottom of pages will automatically be generated for all pages that have the subdirectory as their parent (ie: those after the intro page). The first page, however, will require adding a link at the end of the markdown. See the bottom of `react.md` for an example.

---

## General Style Guidelines for all courses

> (This section may need more content)

- At the bottom of every initial introductory page, there should be a "Next Steps" section like in React course ([Bitovi Academy - Learn React](https://www.bitovi.com/academy/learn-react.html)) to guide user navigation
- Highlight all changed lines whenever possible.
- If possible, highlight and use `only` on all long codeblocks to display only relevant code sections.
- Solution codeblocks should be inside collapsed summary elements and have all changed lines highlighted.
- Code blocks benefit from introduction as demonstrated before every code block at Angular Course's [Filter Cities by State](https://www.bitovi.com/academy/learn-angular/form-value-changes.html)

---

## Formatting Tips

- Empty lines matter after certain elements. If something isn't displaying properly it could be missing a blank like before or after it.
- More sample elements can be viewed in training/style-guide.md

### Collapsing Summary Elements

To create collapsing summary elements like those around "Solution" code, use the following:

<!-- ```js -->
<details open>
<summary>This is a summary element</summary>
This is hidden until the summary is opened.

</details>
<!-- ``` -->

> note: All solution codes should be hidden inside a collapsed element. 

### Code blocks

#### Separating code from .md files

Code blocks can be written directly in the markdown files or written in separate files. 

The use of separate files for code is entirely optional, but allows the use of `@sourceref` to easily reference it and `@diff` to automatically highlight changes between codeblocks.

#### Highlighting & Minimizing

* Including the `only` keyword will minimize non-highlighted code. Using it is always optional and can be left off.

#### Manual highlighting

```js
@sourceref <relative file path for code>
@highlight <line numbers>, only
```

* `@sourceref` line is interchangable with code blocks.
* Sections of highlighted lines can be separated with commas. Ex: `@highlight 1-3, 7-24`

#### Automatic Highlighting

To automatically highlight differences between code blocks use the following instead of above:

```
@diff <initial version of file> <current, displayed file with changes> only
```

* Use relative file paths like first example
* Requires code be in separate files and the use of `@sourceref`
* Especially useful for highlighting changes in solution codes

### Links

Internal and external links can be created with Markdown syntax:

```
<!-- Internal link -->
[Bitovi Academy's RxJS training](../learn-rxjs.html)

<!-- External link: -->
[`mergeMap`](https://rxjs-dev.firebaseapp.com/api/operators/mergeMap)
```

Internal links can also be created with the following format:

```
[learn-typescript/generics TypeScript guide]
```

- anchor links will also work