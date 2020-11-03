@page learn-react/architecture Architecture
@parent learn-react 3

@description Learn how to handle data from the server in your React application

@body

separation of concerns

There are several ways to handle data modeling in a React application:

- **Simple Apps**: Don't worry about it
- **Medium Apps**: Simple services
- **Advanced Apps**: Full Separation

## Just Don't

It seems counter intuitive to include the option of "don't worry about it", but that is perfectly acceptable for a small application. This pairs well the simple form of [learn-react/state-management] too!

The basic idea is to call `fetch` (or your API of choice) directly in your code, and store the results using `useState`.

```jsx
function SimpleSearchApp() {
  const [ query, setQuery ] = useState('');
  const [ results, setResults ] = useState();

  async function handleSearch() {
    const response = await fetch(`/search?query=${query}`);
    const results = await response.json();
    setResults(results);
  }

  return (
    <div>
      <input type="text" placeholder="search query" value={query} />
      <button onClick={handleSearch}>Search</button>

      {results ? (
        results.length === 0 ? (
          <div>no results found</div>
        ) : (
          <div>
            {results.map(({ id, title, content }) => (
              <div key={id}>
                <h3>{title}</h3>
                <p>{content}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>please enter a query and click "Search"</div>
      )}
    </div>
  );
}
```

## Using simple services

At the end of the day, every data modeling solution will have `fetch` and `useState` just like the simple solution. The differences lie in where the code lives and what other code is surrounding it.

For the purposes of this solution, you can use Services, Models, or both. But what is the difference between a service and a model? They largely solve the same problem, though they do so differently and may use each other if both are present.

* A **service** is a collection of related methods, each of which performs some unit of work (such as updating a user record or performing a search). A service may perform this work using plain objects as the input and output, or using _models_.

To update our above example to utilize services, we would replace the `handleSearch` function with this one:

```js
async function handleSearch() {
  const results = await SearchService.search(query);
  setResults(results);
}
```

Our SearchService, at least initially, would look something like this:

```js
export default {
  search(query) {
    const response = await fetch(`/search?query=${query}`);
    const results = await response.json();
    return results;
  },
};
```

Initially, we have not changed any logic at all; in fact, this is more code than we started with. What this does do, however, is remove search implementation detail from the component, and reduce the amount of special knowledge that the developer needs to be aware of when checking this component.

What this also does is give much more flexibility. If we need to add something like authentication or a transform on the data from the server, we don't have to change the component at all. In fact, we could entirely replace the external API with a new one (even using something entirely different like GraphQL), add transforms on the input and outgoing data, and the component would be none the wiser.

// Context if you need shared data
