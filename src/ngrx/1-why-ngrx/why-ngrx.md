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

NgRx shines when used in applications that share data between many different components. Web apps which create side-effects or have complex, cascading side-effects are handled with ease by NgRx. 

Another benefit: NgRx is highly opinionated. Decision fatigue can be draining when managing state in a complex application. NgRx provides a highly effective and complete solution, freeing you from architecture decisions and letting you get down to writing code.

NgRx also offers performance benefits in the form of "memoization". NgRx keeps track of the data stored in state and will return data from memory if a state field's value has not changed, preventing costly and unneccesary re-processing of data.




