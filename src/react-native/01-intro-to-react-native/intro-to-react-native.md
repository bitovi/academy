@page learn-react-native/intro-to-react-native Introduction to React Native
@parent learn-react-native 1
@outline 3

@description Discover why React Native is a great choice for modern mobile application development.

@body

## What is React Native?

React is a front-end JavaScript library designed for building scalable and dynamic web applications. It’s renowned for its ability to break down the view layer of applications into small, reusable [components](./components.html). These components make up the core of React’s architecture, allowing for efficient and manageable development. React is versatile and can also be for creating web, mobile, and desktop apps. While this course focuses on mobile development, the concepts apply across these different environments.

React Native is an open source framework for building Android and iOS applications using React and the app platform’s native capabilities. With React Native, you use JavaScript to access your platform’s APIs as well as to describe the appearance and behavior of your UI using React components: bundles of reusable, nestable code.

### Component-based architecture

React’s component-based architecture is another cornerstone of its design philosophy. This architecture involves building encapsulated components that manage their own state, then composing them to make complex UIs.

Here are the benefits of this approach:

**Reusability and consistency:** Components are designed to be reusable, which means you can define a component once and use it in multiple places in your application. This not only saves time and effort but also ensures UI consistency across your application.

**Ease of maintenance:** In a component-based architecture, each component is isolated, meaning changes made to one component don’t directly affect others. This isolation simplifies the maintenance and troubleshooting of applications, as you can focus on individual components without worrying about unintended consequences elsewhere.

**Improved collaboration:** This architecture is inherently modular, which is a boon for teams. Developers can work on different components simultaneously without causing merge conflicts. It also makes it easier to integrate work from multiple developers.

**Enhanced scalability:** As applications grow, managing them becomes more complex. Component-based architecture allows you to scale your application by adding new components or improving existing ones without having to refactor large parts of your codebase.

**State encapsulation:** Components in React can hold and manage their own state. This encapsulation of state in components makes for a more predictable and easier-to-manage state management, especially in large-scale applications.

### JSX for templating

React’s declarative nature means you define UIs as they should appear based on the current state, using JSX. This syntax allows you to write your component’s structure in a way that’s similar to HTML, differing from traditional imperative methods of UI construction.

Here’s why JSX is highly regarded as a templating language:

**Familiarity with HTML:** JSX closely resembles HTML, making it intuitive for anyone familiar with web development. This familiarity allows us to quickly understand and write UI code, significantly reducing the learning curve for new React developers.

**Enhanced readability:** JSX promotes cleaner and more readable code. It allows you to clearly see the layout of your UI in a way that feels like writing HTML, making it easier to visualize the component’s structure and behavior.

### UI as a function of data and state

React maps the JSX that we write to a Virtual DOM, which is an in-memory representation of the real browser DOM. This apprach has numerous benefits in building large applications:

**Predictable state-to-UI mapping:** React excels at ensuring that the UI is always a direct reflection of the application’s state. This approach means that every time there’s a change in state, React updates the Virtual DOM to reflect this change. As a developer, this gives you a predictable and straightforward way to manage UI changes, as the state drives the UI rendering.

**Focus on state, not the DOM:** The Virtual DOM lets us concentrate on managing the state of the application. The UI updates automatically to mirror the current state, thanks to React’s reactive model. This significantly simplifies the development process, as you’re not manually handling the DOM updates, leading to more maintainable and readable code.

**Efficient update mechanism:** React’s rendering approach leads to efficient update mechanisms in dynamic UIs. By batching these updates and only applying the necessary changes to the actual DOM, React ensures that the UI is always in sync with the state with minimal performance overhead.

**Minimized reflows and repaints:** Direct DOM manipulations can be costly, especially in complex UIs. React’s Virtual DOM minimizes the direct interactions with the actual DOM, reducing costly reflows and repaints. This results in a smoother performance, particularly in applications where the UI changes frequently based on user interactions and state changes.

**Consistent experience across platforms:** The principle of “UI as a function of data and state” isn’t just limited to web development with React. It extends to other environments like mobile apps with React Native. This provides a consistent development experience, where the same patterns and principles apply, regardless of the platform.

## Why use React?

### Versatility across platforms

React’s reach extends beyond traditional web applications. One of its most significant advantages is its adaptability to various platforms, most notably through React Native for mobile app development. This means you can use the same React principles to build applications not just for the web, but also natively for iOS and Android. This versatility significantly reduces the learning curve when transitioning between web and mobile development, allowing teams to share expertise and code more effectively.

### Strong community and corporate backing

React, initially developed and maintained by Facebook (now Meta), enjoys robust corporate support. This backing ensures continuous development and long-term viability, crucial factors when choosing a technology stack.

Moreover, the React community is one of the most active and vibrant in the tech world. This thriving community contributes to a wealth of resources, including tutorials, tools, and third-party libraries, making React a rich and continuously evolving ecosystem.

### Rich ecosystem of tools and libraries

React’s ecosystem is replete with tools and libraries that enhance and simplify development. From routing libraries like React Router to data fetching libraries like React Query and SWR, the ecosystem provides a comprehensive set of tools that cover virtually every need in modern web development.

### Compatibility with any backend

React’s design as a frontend library makes it backend agnostic. This means it can be integrated seamlessly with any backend technology, whether it’s a Node.js server, a Python Django backend, or a Java Spring application. This compatibility is crucial for businesses and developers who work in diverse technical environments, as it allows for more flexibility in choosing or integrating with existing backend technologies.

## Next steps

Next, let’s [set up your system](./setting-up-your-environment.html) to develop and run a React Native app.
