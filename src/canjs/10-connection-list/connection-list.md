@page learn-canjs/connection-list Connection List
@parent learn-canjs 10

@description List todos from the service layer (can-connect use)

@body


## The problem

Get all `todos` from the service layer using the "connected" `Todo` type.

## What you need to know

<iframe class="iframe-16-9-plus-nav" src="https://docs.google.com/presentation/d/e/2PACX-1vRrAKhe4VezwxYfJ1FJYPNPLNcrE8iu6xQPlxv3tzQbjIHaBmsUUmz-N3f2PFEmSjI4Z0lHPQWa5p3J/embed?start=false&loop=false&delayms=3000#slide=45" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [The can-connect Presentation](https://docs.google.com/presentation/d/1ZuxUR9HXKyGqqG9HUQBqwqSJRFG5PJsRMdzZ1-TGAos/edit?usp=sharing#slide=45) up to and including _Important Interfaces_.
- [https://canjs.com/doc/can-connect/can/map/map.getList.html Map.getList] gets data using the
  [https://canjs.com/doc/can-connect/connection.getList.html connection’s getList] and returns a
  promise that resolves to the list of instances:

  ```js
  Map.getList({}).then(function(list) {

  })
  ```
- An async [https://canjs.com/doc/can-define.types.get.html getter] property behavior can be used
  to "set" a property to an initial value:

  ```js
  property: {
      get: function(lastSet, resolve) {
          SOME_ASYNC_METHOD( function callback(data) {
              resolve(data);
          });
      }
  }
  ```

## The solution

<details>
<summary>Click to see the solution</summary>

Update _index.js_ to the following:

@sourceref ./index.js
@highlight 5,13-17,only

</details>
