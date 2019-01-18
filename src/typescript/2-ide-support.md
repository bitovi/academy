@page typescript/ide-support IDE Support
@parent typescript 1

@description IDE Support for Typescript

@body 

## IDE Support for Typescript


### Visual Studio Code

VS Code is Microsoft's modern take on an IDE for app development. (Ps, Typescript is a Microsoft Open Source project) VS Code has built in Typescript support for syntax highlighting, IntelliSense code completion, and linting.



#### tsconfig.json

You can customize your Typescript compiling and linting options by creating a tsconfig.json file in the root directory of your Typescript project.

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

tsconfig.json
```javascript
{
    "compilerOptions": {
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        ...
	}
}
```

### Atom

Atom is another good modern IDE that easily supports and aids in Typescript development with the installation of the atom-typescript plugin.

atom-typescript https://atom.io/packages/atom-typescript
