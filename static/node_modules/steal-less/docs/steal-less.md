@module {{}} steal-less
@parent StealJS.ecosystem

@description

**steal-less** is a plugin for StealJS that provides the ability to import and use 
 [LESS](http://lesscss.org) modules.

@body

## Use

Install steal-less with npm, saving to your development dependencies:

```
> npm install steal-less --save-dev
```

In your package.json add steal-less as a plugin under your **steal** (or **system**) configuration:

```json
...

"steal": {
  "plugins": [
    "steal-less"
  ]
}
```


From there all you need to do is import your LESS modules:

```js
import './styles.less';
```
