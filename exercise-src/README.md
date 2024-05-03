# Academy Generator

## File Structure

The source files used to generate the final files are located in `exercise-src`. They are organized by course, module, and project. Generation is handled in alphabetical order, so the modules and projects should be named accordingly, usually with numeric prefixes.

```
└── <course name>
    └── <module name>
        └── <project name>
```

## Generating

To generate all courses, run:

```shell
npm run generate
```

To generate a specific course, run:

```shell
npm run generate <course name>
```

To generate a specific module in a given course, run:

```shell
npm run generate <course name> <module name>
```

To generate a specific project in a specific module in a specific course, run:

```shell
npm run generate <course name> <module name> <project name>
```

### Example

If you were working on solution 4 in module 3 of the React Native course (`/exercise-src/react-native/03-creating-a-new-app/04-solution`), you could generate just the relevant project by running:

```shell
npm run generate react-native 03-creating-a-new-app 04-solution
```

However, you might need to compare that project to the previous one, so you could generate all the projects in module three by running:

```shell
npm run generate react-native 03-creating-a-new-app
```

You could also generate the set of modules and projects for the React Native course by running:

```shell
npm run generate react-native
```

## Content

Each course is generated independently of the others. When generating a course, the modules are processed in alphabetical order, and the projects within each module are processed in alphabetical order. Usually, modules and projects are named with numeric prefixes to ensure the correct order. Each project build will have all the files from the previous projects (see special rules below).

### Special Rules: Deleting Files

Normally, the files from one project are copied to the next. To delete files from a previous project, create a file called `.delete` and list the files to delete from the project. There can be multiple `.delete` files, each with paths relative to the file itself.

IE: `01-project` has files `foo.txt` and `foo/bar.txt` that are not needed in `02-project`.

One option is to create `02-project/.delete` with

```
foo.txt
foo/bar.txt
```

Another is to create `02-project/.delete` with

```
foo.txt
```

and `02-project/foo/.delete` with

```
bar.txt
```
