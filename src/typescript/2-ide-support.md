@page typeScript/ide-support IDE Support
@parent typescript 2

@description IDE Support for TypeScript

@body

## Overview


### Visual Studio Code

<a href="https://code.visualstudio.com/" target="_blank">VS Code</a> is Microsoft's modern take on an IDE for app development (P.S. TypeScript is a Microsoft Open Source project).  VS Code has built in TypeScript support for syntax highlighting, IntelliSense code completion, and linting.

<a href="../static/img/vs-code-screenshot.png" target="\_blank"><img src="../static/img/vs-code-screenshot.png" width="60%"/></a>


#### tsconfig.json

Customize the TypeScript compiling and linting options by creating a ``tsconfig.json`` file in the root directory of your TypeScript project.

```javascript
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true
    }
}
```

### Linting

The following options will lint unused local variables and parameters.

``tsconfig.json``
```javascript
{
    "compilerOptions": {
        ...
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        ...
	}
}
```

### Atom

Atom is another good modern IDE that easily supports and aids in TypeScript development with the installation of the <a href="https://atom.io/packages/atom-typeScript" target="_blank"> atom-typeScript plugin</a>.


<a href="../static/img/atom-screenshot.png" target="\_blank"><img src="../static/img/atom-screenshot.png" width="60%"/></a>

### Exercise

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
import greeter from './greeter'

let user = "Universe";

document.body.innerHTML = greeter(user);
```

Use your editor's module error detection help you find the bug and import the ``greeter`` function correctly.