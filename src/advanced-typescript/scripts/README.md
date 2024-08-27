# CodeSandbox Links

This is a helper script to create a link that opens a specific file in CodeSandbox. To do this we leverage:

- [Commander](https://github.com/tj/commander.js#readme)
- [glob](https://github.com/isaacs/node-glob#readme)
- [lz-string](https://pieroxy.net/blog/pages/lz-string/index.html)
- [CodeSandbox's Define API](https://github.com/codesandbox/codesandbox-importers/blob/e68dcdd289c32045293db862b1897130a0825e0a/packages/import-utils/src/api/define.ts#L11)

**This script only creates the links, it is up to the developer to put them into the correct spot in course.**

### Running the Script

> Requires at least Node 14

By default you do not need to pass anything into the script

```sh
node ./
```

By default, the script will log the object containing the CodeSandbox link, If you wish to have the links outputted to a folder use `--output`. If the folder is not there, the script will create it. The result will be written to a file called `generated.codesandbox-links.json`

> Note: Currently the script does not check if the file already exists, if it does it will be overwritten

```sh
node ./ --output="example"
```

This will create

```
scripts
└── example
    └── generated.codesanbox-links.json
└── index.js
└── codesandbox-link-helpers.js
```

It is also possible to override the source using `--source`. The `--source` option accepts globs for pattern matching. It’s default is set to look for all the exercise files within the advanced TypeScript course.

> #### **Heads Up:**
>
> Some parts of this script cater to the `/advanced-typescript` section of this repo. This means if a different soruce is passed in, it will work, but it might be a bit different. For example, take the following:
>
> ```js
> const advancedTypeScriptSectionInfo = filePath.split(
>   "/advanced-typescript/"
> )?.[1];
>
> const splitFilePath = filePath.split("/");
> let codesandboxFileName = splitFilePath[splitFilePath.length - 1];
>
> if (advancedTypeScriptSectionInfo) {
>   const splitSection = advancedTypeScriptSectionInfo.split("/");
>   codesandboxFileName = `${splitSection[0]}-${
>     splitSection[splitSection.length - 1]
>   }`;
> }
> ```
>
> Since this is only used in `/advanced-typescript` this shouldn’t be a problem. But if this script becomes commonly used, naming the file in CodeSandbox should probably be done differently.

You can check all of these using the `--help` option.

```sh
node ./ --help
```

### Other Ways to Run

You can run the script without the `node` interpreter prefix if you give the file executor permissions.

```sh
chmod u+x ./index.js
```

then the following work the same

```sh
./index.js

# Is the same as
node ./index.js
```
