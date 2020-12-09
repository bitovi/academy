@page learn-ngrx/data-flow-in-ngrx Data Flow in NgRx
@parent why-ngrx 1

@description How data is managed in an NgRx application

@body

## Data Flow in NgRx

The diagram below outlines the flow of application state in an NgRx application:



Data used by your application is stored in a single place: the Store. Data from the Store is not read directly, nor is it read all-at-once. Instead, we define "slices" of our Store's state and read them via "Selectors". Selectors are populated using "Reducers". These are pure functions which generate a single "slice" of state.

Our restriction on data flows both ways: just like how components cannot read the Store directly, they cannot update it directly. If a change is required, we must dispatch an "Action". Actions are simple: they describe an event in our application. However, Actions are not responsible for implementing these events. Instead, an Action will be mapped a Reducer which re-generates a "slice" of state. If neccesary, Actions can to pass a "payload" to the Reducer, which lets us update the store with new data. Once the Reducer re-generates a state "slice", it is passed to the Store and the "slice" of state flows out through its Selector.

Consider an example: suppose we want to build a "User Info" component which displays data about a user. Our User component "selects" the user it needs from the Store via a Selector. That "user" data will be populated via a Reducer, but our User Info component doesn't have to worry about that: it merely selects the "user" that it wants to display. 

Let's say we need to update our user's name. We won't update the user data directly. Instead we dispatch an Action with a name like "[User] Update Name", along with a payload containing our updated name. The Action will call a Reducer that regenerates the "user" slice with the new name. This updates the "user" in our Store, which flows out through our selector to to our User component, and voila! We have an updated user name.

One last step: let's suppose that our "user" information is stored in a database. We'll need to connect to this database and update our user's name. Typically we'd use a service to make an HTTP request to our database. In NgRx, we interact with these services via "Effects". Like Actions, Effects define events but do not do all the heavy lifting. Our "[User] Update Name" Action will call an "updateUserName" Effect, which calls a "user" service responsible for interacting with our user database. Our Effect waits for the request, processes the response and passes our updated "user" data to a second "[User] Name Updated" Action. This Action calls a Reducer which consumes the new data and re-generates our user. And voila! We've updated our user's name.