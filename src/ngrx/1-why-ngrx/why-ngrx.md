@page learn-ngrx/why-ngrx Why NgRx
@parent learn-ngrx 1

@description Why NgRx is a great tool for medium and large-sized web apps.

@body

## NgRx and the Flux model

NgRx is a state management library for building reactive applications using the Flux model. At its core, this approach creates a single source-of-truth for page state: the Store. Data from the store is read only via controlled, pre-defined methods (Selectors), and can only be modified by dispatching pre-defined Actions. This prevents components from wrecking havoc on one another by recklessly modifiying shared data, giving developers a clear set of controls for an application.

NgRx is a moderately complex library that might not be well suited to every project. The NgRx team provides the following when considering the framework: (can we embed this somehow? format it differently than the rest of the page?)

A good guideline that might help answer the question, "Do I need NgRx Store?" is the SHARI principle:

Shared: state that is accessed by many components and services.

Hydrated: state that is persisted and rehydrated from external storage.

Available: state that needs to be available when re-entering routes.

Retrieved: state that must be retrieved with a side-effect.

Impacted: state that is impacted by actions from other sources.


NgRx shines when used in applications that share data between many different components. Actions which create side-effects or have complex, cascading side-effects are handled with ease by NgRx. 

Another benefit: NgRx is highly opinionated. Decision fatigue can be draining when managing state in a complex application. NgRx provides a highly effective and complete solution, freeing you from architecture decisions and letting you get down to writing code.

## Stucture of an NgRx application. (if these two sections get too long we could split them into their own pages)

All data used by your application is stored in a single place: the Store. Data from the Store is not read directly, nor is it read all-at-once. Instead, we define "slices" of our Store's state and read them via "Selectors". Selectors are populated using "Reducers". These are pure functions which generate a single "slice" of state.

Our restriction on data flows both ways: components cannot read the Store directly, nor can they update it directly. If a change is required, we must dispatch an "Action". Actions are simple: they describe an event in our application. However, Actions do not process these events directly. Instead, an Action executes a Reducer which will re-generate a "slice" of state. If neccesary, we can use Actions to pass a "payload" to the Reducer. This gives us a way to updating the Store with new data. Once the Reducer re-generates a state "slice", it is passed to the Store and the "slice" of state flows out through its Selector.

Let's consider an example: suppose we have a "User" component which displays data about a user. Our User component "selects" the user it needs from the Store via a Selector. That "user" data is populated via a Reducer, but our User component doesn't have to worry about that: it merely selects the "user" that it needs to display 

Let's say we need to update our user's name. We don't update the user data directly, instead we dispatch an Action with a name like "[User] Update Name", and a payload containing the new name. This Action calls a Reducer that accepts the name and regenerates the "user" slice. This updates the "user" in our Store, which flows out through our selector to to our User component, and voila! We've updated our user's name.

One last step: let's suppose that our "user" information is stored in a database. We'd request this using an HTTP request: these are handled by "Effects". Like Actions, Effects define events but do not do all the heavy lifting. Our "[User] Update Name" Action would call an "updateUserName" Effect, which calls a "user" service responsible for interacting with our user database. Our Effect waits for the request, processes the response and passes updated "user" data to a second "[User] Name Updated" Action. This Action would call a Reducer which consumes the new data and re-generates our user.


