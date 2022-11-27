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

This will take a while the first time. The site will be created in the `academy` folder. Use `http-server` or something similar to view.

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

Doing so requires access to the Bitovi Hubspot API key and Campaign Id, which can be found in Bitovi's 1Password `Academy` vault. Add them to a new `.env` file in this repos root directory:

```
HUBSPOT_API_KEY=<api key>
HUBSPOT_CAMPAIGN_ID=<campaign id>
```

If you do not have access to 1Password, please reach out to one of the maintainers of the project.

---

## Bit docs tips
### Highlighting

```
@sourceref <relative file path for code>
@highlight <lines>, only
```
* adding the `only` keyword will collapse non-highlighted code. It is always optional.

To automatically highlight differences between code blocks use the following instead of above:

```
@diff <initial version of file> <current, displayed file with changes> only
```
* note: use relative file paths like first example
* Especially useful for highlighting changes in solution codes

### Internal links

using the following:
```
[learn-typescript/generics TypeScript guide]
```
will dynamically generate an inline link to the `generics` page in the `learn-typescript` course. `Typescript guide` will the the displayed/linked phrase

Markdown formatted links also work:
```
[Bitovi Academy's RxJS training](../learn-rxjs.html)
```

### External links

```
<a href="https://angular.io/api/common/AsyncPipe" >async pipe</a>
```

Note: external links can be created with the standard markdown format:
```
[`mergeMap`](https://rxjs-dev.firebaseapp.com/api/operators/mergeMap)
```


## Style Guidelines
- Add highlights to changed lines of code.
- Manually add a "Next Steps" section and link at end of the landing page for each course (due to bitdocs, these pages don't dynamically generate links like the other pages in the course)
- Highlight all changed lines, including in solution code
- If possible highlight and use `only` on all long codeblocks to display only relevant code
- Collapse solution codeblocks