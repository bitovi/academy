@page learn-canjs/toggle-save Toggle Save
@parent learn-canjs 11

@description Toggling a todo’s checkbox updates service layer (can-connect use)

@body


## The problem

Update the service layer when a todo’s completed status
changes. Also, disable the checkbox while the update is happening.

## What you need to know

- Call [https://canjs.com/doc/can-connect/can/map/map.prototype.save.html .save()] to update a "connected"
  `Map` instance:

  ```js
  map.save();
  ```

  `save()` can also be called by an [https://canjs.com/doc/can-stache-bindings.event.html on:event] binding.

- [https://canjs.com/doc/can-connect/can/map/map.prototype.isSaving.html .isSaving()] returns true when `.save()`
  has been called, but has not resolved yet.

  ```js
  map.isSaving()
  ```


## The solution

<details>
<summary>Click to see the solution</summary>

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 16-17,only

</details>
