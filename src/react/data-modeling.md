@page learn-react/data-modeling Data Modeling
@parent learn-react 3

@description Learn how to handle data from the server in your React application

@body

There are several ways to handle data modeling in a React application:

- **Simple Apps**: Don't worry about it
- **Medium Apps**: Simple services and/or models
- **Advanced Apps**: External libraries

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

## Using simple services and/or models

At the end of the day, every data modeling solution will have `fetch` and `useState` just like the simple solution. The differences lie in where the code lives and what other code is surrounding it.

For the purposes of this solution, you can use Services, Models, or both. But what is the difference between a service and a model? They largely solve the same problem, though they do so differently and may use each other if both are present.

* A **model** is a unit of data with properties and usually methods, such as a User object with the properties "username", "name", and "email", and the methods "save" and "delete", or a SearchResult object with properties "id", "title", and "content" (and no methods, since you probably cannot modify an entry in a search result). When needing to perform work (usually accessing an external server), this logic may be built into the method definitions or it may use a _service_.
* A **service** is a collection of related methods, each of which performs some unit of work (such as updating a user record or performing a search). A service may perform this work using plain objects as the input and output, or using _models_.

### Simple Services

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

### Simple Models

Let's take this example one step further and introduce a Model. As this service is fairly simple, we are going to _replace_ it with a model, rather than using both simultaneously. For other models, you may wish to make use of both options, especially if you need to include complex authentication information.

Our `handleSearch` will be very similar similar to the service option, except it will call a static function on our `SearchResults` model.

```js
async function handleSearch() {
  const results = await SearchResults.findAll(query);
  setResults(results);
}
```

Our SearchResults would look something like this.

> We would also need to make sure we check the length of and map over the results property, rather than the object itself. We could do this by modifying the component itself, or adding a `length` getter and `map` method. If you find yourself doing things like this frequently, it may be worth extending another class which includes this generic logic.

```js
export class SearchResults {
  static from(data) {
    return new SearchResults(results);
  }

  static async findAll(query) {
    const response = await fetch(`/search?query=${query}`);
    const results = await response.json();
    return SearchResults.from(results);
  }

  constructor(results) {
    this.results = results.map(SearchResult.from);
  }

  get length() {
    return this.results.length;
  }

  map(fn) {
    return this.results.map(fn);
  }
};

export class SearchResult {
  static from(data) {
    return new SearchResult(data);
  }

  constructor({ id, name, content }) {
    this.id = id;
    this.name = name;
    this.content = content;
  }
}
```

If you were modeling a User, it might look something like this.

```js
export class User {
  static from(data) {
    return new User(data);
  }

  static async findOne(username) {
    const response = await fetch(`/user/${username}`);
    const results = await response.json();
    return User.from(results);
  }

  constructor({ username, name, email }) {
    this.username = username;
    this.name = name;
    this.email = email;
  }

  async save() {
    await fetch(`/user/${this.username}`, {
      method: 'post',
      body: {
        name: this.name,
        email: this.email,
      },
    });
  }
}
```
