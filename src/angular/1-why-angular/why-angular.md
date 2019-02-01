@page angular-setup Why Angular
@parent angular 1

@description Why Angular is a great choice for modern web application development. 

@body

## Angular in the Modern Web Development Ecosphere

Angular was first released in 2010 as a new framework in the MV* space alongside libraries like Backbone, Knockout, and Dojo.

## The Pros

### 1. An Opinionated Framework

Developers have to make a lot of decisions on a daily basis, which can often create decision fatigue. The great part about using an opinionated framework is being able to shift your focus from build configs, high level architecture decisions,   to writing the actual client-specific functioning pieces of the application. 

The use of Typescript to force type checking improves workflow by catching errors at compile time allowing teams to catch potential errors much faster.

### 2. Testing Built In

Spinning up a new Angular Workspace automatically creates a test suite, with a working karma config, and new test spec files for any component generated.  

### 3. Harnesses the Power of Webpack

Webpack is a module bundler that also handles transforming resources, like Less or Typescript. 
Angular streamlines the build process by masking Webpack config complexity with the Angular CLI. 

### 4. Google-Backed and Supported Product

Having a heavy hitting tech titan backing a library can make it a very sustainable choice to use.


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
