@page angular-setup Setup
@parent angular 1

@description A description of this part.


@body

## The problem

In this part, we will:

- x
- y
- z


## What you need to know


## The solution



Change `foo.js` to:

```js
var foo = "bar";
```

## Example with angular 6


```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.js"/></script>
<script src="https://unpkg.com/@angular/core@6.0.5/bundles/core.umd.js"/></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.8.26/zone.min.js"></script>
<script src="https://unpkg.com/@angular/common@6.0.5/bundles/common.umd.js"></script>
<script src="https://unpkg.com/@angular/compiler@6.0.5/bundles/compiler.umd.js"></script>
<script src="https://unpkg.com/@angular/platform-browser@6.0.5/bundles/platform-browser.umd.js"></script>
<script src="https://unpkg.com/@angular/platform-browser-dynamic@6.0.5/bundles/platform-browser-dynamic.umd.js"></script>
<my-app></my-app>
<script type="typescript">
// app.js

const { Component, VERSION } = ng.core;

@@Component({
  selector: 'my-app',
  template: `
   <h1>{{title}} </h1>
    TODO: Define your Angular ${VERSION.major} component.
  `
})
class AppComponent {  
  title="hello world angular 6";
  constructor() {
    // TODO: Define your Angular component implementation
  }
}


// main.js
const { BrowserModule } = ng.platformBrowser;
const { NgModule } = ng.core;
const { CommonModule } = ng.common;

@@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
class AppModule {}

const { platformBrowserDynamic } = ng.platformBrowserDynamic;

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
</script>
```
@codepen
