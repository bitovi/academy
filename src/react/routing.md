@page learn-react/routing Routing
@parent learn-react 4

@description Learn to master routing in your React app with React Router.

@body

Unlike most of the other sections in this guide, there is really one one commonly found solution for routing in React: **React Router**. Handling special cases manually is fairly straight forward, however.

## React Router

React Router provides a very react-compatible way to interface with your browser's routing capabilities. It behaves very much like the Providers and Consumers that you can create with React's `createContext`. There are three primary components you will need: BrowserRouter (or `HashRouter` if you prefer), `Route`, and `Link`. Because this works via the context API, `Route` and `Link` need only be anywhere within their `Router`, not necessarily at the top level on in the same component definition.

* `BrowserRouter`: Uses the HTML5 history API to keep your UI in sync with the URL. You will usually only need one Router in any given project.
* `Route`: Renders a portion of your UI when a location matches the route's `path`. You may have any number of these, you may nest them, and you may even define the same path twice (see below).
* `Link`: Instructs the Router to navigate to a new page, thus updating the URL and re-rendering Routes. Use these much like you would an `<a href="...">` tag.

> For a more comprehensive tutorial, have a look at their [Quick Start](https://reacttraining.com/react-router/web/guides/quick-start) guide.

```jsx
import { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/users">Users</Link>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/users" component={Users} />
      </div>
    </BrowserRouter>
  );
}
```

### Advanced Usage

One of the more common forms of advanced routing is to have some portion of your page that is outside the main content area still respond to routing changes. One example of this would be a sidebar that shows different content based on the first part of the url. (As before, this is shown in a single component for clarity, but is not necessary).

```jsx
import { BrowserRouter, Route, Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/user/alice">Alice's Profile</Link>
          <Link to="/user/bob">Bob's Profile</Link>
        </nav>

        <div id="sidebar">
          {/* only shows on a route beginning with `/about` */}
          <Route path="/about" component={Alice} />

          {/* only shows on a route beginning with `/user` */}
          <Route path="/user" component={Alice} />
        </div>

        <article>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/user/alice" component={Alice} />
          <Route path="/user/bob" component={Bob} />
        </article>
      </div>
    </BrowserRouter>
  );
}
```
