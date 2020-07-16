@page react/sample React
@parent react 1
@hide

```html
<div id="root"></div>
<script crossorigin src="//unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="//unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script type="jsx">
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
</script>
```
@codepen
