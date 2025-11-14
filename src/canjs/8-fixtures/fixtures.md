@page learn-canjs/simulate-service-layer Simulate the service layer
@parent learn-canjs 8

@description Simulate the service layer (can-fixture)

@body



## The problem

Simulate a service layer that handles the following requests and responses:

__GET /api/todos__

```
-> GET /api/todos

<- {
    "data": [
      { "name": "mow lawn", "complete": false, "id": 5 },
      { "name": "dishes", "complete": true, "id": 6 },
      { "name": "learn canjs", "complete": false, "id": 7 }
    ]
}
```

This should also support a `sort` and `complete` params like:

```
-> GET /api/todos?sort=name&complete=true
```


__GET /api/todos/{id}__

```
-> GET /api/todos/5

<- { "name": "mow lawn", "complete": false, "id": 5 }
```

__POST /api/todos__

```
-> POST /api/todos
   {"name": "learn can-fixture", "complete": false}

<- {"id": 8}
```

__PUT /api/todos/{id}__

```
-> PUT /api/todos/8
   {"name": "learn can-fixture", "complete": true}

<- {"id": 8, "name": "learn can-fixture", "complete": true}
```

__DELETE /api/todos/{id}__

```
-> DELETE /api/todos/8

<- {}
```

## What you need to know

<iframe class="iframe-4-3-plus-nav" src="https://docs.google.com/presentation/d/e/2PACX-1vQEV23MxsjypiV3edlA-JOIfK2Im5Jzlb30xmNqPkaa7nEMwh02hGU4lWCTwdU2XutbDLq0sEGpRuDQ/embed?start=false&loop=false&delayms=3000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

- [The can-fixture Presentation](https://docs.google.com/presentation/d/1gBvNTzzcSl1h8I-pvxARqwvIjK2ELvGgyFTzxBKU_Vo/edit?usp=sharing)
- [https://canjs.com/doc/can-fixture.html fixture] - is used to trap AJAX requests like:

  ```js
  fixture("/api/entities", function(request) {
    request.data.folderId //-> "1"

    return {data: [...]}
  })
  ```

- [https://canjs.com/doc/can-fixture.store.html can-fixture.store] - can be used to automatically filter records if given a [https://canjs.com/doc/can-set-legacy.Algebra.html schema].

  ```js
  const entities = [ .... ];
  const entitiesStore = fixture.store( entities, entitiesAlgebra );
  fixture("/api/entities/{id}", entitiesStore);
  ```

## The solution

<details>
<summary>Click to see the solution</summary>


Create _models/todos-fixture.js_ as follows:

@sourceref ./todos-fixture.js

</details>