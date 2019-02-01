@page typescript/ide-support IDE Support
@parent typescript 2

@description Learn about TypeScript configurations and IDES good for TypeScript Development.

@body

## Overview

In this section we'll learn about TypeScript configuration options to help us optimize our workflow, and look at IDEs that have great TypeScript support for building TypeScript projects.

## Configuring TypeScript

We're able to configure how our projects use TypeScript from selecting which files to compile to removing comments from those files. This is done through the creation of a ``tsconfig.json`` file.

### tsconfig.json

Customize the TypeScript compiling and linting options by creating a ``tsconfig.json`` file in the root directory of your TypeScript project. The following config will
- specify ECMAScript target version as 'es5'
- specify module code generation (from 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015' or 'esnext')
- generate source map files
- remove comments from compiled code

```javascript
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true,
        "removeComments": true
    }
}
```

Full configuration options are available here: <a href="http://json.schemastore.org/tsconfig" target="\_blank">http://json.schemastore.org/tsconfig</a>

### Linting

We can also configure linting options to catch bugs and help enforce uniform styling. The following options will warn on unused local variables and parameters, and expressions or declarations implying 'any'.

```javascript
{
    "compilerOptions": {
        ...
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitAny": true
        ...
	}
}
```

## IDEs

Integrated Development Environments have come a long way in supporting modern web development. With little to no configuration they offer built-in debugging, Git integration, command line useage, and robust packages for additional addons.

### Visual Studio Code

<a href="https://code.visualstudio.com/" target="\_blank">VS Code</a> is Microsoft's modern take on an IDE for app development (P.S. TypeScript is a Microsoft Open Source project).  VS Code has built in TypeScript support for syntax highlighting, IntelliSense code completion, and linting.

<a href="../static/img/vs-code-screenshot.png" target="\_blank"><img src="../static/img/vs-code-screenshot.png" width="100%" alt="Visual Studio Code screenshot" /></a>

### Atom

Atom is another good modern IDE that easily supports and aids in TypeScript development with the installation of the <a href="https://atom.io/packages/atom-typeScript" target="\_blank"> atom-typeScript plugin</a>.

<a href="../static/img/atom-screenshot.png" target="\_blank"><img src="../static/img/atom-screenshot.png" width="100%" alt="Atom screenshot" /></a>

### Webstorm

<a href="https://www.jetbrains.com/webstorm/download/" target="\_blank">Webstorm</a> is a platform by JetBrains that is loved for its great code refactoring assistance and version control integration, but it does require a paid subscription.

<a href="../static/img/webstorm-screenshot.png" target="\_blank"><img src="../static/img/webstorm-screenshot.png" width="100%" alt="Webstorm screenshot" /></a>

## Exercise

In the same directory as your ``helloworld.ts file``, create ``hellouniverse.ts``.

Change your ``helloworld.ts`` file to be:

```typescript
function greeter(person: string) {
    return "Hello, " + person;
}

let user = "World";

document.body.innerHTML = greeter(user);

export default greeter;
```

In your ``hellouniverse.ts`` file add:

```typescript
import greeter from './helloworld'

let user = 1;

document.body.innerHTML = greeter(user);
```

Use your preferred editor's error detection help you find the bug and use the ``greeter`` function correctly.

<details>
<summary>solution</summary>

```typescript
import greeter from './helloworld'

let user = 'Universe';

document.body.innerHTML = greeter(user);
```

</details>
