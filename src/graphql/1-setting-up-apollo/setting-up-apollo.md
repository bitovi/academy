@page learn-graphql/setting-up-apollo Setting Up a GraphQL Server with Apollo
@parent learn-graphql 1

@description This GraphQL tutorial will take you through creating different entities, how to create a server using Apollo Server 4, and some of the plugins available to use. We will go through queries, mutations, dealing with the resolver chain (A.K.A entity resolution). We’ll talk a bit about growing our graph including update mutations and introduce some error handling. Then we’ll go over directives that are available for the maintenance of your graph, and then end with adding some cache control for some fields within an entity.

@body

## Our Application

We are going to create a baseline application that has three main entities: **renters, properties, and propertyOwners**. This application will create some create/read endpoints for the following entities, and establish the different relationships between renters, properties, and propertyOwners. We want to start building an application that allows renters to find roommates as well as properties that are owned by property owners.

## Dependencies

Open up a directory and let’s call it `node-graphql-2023`. From there run `npm init` and then run the following command to install the necessary packages:

```shell
npm i @apollo/server body-parser cors express graphql
```

**Note:** With the Update of Apollo Server 4, the intention is to focus on improving Apollo Server’s extensibility and making it simpler to use, maintain, and document. This means that `@apollo/server` combines numerous smaller packages, namely **startStandaloneServer** and **expressMiddleware** functions.

## Apollo Server 4 Contents
- The `ApolloServer` class
- An Express 4 integration (similar to `apollo-server-express`)
- A standalone server (`startStandaloneServer`)
- And a set of [core plugins](https://www.apollographql.com/docs/apollo-server/migration/#plugins-are-in-deep-imports)

## Apollo Server 4 Changes
- You can pass your **context** initialization function directly to whatever framework you are using in its integration function rather than the **ApolloServer** constructor (we will see this later in the tutorial)

- You are responsible for setting up HTTP body parsing and CORS

- You need to specify a path for your server to listen on explicitly, whereas before it would default to `/graphql`

**Note:** The Apollo Server core team no longer supports the following packages:

- `apollo-server-fastify`
- `apollo-server-hapi`
- `apollo-server-koa`
- `apollo-server-lambda`
- `apollo-server-micro`
- `apollo-server-cloud-functions`
- `apollo-server-cloudflare`
- `apollo-server-azure-functions`

Your package.json should look something like this:

```json
{
  "name": "node-graphql-2023",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node --watch ./index.js"
  },
  "engines": {
    "node": ">=18.6.0",
    "npm": ">=8.13.0"
  },
  "dependencies": {
    "@apollo/server": "^4.3.0",
    "body-parser": "^1.20.1",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "graphql": "^16.6.0"
  }
}
```
**Note:** Notice that there is a lock on the engine for `node` and that is because we will be using some experimental features from `node@18.6.0` namely the `--watch` flag removing our need to install packages like `nodemon`.

Next we will be creating our basic server, create an `index.js` with the following code:

```js
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { typeDefs, resolvers } = require('./src');

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer })
    ]
});

async function main() {
    await server.start();

    app.use(
        '/',
        cors(),
        // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
        bodyParser.json({ limit: '50mb' }),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token }),
        })
    );
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀  Server ready at http://localhost:4000/`);
}

main();
```

Currently don’t worry about the **typeDefs** and **resolvers** as we will be defining those soon within the `/src` folder. These represent our schema definitions and resolvers which is how we will resolve different fields, entities, queries and mutations. We use a plugin called **ApolloServerPluginDrainHttpServer** which is used to ensure that the node server closes down correctly. Next we create a main function so that we can call `await server.start()` and we are unable to do that outside of an async function. We will then apply our middleware, which will set up our server to have CORS enabled, the ability to pass in a json object in a body to the server, and lastly we include **expressMiddleware** to pass in the parameters we want to include in our **context** within GraphQL resolvers. Later we will include our database connection (SQL, noSQL or an ORM) in this method. 

**Note:** We don’t use `startStandaloneServer` because it does not provide out-of-the-box support for middleware. It is more used for getting simple servers up and running.

## Schema Creation and Separation

Next we are going to create our `/src` folder: This will include the following sub-folders: **common, properties, propertyOwners, renters**. We are creating separate folders for each of the entities so that we can introduce the idea of **schema stitching** which is essentially putting all the schemas that are separate into one big schema. By keeping these schemas separate, it makes it much easier to maintain and read as the project grows. We will add to the common sub-folder later.

## Renter Entity

The first schema we are going to make is for the Renter entity. We are going to create the following files: `index.js, dataSource.js, resolver.js, and schema.js` within the `/src/renters` folder. We are separating out each file so that the methods that will interact with our data source (for now it will be a local data file, but later will be a database), will be put in our `dataSource.js` file. The type definitions for the renter schema, will be put in the `schema.js` file. The object containing how we will resolve the Renter entity, queries, and mutations will be in the `resolver.js` file. **Resolvers** are a series of functions that are responsible for populating the data for a single field in your schema, while the **dataSource** should only contain methods we wish to expose on how to interact with our data. As a result of the logical separation of concerns, we want to have that code also be separate.

### Renter Schema

The first thing we will do is define an entity called **Renter**, and create baseline Queries and Mutations to cover our application. We will include one `input` type as the input for the `createRenter` method signature:

```js
const typeDefs = `#graphql
    type Renter {
        id: ID!
        name: String!
        city: String!
        rating: Float
        roommates: [Renter]
    }

    input CreateRenterInput {
        name: String!
        city: String!
        # need ID to attach roommate to renter
        roommates: [ID]
    }

    type Query {
        renters: [Renter]
        getRenterById(renterId: ID!): Renter
    }

    type Mutation {
        createRenter(createRenterInput: CreateRenterInput): Renter
    }
`

module.exports = {
    typeDefs
}
```

**Note:** By using the `#graphql` in front of a template string we are able to have syntax highlighting for GraphQL.

Another thing to note is that our input uses `roommates` as a list of **IDs** rather than a list of **Renters**, that way we can grab the information from our dataSource and we don’t have to supply potentially invalid or out of date information for the `roommates` field. When we return the roommates field we will be covering the topic of entity resolution, but we will address this in the `resolver.js` file.

### Renter Resolver

We are going to write the code that will deal with the resolution process of the Queries and Mutations we have written out above:

```js
const {
    getRenterById,
    createRenter,
    getAllRenters
} = require('./dataSource');

const resolvers = {
    Renter: {
        roommates(parent) {
            return parent.roommates.map((roommateId) => getRenterById(roommateId));
        }
    },
    Query: {
        getRenterById: (_parent, args) => {
            return getRenterById(args.renterId);
        },
        renters: () => getAllRenters()
    },
    Mutation: {
        createRenter: (_parent, args) => {
            return createRenter(args.createRenterInput);
        }
    }
};

module.exports = {
    resolvers
};
```

You will see that in general when we don’t use a parameter in a method signature, we typically preface it with a `_` in order to indicate that we won’t use that parameter within the function. Another thing to notice is that our data logic is entirely separated into our `dataSource` file, so we will have to create those referenced functions above.

### Renter entity resolution

When we mentioned that we would have to include a method to resolve that list of **IDs** for roommates and somehow turn that into a list of `Renter` objects this concept is known as **entity resolution**. We will accomplish this by adding a specific field resolution for `roommates` within the `Renter` type in our resolver object. We will call `getRenterById` to pull the information we need from the IDs provided so that our queries don’t throw an error expecting a type `Renter` but receiving a type of `ID`.

### Renter dataSource

We will be using a global package called `crypto` that was added to Node that will help us to generate unique id’s for our `createRenter` mutation. Otherwise the other two Query methods are pretty self-explanatory: `getRenterById` will take an ID and return a found `Renter` entity, while `getAllRenters` will return all the renters in the system:
```js
const crypto = require('crypto');
let { renters } = require('../../data');

function getRenterById(renterId) {
    return renters.find((renter) => renter.id === renterId);
}

function createRenter(renter) {
    const newRenter = {
        city: renter.city,
        id: crypto.randomUUID(),
        name: renter.name,
        rating: 0,
        roommates: renter.roommates || []
    };
    renters = [
        ...renters,
        newRenter
    ];
    return newRenter;
}

function getAllRenters() {
    return renters;
}

module.exports = {
    getRenterById,
    createRenter,
    getAllRenters
}
```

For the `createRenter` method we don’t need to pass in a `rating` as it will be a field that will get updated by another mutation down the line, but during creation the default rating should be 0.

### Export Renter Schema and Resolver

We will also create an `index.js` file within the `renter` folder with the following code in order to export our schema and resolver so it can be stitched together:

```js
const { resolvers } = require('./resolver');
const { typeDefs } = require('./schema');

module.exports = {
    resolvers,
    typeDefs
}
```
Next we have to create an `index.js` file within `/src` so that we are able to start the schema stitching process and export one set of `resolvers` and `typeDefs` to our Apollo Server initialization:
```js
const {
    mergeTypeDefs,
    mergeResolvers
} = require('@graphql-tools/merge');

const {
    resolvers: renterResolvers,
    typeDefs: renterTypeDefs
} = require('./renters');


const typeDefs = mergeTypeDefs([
    propertyTypeDefs
]);

const resolvers = mergeResolvers([
    propertyResolvers
]);

module.exports = {
    resolvers,
    typeDefs
}
```
As we create resolvers for **property** and **propertyOwner** we will be adding to the lists passed to the `mergeTypeDefs` method and the `mergeResolvers` method.

**Note:** Rather than needing the entire `@graphql-tools` library, we only need to install `@graphql-tools/merge` which reduces our overall dependency size. We still need to define some baseline data values for **renters** so we will do that next.

### Renter Data

Go to the top level of the project and create a file called `data.js`. We populate the object to match the schema definition we defined earlier, and it will look like this:
```js
const renters = [
    {
        id: 'fdbe21a8-3eb3-4a70-a3b9-357c2af5acec',
        name: 'renter 1',
        city: 'Toronto',
        rating: 4,
        roommates: []
    },
    {
        id: 'd83323ad-7dbf-4b71-8ee9-47dcf136cc18',
        name: 'renter 2',
        city: 'Toronto',
        rating: 3.5,
        roommates: []
    }
];

// Create renter/roommate relation
renters[0].roommates.push(renters[1].id);
renters[1].roommates.push(renters[0].id);

module.exports = {
    renters
}
```
**Pause Step:** With this we should be able to test out our Renter endpoints in the Apollo Studio Sandbox.

## PropertyOwner Entity

Overall we want some baseline fields that represent what sort of information we may want to display from a property owner, but namely we want to setup a relationship between a property owner and a property. We will accomplish this via the **properties** field. Like the renter folder, we are going to create a *schema, resolver, and dataSource* as well as a file to export our **typeDefs** and **resolvers** created for schema stitching.


### PropertyOwner Schema
```js
const typeDefs = `#graphql
    type PropertyOwner {
        id: ID!
        name: String!
        address: String!
        rating: Float
        properties: [Property]
        photo: String
    }

    input CreatePropertyOwnerInput {
        name: String!
        address: String!
        properties: [ID]
        photo: String
    }

    type Query {
        propertyOwners: [PropertyOwner]
        getPropertyOwnerById(propertyOwnerId: ID!): PropertyOwner
    }

    type Mutation {
        createPropertyOwner(createPropertyOwnerInput: CreatePropertyOwnerInput): PropertyOwner
    }
`

module.exports = {
    typeDefs
}
```

**Note:** You’ll start to notice a pattern here with the base get/create query/mutations within the schemas.

### PropertyOwner Resolver

While most of the get/create methods are following the same sort of pattern, the interesting part of this is the **entity resolution** required for the `properties` field within **PropertyOwner**:
```js
const {
    createPropertyOwner,
    getAllPropertyOwners,
    getPropertyOwnerById
} = require('./dataSource');
const {
    getPropertyById
} = require('../properties/dataSource');

const resolvers = {
    PropertyOwner: {
        properties(parent, _args) {
            return parent.properties.map((propertyId) => getPropertyById(propertyId));
        }
    },
    Query: {
        getPropertyOwnerById: (_parent, args) => {
            return getPropertyOwnerById(args.propertyOwnerId);
        },
        propertyOwners: () => getAllPropertyOwners()
    },
    Mutation: {
        createPropertyOwner: (_parent, args) => {
            return createPropertyOwner(args.createPropertyOwnerInput);
        }
    }
};

module.exports = {
    resolvers
};
```

### PropertyOwner properties field resolution

Our resolver for the `properties` field will need to call the `getPropertyById` function from our **Property** dataSource in order to resolve the list of IDs and return a **Property** object (however in order for us to be able to test these mutations/queries, we will need to complete the **Property** dataSource and schema).

### PropertyOwner dataSource

This will follow a similar paradigm to the renter dataSource:
```js
const crypto = require('crypto');
let { propertyOwners } = require('../../data');

function getPropertyOwnerById(propertyOwnerId) {
    return propertyOwners.find(
        (propertyOwner) => propertyOwner.id === propertyOwnerId
    );
}

function createPropertyOwner(propertyOwner) {
    const newPropertyOwner = {
        id: crypto.randomUUID(),
        name: propertyOwner.name,
        address: propertyOwner.address,
        properties: propertyOwner.properties || [],
        photo: propertyOwner.photo
    };

    propertyOwners = [
        ...propertyOwners,
        newPropertyOwner
    ];
    return newPropertyOwner;
}

function getAllPropertyOwners() {
    return propertyOwners;
}

module.exports = {
    getPropertyOwnerById,
    createPropertyOwner,
    getAllPropertyOwners
}
```

**Note:** You can copy and paste the `index.js` from `src/renters` to `src/propertyOwners` as well as the `src/properties` folders. Since the import/export of these folders follow the same exact structure.

### PropertyOwner Schema Stitching

Remember to add the following lines to your `/src/index.js` file in order to export the merged typeDefs and resolvers:
```js
const {
    resolvers: propertyOwnerResolvers,
    typeDefs: propertyOwnerTypeDefs
} = require('./propertyOwners');

const typeDefs = mergeTypeDefs([
    propertyOwnerTypeDefs,
    renterTypeDefs
]);

const resolvers = mergeResolvers([
    propertyOwnerResolvers,
    renterResolvers
]);
```

### PropertyOwner Data
Now we need to create a list of property owners within our `data.js` file, and we’ll add the following lines:

```js
const propertyOwners = [
    {
        id: 'c173abf2-648d-4df8-a839-b12c9117277e',
        name: 'owner 1',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    },
    {
        id: 'a09092cf-b99d-44c5-8dd6-68229d0258b5',
        name: 'owner 2',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    }
]

module.exports = {
    renters,
    propertyOwners
}
```
**Pause Step:** With this we **won’t** be able to test our endpoints in Apollo Studio Sandbox because we currently have no way to resolve the properties field within the **PropertyOwner** object.

## Property Entity

Each property will have some basic information about it, a unique id, and will have connections to both the renter entity, and the propertyOwner entity. This will allow you to see if a property currently has tenants, and who the owner is as well as their contact information.

### Property Schema

```js
const typeDefs = `#graphql
    type Property {
        id: ID!
        name: String!
        city: String!
        available: Boolean
        description: String
        photos: [String]
        rating: Float
        renters: [Renter]
        propertyOwner: PropertyOwner!
    }

    input CreatePropertyInput {
        name: String!
        city: String!
        available: Boolean
        description: String
        photos: [String]
        # need ID to attach renter to renters
        renters: [ID]
        propertyOwnerId: ID!
    }

    type Query {
        getPropertyById(propertyId: ID!): Property
        properties: [Property]
    }

    type Mutation {
        createProperty(createPropertyInput: CreatePropertyInput): Property
    }
`;


module.exports = {
    typeDefs
};
```

The only thing to note is that during the creation of a property entity, we are requiring the `propertyOwnerId` field to be filled. Essentially saying you need to have a person attached to the property for contact purposes.

### Property Resolver

This entity is interesting since we now need to define two resolver methods: one for the `renters` field and the other for the `propertyOwner` field. In this case we will have to import the methods from their respective dataSource files. It will look like the following:
```js
const {
    getPropertyById,
    createProperty,
    getAllProperties
} = require('./dataSource');
const {
    getPropertyOwnerById
} = require('../propertyOwners/dataSource');
const {
    getRenterById
} = require('../renters/dataSource');

const resolvers = {
    Property: {
        renters(parent) {
            return parent.renters.map((renterId) => getRenterById(renterId));
        },
        propertyOwner(parent) {
            return getPropertyOwnerById(parent.propertyOwner);
        }
    },
    Query: {
        getPropertyById: (_parent, args) => {
            return getPropertyById(args.propertyId);
        },
        properties: () => getAllProperties()
    },
    Mutation: {
        createProperty: (_parent, args) => {
            return createProperty(args.createPropertyInput);
        }
    }
};

module.exports = {
    resolvers
};
```

### Property dataSource

Creating the core methods `getEntityById, getAllEntities and createProperty` will be following the similar format to before:
```js
const crypto = require('crypto');
let { properties } = require('../../data');

function getPropertyById(propertyId) {
    return properties.find(
        (property) => property.id === propertyId
    );
}

function createProperty(property) {
    const newProperty = {
        available: property.available,
        city: property.city,
        description: property.description,
        id: crypto.randomUUID(),
        name: property.name,
        photos: property.photos || [],
        propertyOwner: property.propertyOwnerId,
        rating: 0,
        renters: property.renters || []
    };

    properties = [
        ...properties,
        newProperty
    ];
    return newProperty;
}

function getAllProperties() {
    return properties;
}

module.exports = {
    getPropertyById,
    createProperty,
    getAllProperties
}
```

**Note:** Don’t forget to copy and paste the `index.js` from `src/renters` to `src/properties`!

### Property Schema Stitching

Remember to add the following lines to your `/src/index.js` file in order to export the merged typeDefs and resolvers:

```js
const {
    resolvers: propertyResolvers,
    typeDefs: propertyTypeDefs
} = require('./properties');

const typeDefs = mergeTypeDefs([
    propertyTypeDefs,
    propertyOwnerTypeDefs,
    renterTypeDefs
]);

const resolvers = mergeResolvers([
    propertyResolvers,
    propertyOwnerResolvers,
    renterResolvers
]);
```

### PropertyData

Now we need to create the data that will match our properties schema, so we will add the following lines to the `data.js` file:
```js
const properties = [
    {
        id: '86d401bb-cc8a-40f6-b3fc-396e6ddabb1a',
        name: 'Deluxe suite 1',
        city: 'Toronto',
        rating: 5.0,
        renters: [renters[0].id],
        available: true,
        description: 'amazing place 1',
        photos: [],
        propertyOwner: propertyOwners[0].id
    },
    {
        id: 'bcc2bb10-c919-42ae-8f6c-d24dba29c62f',
        name: 'Deluxe suite 2',
        city: 'Toronto',
        rating: 5.0,
        renters: [renters[1].id],
        available: true,
        description: 'amazing place 2',
        photos: [],
        propertyOwner: propertyOwners[1].id
    }
];

// Create propertyOwner/property relation
propertyOwners[0].properties.push(properties[0].id);
propertyOwners[1].properties.push(properties[1].id);

module.exports = {
    renters,
    propertyOwners,
    properties
}
```

**Pause Step:** Now we can test our endpoints for both properties and propertyOwners now that we have data, entity resolution, and schema stitching in place.

## Introducing Error Handling

For all our endpoints so far we have always assumed the method would succeed, but what if it didn’t? That’s where having a generic **Error** type would help so that we can capture that error as part of its expected behavior. When throwing these errors, we want to ensure we have a human-readable error. But to start we are going to create a baseline `Error` interface in our schema. Since this is something that will be shared across schemas, we will add it to the `src/common` folder. Let’s create a `schema.js` within this folder and add the following:
```js
const typeDefs = `#graphql
    interface Error {
        message: String!
    }
`;

module.exports = {
    typeDefs
};
```

**Note:** You must make sure to add an `index.js` within `src/common` so that you can export `typeDefs` from this schema file.

We will also need to add the typeDefs we made to be included in the schema stitching. We will add the following lines of code to our `src/index.js`:

```js
const {
    typeDefs: commonTypeDefs
} = require('./common');

const typeDefs = mergeTypeDefs([
    commonTypeDefs,
    propertyTypeDefs,
    propertyOwnerTypeDefs,
    renterTypeDefs
]);
```

### Adding an Update mutation

Now that we have baseline create/read methods for each of the entities we are going to go through how we will add an update mutation. First thing we will add is the **updateProperty** method to the schema and create a new input type **UpdatePropertyInput**. We will also be creating a **Union** type called **UpdatePropertyResult** which is a **Union** of either a **Property**, or a **PropertyNotFoundError**. In practice when we want to update a property, so far we will either be passed a valid id contained in our dataSource, or an invalid one, which means we will return this `PropertyNotFoundError`:

```graphql
input UpdatePropertyInput {
    id: ID!
    name: String
    city: String
    available: Boolean
    description: String
    photos: [String]
    rating: Float
    # need ID to attach renter to renters
    renters: [ID]
    propertyOwner: ID
}

type PropertyNotFoundError implements Error {
    message: String!
    propertyId: ID!
}

union UpdatePropertyResult = Property | PropertyNotFoundError

type Mutation {
    createProperty(createPropertyInput: CreatePropertyInput): Property
    updateProperty(updatePropertyInput: UpdatePropertyInput): UpdatePropertyResult
}
```

We have created a type **PropertyNotFoundError** which will extend our base error type. By doing this, **PropertyNotFoundError** has to have a non-nullable field `message` and then we add another field `propertyId` to return to the user the incorrect id passed to the method. We cannot have a return type of our mutation be `Property | PropertyNotFoundError` so we must create a **Union** type and set that as the return type of the mutation.

Next we have to add the logic for the `updateProperty` within our resolver, so we will add the following lines to `src/properties/dataSource.js`:

```js
const {
    ...,
    updateProperty
} = require('./dataSource');

Mutation: {
    ...,
    updateProperty: (_parent, args) => {
        return updateProperty(args.updatePropertyInput.id, args.updatePropertyInput);
    }
}
```

**Note:** The `...` signifies the code you already have in that snippet.

Now we need to define the core logic of the `updateProperty` method within our `dataSource` file, we will add the following lines to `dataSource.js`:

```js
const { PropertyNotFoundError } = require('../../errors');

function updateProperty(propertyId, updatedProperty) {
    const foundPropertyIndex = properties.findIndex(
        (aProperty) => aProperty.id === propertyId
    );

    if (foundPropertyIndex < 0) {
        return PropertyNotFoundError(propertyId);
    }

    properties[foundPropertyIndex] = {
        ...properties[foundPropertyIndex],
        ...updatedProperty
    };

    return {
        __typename: 'Property',
        ...properties[foundPropertyIndex]
    };
}
```

**Note:** We defined an error type called `PropertyNotFoundError` so that we can return an object with that same type.

We’ll need to create an `/errors` folder and we’ll create a `PropertyNotFoundError.js` file in that folder as well as the `index.js` we will use to export that error (and set the stage for future errors we’ll create). This function will take a `propertyId` and return an object that has a `message` field and a `propertyId` field. You’ll also notice we have to add another field: `__typename`. This is used so that when we are resolving the return type of our update method, it will be a valid return type that we defined in our union. If we didn’t include the `__typename` field, then the resolver has no way of knowing what type it is, and will cause an error during the resolution process.

Our `PropertyNotFoundError.js` will look like this:

```js
function PropertyNotFoundError(propertyId) {
    return {
        __typename: 'PropertyNotFoundError',
        message: 'Unable to find property with associated id.',
        propertyId
    };
};

module.exports = {
    PropertyNotFoundError
};
```

**Pause Step:** Now we should be able to test our update method in Apollo Studio Sandbox.

In order to test the endpoint you will need to use the `...on` for the potential return types for `updateProperty` which will look something like this:

```graphql
mutation UpdateProperty($updatePropertyInput: UpdatePropertyInput) {
  updateProperty(updatePropertyInput: $updatePropertyInput) {
     ...on PropertyNotFoundError {
       message
       propertyId
     }
     ...on Property {
        available
        city
        id
        name
     }
  }
}
```

## Growing your schema and things to keep in mind

As we grow our schema, especially when serving multiple customers or clients, we have to keep in mind what changes might be considered “breaking” changes. The breaking changes are as follows:

- Removing a type or field
- Renaming a type or field
- Adding nullability to a field where the field was previously non-nullable
- Adding non-nullability to a field where the field was previously non-nullable
- Removing a field’s arguments

One thing we can do is create a new field to an object and set the old field as deprecated, giving some time before making those breaking changes. This can be helpful to coordinate with front-end teams or other members that will use the endpoints you are creating, while keeping the endpoints stable for users that consume your API. The good news is that GraphQL has some built-in **directives** that can help us accomplish just that, in fact there is a `deprecated` directive that we can use! Let’s add the following lines to the `src/renters/schema.js` file:
```graphql
type Renter {
    ...
    deprecatedField: Boolean @deprecated(reason: "Use nonDeprecatedField.")
    nonDeprecatedField: Boolean
}
input CreateRenterInput {
    ...
    deprecatedField: Boolean @deprecated(reason: "Use nonDeprecatedField.")
    nonDeprecatedField: Boolean
}
```

**Note:** To use a directive you need to start with a `@` symbol followed by the name of the directive you are using. This directive is actually a function which will take a parameter `reason` which will display to the user when attempting to use the `deprecatedField`. The deprecated directive can be used with the following types: `FIELD_DEFINITION | ARGUMENT_DEFINITION | INPUT_FIELD_DEFINITION | ENUM_VALUE`.

**Pause Step:** Check this out in Apollo Studio Sandbox and you will see the deprecated message!

## Setting up a caching mechanism

Since we are utilizing the power of directives when updating fields, we can also use it to start some ground work on caching some of our entities or fields within them. To do this we will be using a plugin offered by our `@apollo/server` library. We will add it to our `ApolloServer` initialization by passing it within the `plugins` field which you can see below (located in our top-level `index.js`):

```js
const { ApolloServerPluginCacheControl } = require('@apollo/server/plugin/cacheControl');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginCacheControl({
            // Cache everything for 1 second by default.
            defaultMaxAge: 1,
            // Don't send the `cache-control` response header.
            calculateHttpHeaders: false,
        })
    ]
});
```

Next we will have to define the `@cacheControl` directive; and since this is something we will use across multiple graphs, we will add it to our `src/common/schema.js` file:

```graphql
enum CacheControlScope {
    PUBLIC
    PRIVATE
}

directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
```

The arguments for `@cacheControl` perform the following:
- `maxAge`: The maximum amount of time the field’s cached value is valid, in seconds. The default value is `0`, but you can set a different default.
- `scope`: If `PRIVATE`, the field’s value is specific to a single user. The default value is `PUBLIC`.
- `inheritMaxAge`: If `true`, this field inherits the `maxAge` of its parent field instead of using the default `maxAge`. Not not provide `maxAge` if you provide this argument.

We will keep things simple for now, and have a few fields that we would like cached for 60 seconds. Let’s navigate to `src/properties/schema.js` and change the following fields under `Property`:
```graphql
type Property {
    ...
    rating: Float @cacheControl(maxAge: 60)
    propertyOwner: PropertyOwner! @cacheControl(maxAge: 60)
}
```

These are fields that we think will not change often, and so these might be fields we would like to cache for some time. This will mean that it will only call the resolver function for `propertyOwner` or `rating` after 60 seconds for the same input, using a previously cached field value.

## Conclusion

During this tutorial we walked through setting up a multi-schema GraphQL server, using updated features from `Node v18, Apollo Server 4, and Graphql 16.6`. We looked into entity resolution when dealing with fields that reference other entities we have in dataSources. We looked into creating an update method for properties and starting our Error Handling processes, and introduced a use-case for Union types. We talked a little about schema maintenance, and how different directives can be used to notify deprecated fields, as well as introducing a little bit of Cache Control as well. I hope you enjoyed this tutorial, and next we will talk about introducing a live database and integrating it with our server!

At the end of this tutorial you should have a server looking similar or identical to [this](https://github.com/bitovi/node-graphql-tutorial-2023).