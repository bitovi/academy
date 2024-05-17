# Academy

Everything we know about frontend, backend, UX, and Devops consulting and management. Go to https://bitovi.com/academy/ to learn what we know.

## Developing

The following sections detail how to make various improvements to the site. Make sure you have cloned this repo and run:

```sh
npm install
```

```sh
npm run generate
```

```sh
npm run build
```

### Dev Server

You can start a development server at `http://localhost:8080/academy/` by running:

```sh
npm run start
```

`start` runs **both** the dev server and watch mode (changes to the source code will cause a
rebuild). However the browser will **not** reload when the source code changes.

### Watch mode

Watch mode will automatically trigger a rebuild when the source code changes. Run:

```sh
npm run dev
```

This will take a while the first time. The site will be created in the `academy` folder.

If the upcoming calendar events section returns "Sorry, events can’t load right now", it may be an issue with the ip address, so try http://localhost:5500/academy/

### Changing styles or images

Change `academy/static/styles/styles.less` or add images to `academy/img`, then run:

```sh
npm run rebuild-assets
```

This should take about 5 seconds.

### Generating Exercises

Some courses have [dynamically generated exercises](./exercise-src/README.md). These courses will have a folder in `exercise-src` and a corresponding entry in `exercises/.gitignore`. To generate the exercises, run:

```sh
npm run generate
```

### Linting the content and code

ESLint and Prettier are configured for some of the Academy content and exercises.

In CI, this will run to verify both the content and exercises:

```sh
npm run lint
```

There are also individual `lint:content` and `lint:exercises` scripts if you want to lint just one and not the other.

To fix them both locally, you can run this command:

```sh
npm run lint:fix
```

There are also individual `lint:content:fix` and `lint:exercises:fix` scripts if you want to fix just one and not the other.

Be sure to let these commands finish completely because they delete the `node_modules` folders.
If a `node_modules` folder is left inside `src`, it will be processed as content and cause issues with running `npm start`.

### Testing the exercises

The test script will look inside the `exercises` folder folder any `-solution` folder that has a `package.json`, then install the dependencies and run the tests:

```sh
npm test
```

### Building

If you want to do a full production build from scratch, run:

```sh
npm run build
```

This will take a while.

## Deploying

Academy is automatically deployed when anything is merged into `main`.

Academy can be deployed manually by running the following command:

```sh
npm run deploy
```

Doing so requires access to the Bitovi Hubspot Access token and Campaign Id, which can be found in Bitovi’s 1Password `Academy` vault. Add them to a new `.env` file in this repos root directory:

```sh
HUBSPOT_TOKEN=<access token>
HUBSPOT_CAMPAIGN_ID=<campaign id>
```

If you do not have access to 1Password, please reach out to one of the maintainers of the project.

---

## Adding a Course

> (This section may have errors and missing information)

Create your course in the `src` folder. For best results, follow the organization and formatting of the [Angular course](/src/angular/). Course is available by typing in the appropriate url. Update `bit-u.md` to make it appear on the `/academy` page.

- The first page in your course should use the following template at the top of the file:

```md
@page <subdirectory-url> <Page Title>
@parent bit-academy 4

@description <This will be displayed at the top of the page>

@body
```

Once you have a 1200x630 image, you can add a `@metaogimage` tag as follows

```md
@metaogimage ../static/img/program-management-with-jira/og-thumbnail.png
```

> In the first page, please include an overview of what the course will cover as well as a links for all subsequent pages in the course.

Pages other than the first, introductory page should change the header to this format:

```md
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
- Code blocks benefit from introduction as demonstrated before every code block at Angular Course’s [Filter Cities by State](https://www.bitovi.com/academy/learn-angular/form-value-changes.html)

---

## Formatting Tips

- Empty lines matter after certain elements. If something isn’t displaying properly it could be missing a blank like before or after it.
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

- Including the `only` keyword will minimize non-highlighted code. Using it is always optional and can be left off.

#### Manual highlighting

```md
@sourceref <relative file path for code>
@highlight <line numbers>, only
```

- `@sourceref` line is interchangable with code blocks.
- Sections of highlighted lines can be separated with commas. Ex: `@highlight 1-3, 7-24`

#### Automatic Highlighting

To automatically highlight differences between code blocks use the following instead of above:

```md
@diff <initial version of file> <current, displayed file with changes> only
```

- Use relative file paths like first example
- Requires code be in separate files and the use of `@sourceref`
- Especially useful for highlighting changes in solution codes

### Links

Internal and external links can be created with Markdown syntax:

```md
<!-- Internal link -->

[Bitovi Academy’s RxJS training](../learn-rxjs.html)

<!-- External link: -->

[`mergeMap`](https://rxjs-dev.firebaseapp.com/api/operators/mergeMap)
```

Internal links can also be created with the following format:

```md
[learn-typescript/generics TypeScript guide]
```

- anchor links will also work
