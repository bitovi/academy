@page learn-canjs/routing Routing
@parent learn-canjs 17

@description Set up routing (can-route)

@body



Make it so that the following URLs display the corresponding
todos:

 - `#!` or ` ` - All todos
 - `#!active` - Only the incomplete todos
 - `#!complete` - Only the completed todos

Also, the _All_, _Active_, and _Completed_ buttons should
link to those pages and a `class="selected"` property should
be added if they represent the current page.


## What you need to know

- [route](https://canjs.com/doc/can-route.html) is used to connect a `DefineMap`’s properties
  to the URL.  This is done with [https://canjs.com/doc/can-route.data.html route.data] like:

  ```js
  route.data = new DefineMap();
  ```

- [route](https://canjs.com/doc/can-route.html) can create pretty routing rules.  For example,
  if `#!login` should set the `page` property of the
  `AppViewModel` to `"login"`, use `route.register()` like:

  ```js
  route.register("{page}");
  ```

- [https://canjs.com/doc/can-route.start.html route.start()] initializes the connection between the
  URL and the `AppViewModel`.  After you’ve created all
  your application’s pretty routing rules, call it like:

  ```js
  route.start()
  ```

- The [https://canjs.com/doc/can-stache-route-helpers.html can-stache-route-helpers] module provides helpers
  that use [route](https://canjs.com/doc/can-route.html).  

  [https://canjs.com/doc/can-stache-route-helpers.routeCurrent.html routeCurrent]
  returns truthy if the current route matches its first parameters properties.

  ```html
  {{# if(routeCurrent(page='login',true)) }}
    You are on the login page.
  {{/ if }}
  ```

  [https://canjs.com/doc/can-stache-route-helpers.routeUrl.html routeUrl] returns a URL that will
  set its first parameters properties:

  ```
  <a href="{{ routeUrl(page='login') }}">Login</a>
  ```

## The Solution

<details>
<summary>Click to see the solution</summary>

Update _index.js_ to the following:

@sourceref ./index.js
@highlight 2,9,16-37,only

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 4,23-26,29-32,35-38,only

__Success!__ You’ve completed this guide. Have questions or comments?
[Join our Slack](https://www.bitovi.com/community/slack) and let us know in the [#canjs channel](https://bitovi-community.slack.com/messages/CFC22NZ8A)
or our [forums](https://forums.bitovi.com/c/canjs)!

</details>