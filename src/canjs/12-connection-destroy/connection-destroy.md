@page learn-canjs/connection-destroy Connection Destroy
@parent learn-canjs 12

@description Delete todos in the page (can-connect use)

@body


## The problem

When a todo’s __destroy__ button is clicked, we need to delete the
todo on the server and remove the todo’s element from the page. While
the todo is being destroyed, add `destroying` to the todo’s `<li>`’s `class`
attribute.

## Things to know

- The remaining parts of the [https://canjs.com/doc/can-connect.html Presentation](https://drive.google.com/open?id=0Bx-kNqf-wxZebHFWMElNOVEwSlE), with an emphasis on how the [https://canjs.com/doc/can-connect/real-time/real-time.html real-time] behavior works.
- Delete a record on the server with [https://canjs.com/doc/can-connect/can/map/map.prototype.destroy.html .destroy()] like:
  ```js
  map.destroy()
  ```

- [https://canjs.com/doc/can-connect/can/map/map.prototype.isDestroying.html .isDestroying()] returns true when `.destroy()`
  has been called, but has not resolved yet.

  ```js
  map.isDestroying()
  ```

## The Solution

<details>
<summary>Click to see the solution</summary>

Update _index.stache_ to the following:

@sourceref ./index.html
@highlight 13,20,only

</details>
