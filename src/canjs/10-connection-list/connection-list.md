@page canjs-training/connection-list Connection List
@parent canjs-training 10

@description List todos from the service layer (can-connect use)

@body


## The problem

Get all `todos` from the service layer using the "connected" `Todo` type.

## What you need to know

- [The can-connect Presentation](https://drive.google.com/open?id=0Bx-kNqf-wxZebHFWMElNOVEwSlE) up to and including _Important Interfaces_.
- [https://canjs.com/doc/can-connect/can/map/map.getList.html Type.getList] gets data using the
  [https://canjs.com/doc/can-connect/connection.getList.html connection’s getList] and returns a
  promise that resolves to the `Type.List` of instances:

  ```js
  Type.getList({}).then(function(list) {

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

Update _index.js_ to the following:

@sourceref ./index.js
@highlight 5,13-17,only
