@page react/intro Introduction to React
@parent react 1

@body

## Before you begin

Before you begin learning React, you will want to have a basic understanding of JavaScript, specifically: variables, objects, arrays, and functions. The MDN (previously Mozilla Developer Network) has [a great article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) that covers these topics.

Though it is not strictly necessary, many React developers make specific use of some new syntaxes introduced in ES2016, specifically: let/const, arrow functions, and destructuring. There is [another great article](https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f) which covers these additions, and more.

Lastly, you will need to [understand NPM](https://docs.npmjs.com/about-npm/), which will be used to configure your app and add dependencies.

### Who is this guide for?

In short, this guide is for anybody who wants to start building amazing frontend apps as soon as possible. As long as you have a passing familiarity with the above technologies, you should be good to go!

Before we actually start with code, however, there is a little bit of discussion to get out of the way. The next few sections will cover what React is and is not, but then we can get started.

## What is React

I think it best to let the creators speak to this themselves:

> React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

Of course, there's a lot of jargon in that statement, so lets break it down:

* **for building user interfaces**: First and foremost, React is a library for creating the **view layer**; that is, React is for creating the part that you see, and less for the logic that is happening behind the scenes, such as data fetching or session management.

* **components**: Components are the building blocks of React, and there are a couple different ways to create them. Most of the rest of this guide will be about components.

* **flexible**: As you will learn shortly, React's _components_ are extremely reusable and versatile. "Everything is a component."

* **declarative**: We could write [entire articles](https://tylermcginnis.com/imperative-vs-declarative-programming/) about what this means, but suffice it to say that declarative will probably make more sense to you than the alternative (imperative).

* **efficient**: React is very fast to develop, and very performant when running. You can also further [optimize performance](https://reactjs.org/docs/optimizing-performance.html) if needed.

In short, React provides you a quick and easy way to create the UI of your application, using modular pieces that can be reused and fit together as needed.

## What is React _Not_

React is really good at its primary purpose: a library for building user interfaces. It is however _not_ an application framework. That is to say, in order to build a complete application, you will likely be using a few pieces that work well with React, especially for data management: libraries like [Redux](https://redux.js.org/) and [styled-components](https://www.styled-components.com/), which will be addressed in future guides. That being said, you _can_ use React standalone, and this series of guides will show you how to do so.

## Create React App

Because of the nature of React, you will need to use a build system to compile your project before you can see it or deploy it. A build system takes all your code and styles and joins and compresses them into a small number of files that is efficient to send over the internet. Many build systems will also handle other assets like images in some way. This sounds much more complicated than it really is, however.

There are lots of build systems that will work fine, though the creators of React have produced a project called [Create React App](https://github.com/facebook/create-react-app), in order to have the simplest, cleanest way to start your application. **Create React App** is not necessary for using React, but it is the go-to for many developers.

### The Philosophy of Create React App

**Create React App** was created with some very specific key points in mind. As before, I think it best to let the creators speak.

* **One Dependency**: There is just one build dependency. It uses Webpack, Babel, ESLint, and other amazing projects, but provides a cohesive curated experience on top of them.

* **No Configuration Required**: You don't need to configure anything. A reasonably good configuration of both development and production builds is handled for you so you can focus on writing code.

* **No Lock-In**: You can "eject" to a custom setup at any time. Run a single command, and all the configuration and build dependencies will be moved directly into your project, so you can pick up right where you left off.

## Getting Started

Alright. Enough talking. Let's start a project. These steps will be included in all our project guides, so no need to master or remember them here.

First, you will need an up-to-date installation of [Node.js](https://nodejs.org/en/) (10.15.0 or 11.8.0 as of the writing of this article). The details for acquiring this can be complicated, and so are outside the scope of this article. For MacOS and \*nix users, I usually recommend installation via [Node Version Manager](https://github.com/creationix/nvm).

Once you have node installed, open a terminal window in your development directory and run the following commands:

```shell
npx create-react-app my-app
cd my-app
npm start
```

The first line generates the app into a folder called `my-app` and line 2 changes into that directory. You can your app whatever you like, as long as you change it in both places.

Line 3 is when the good part happens: this start the build system, compiles your project, starts the web server, and opens it in your browsers. If you leave and return later to continue development, all you will need to do is open a terminal at your project directory and re-run is this last line.

<p align='center'>
<img src='https://cdn.rawgit.com/facebook/create-react-app/27b42ac/screencast.svg' width='600' alt='npm start'>
</p>

### What have we created?

Running the first command should have created a directory called `my-app`, which is where your entire project will live. The most important part of this is the `src` directory, where all of your code will go. Let's have a look at what's in here.

* **index.js**: This is the _entry point_ of the application; when a user opens your project, this is the code that will start them on their journey. For the most part, you will not need to change this, as it primarily only loads `App.js`.

* **index.css**: These are the global styles that apply to the whole project. This is just a css file like any other.

* **App.js**: This is where your actual app lives. If you are familiar with JavaScript, this may look foreign to you. "HTML in JavaScript‽" I hear you say. Don't worry, this is called JSX and we will explain what this is in a moment.

* **App.css**: This is a plain css file like `index.css`, but it should only contain styles relevant to `App.js`. React works best when your components are self contained. That's what `App.js` is, by the way, a component.

* **logo.svg**: A vector asset used by `App.js`.

* **serviceWorker.js**: Discussion of [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/) is outside the scope of this guide, but many React projects use them. You can leave this as-is, or you can remove it (if you do, you should also remove the references to it from `index.js`, lines 5 and 9-12).

```
my-app
├── src
│   ├── index.css
│   ├── index.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── logo.svg
│   └── serviceWorker.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── node_modules
├── .gitignore
├── package.json
└── README.md
```

## What is JSX

So now that you have some code, let's have a look at `App.js` (shortened for brevity). You may be wondering why there is HTML inside your JavaScript. This is the preferred syntax for declaring to React what you would like to be on the page.

> JSX is like a healthy vegetable that tastes like decadent chocolate cake. You feel guilty, but it’s good for you. ([source](https://medium.com/javascript-scene/jsx-looks-like-an-abomination-1c1ec351a918))

```jsx
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Edit <code>src/App.js</code> and save to reload.</p>
          <a href="https://reactjs.org">Learn React</a>
        </header>
      </div>
    );
  }
}
```

### Differences from HTML

For all intents and purposes, JSX is exactly that, HTML in your JavaScript. There are a few minor differences from actual HTML, however:
* All elements must be closed. They may be self-closing (as is the image on line 6), or have a closing tag (like the paragraph on line 7), but they must be closed.
* There are a few property names which change in JSX. The most prolific of these is the use of `className` instead of `class`, as seen on lines 4, 5, and 6.
* User-defined components *must* start with a capital. Though we are not _using_ any user-defined components in the above example, we are creating one on line 1.
* Prop values can be javascript. This is the one that takes the longest to get used to. On line 6, the value of the `src` prop is not a string like the other props, but is instead a reference to a JavaScript variable. We will elaborate on this in future guides.

Want to know more about **why** we do it this way and **what** else you can do with JSX? Check out the official [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html). Want to know **how** this works? Check out the official [JSX in Depth](https://reactjs.org/docs/jsx-in-depth.html).

## The React Way

As we bring this guide to a conclusion, the final thought I would like to leave you with is what it means to do things "The React Way". Firstly, an oft-repeated phrase is "Everything is a Component". This may seem hyperbolic, but it is, in fact, true. Further, you will usually want to err on the side of _more_ components.

The best way to explain this, I think, is to demonstrate. Time for more code! Let's say we want to make a profile section, which contains a user's name, as well as a number of rows of information about them.

### The HTML Way

If you were creating this in plain HTML, your structure would look something like the following. This is a great start, and is what our final DOM will look like, so no harm in starting here.

```jsx
function Profile({ name, age, phone, github, twitter }) {
  return (
    <div>
      <h2 className="profile-name">{name}</h2>
      <ul className="profile-info">
        <li className="profile-row">
          <span className="profile-label">Age</span>
          <span className="profile-value">{age} years</span>
        </li>
        <li className="profile-row">
          <span className="profile-label">Phone</span>
          <span className="profile-value">{phone}</span>
        </li>
        <li className="profile-row">
          <span className="profile-label">
            <a href={`http://www.github.com/${github}`}>Gitbub</a>
          </span>
        </li>
        <li className="profile-row">
          <span className="profile-label">
            <a href={`http://www.twitter.com/${twitter}`}>Twitter</a>
          </span>
        </li>
      </ul>
    </div>
  );
};
```

### Getting More Semantic

You'll notice in the above snippet, there is a lot of repetition and a lot of extra information. Though React eventually needs to know the classNames, this information is not necessary to developer at all times, and can interfere with understanding the _intent_ of the component. We can reduce this noise with a few extra render components. Notice that all three of these new components, both in their definitions at the bottom and their usage inside `Profile`, start with a capital letter, as previously mentioned when discussing JSX.

If you don't recognize some of the syntaxes here (especially the uses of `...`), don't fret; we will address these in our next guide. The important take-away here is how these components encapsulate necessary but distracting information, in order to create _semantically named_ components whose purpose can be immediately understood without needing to know _how_ their purpose is achieved.

```jsx
function Profile({ name, age, phone, github, twitter }) {
  return (
    <div>
      <h2 className="profile-name">{name}</h2>
      <ul className="profile-info">
        <Item>
          <Label>Age</Label>
          <Value>{age} years</Value>
        </Item>
        <Item>
          <Label>Phone</Label>
          <Value>{phone}</Value>
        </Item>
        <Item>
          <Label>
            <a href={`http://www.github.com/${github}`}>Gitbub</a>
          </Label>
        </Item>
        <Item>
          <Label>
            <a href={`http://www.twitter.com/${twitter}`}>Twitter</a>
          </Label>
        </Item>
      </ul>
    </div>
  );
};

function Item({ children, ...props }) => (
  <li {...props} className="profile-row">{children}</li>
);

function Label({ children, ...props }) => (
  <span {...props} className="profile-label">{children}</span>
);

function Value({ children, ...props }) => (
  <span {...props} className="profile-value">{children}</span>
);
```

### The React Way

Finally! You may have noticed in the previous snippet that the `Profile` component was just as long as the original; it is now less than half the size, and much easier to understand at a glance.

The first thing done here was to break out the `h2` and `ul` into their own components. In the previous example this was not necessary as it did not reduce repetition. This time, however, we want to maximize _semantics_, so we will break out these even though they are only used once. Keep in mind that it is not always necessary to maximize semantics: this decision is entirely up to the developer, but I wanted to show what it looks like when you do.

The second modification was to the three previously created components:

* `Value` is still a very simple wrapper, but will skip rendering itself if no actual data is provided (if you look at the previous example, the social links have only a label and no value); this makes it easier to just pass your data down, even when there is none.

* `Label` has been updated only sightly as well: if it is provided an `href`, it will render the contents inside a link, otherwise it will render them undecorated. This change is very much about semantics: if I pass an href, I clearly want a link, but I do not need to see all of the extra syntax necessary to achieve my link. (For those of you more curious, this is the difference between declarative and imperative: This code declares that it wants a link and is not concerned with how a link is created. The previous examples had to explicitly describe what a link looks like.)

* Where `Item` was simply a wrapper before, it now takes the actual information it is concerned with as props (that is: `label`, `value`, and `href`). Now, rather than dealing with `Label` and `Value` directly in the main component, `Item` will render these for us, with the correct information. Because of the changes to `Label` and `Value`, it does not have to deal with conditionals on the value or the link, it just forwards the information that is necessary and lets those components make their own decisions.

Finally, let's have another look at `Profile`, specifically what happened inside `Items`. Rather than providing markup to the `Item` component by nesting it, we are now providing named _information_ to it through props. Combining that with the above changes, this component has reduced in size significantly while still maintaining all the important information.

```jsx
function Profile({ name, age, phone, github, twitter }) {
  return (
    <div>
      <Title>{name}</Title>
      <Items>
        <Item label="Age" value={`${age} years`} />
        <Item label="Phone" value={phone} />
        <Item label="Github" href={`http://www.github.com/${github}`} />
        <Item label="Twitter" href={`http://www.twitter.com/${twitter}`} />
      </Items>
    </div>
  );
};

function Title({ children, ...props }) => (
  <h2 {...props} className="profile-name">{children}</h2>
);

function Items({ children, ...props }) => (
  <ul {...props} className="profile-info">{children}</ul>
);

function Item({ label, value, href, ...props }) => (
  <li {...props} className="profile-row">
    <Label href={href}>{label}</Label>
    <Value>{value}</Value>
  </li>
);

function Label({ children, href, ...props }) {
  return (
    <span {...props} className="profile-label">
      { href ? (<a href={href}>{children}</a>) : children }
    </span>
  );
}

function Value({ children, ...props }) {
  if (!children) {
    return null;
  }

  return (
    <span {...props} className="profile-value">{children}</span>
  );
}
```

## Kicking it Up a Notch

Want to learn more? React has an amazing article on [Thinking in React](https://reactjs.org/docs/thinking-in-react.html).
