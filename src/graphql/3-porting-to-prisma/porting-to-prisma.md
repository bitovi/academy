@page learn-graphql/porting-to-prisma Converting Mongoose to Prisma
@parent learn-graphql 3

@description In this guide we will be working off of a starting point [project](https://github.com/bitovi/node-graphql-tutorial-2023/tree/mongodb) and will be removing the need for Mongoose and instead we will be using Prisma to perform our queries and mutations!

@body

## What is an ORM?

To begin we will be addressing what is an ORM: it stands for Object Relational Mapping. This is essentially a technique used in creating a bridge between object-oriented programs like Node JS and relational databases like SQL. Instead of having to build your own custom ORM tool from scratch, you can make use of an ORM (even Mongoose is an ORM).

## What is Prisma?

Prisma is a new type of ORM where you can define your model in the declarative Prisma schema which serves as the single source of truth for your database schema and the models in your programming language. Using the Prisma Client you get type-safe methods, and some nice autocompletion when interacting with a collection or table. Prisma also comes with **Prisma Migrate**, which is a declarative data modeling and migration tool which generates a migration file, updates the database schema, and generates the new Prisma client for use during development.

### Install the Prisma CLI

There are a few things that we’ll need to do in order to port our Mongoose queries over to Prisma. After our last tutorial we should have a collection defined that contains entities created in the database (by running our **seed.js**).

Let’s start by installing what packages we need:

```shell
npm i prisma -D
npx prisma init --datasource-provider mongodb
npm i @prisma/client
```

### Introspect the Database

We are going to run the following command in order to update our `schema.prisma` file with the collections already created in MongoDB. One thing to note is that your `schema.prisma` file should have this value present (this will be your connection string):

```js
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```
Make sure that your `.env` file contains a value called **DATABASE_URL**. This connection string has a slight difference in that it will contain the collection name of the database so it knows where to pull from, see an example below and note the **collectionName** portion:


`mongodb+srv://<databaseName>:<password>.mongodb.net/<collectionName>?retryWrites=true&w=majority`

### Next we will run the following commands

```shell
npx prisma db pull
npx prisma generate
```

This will now update your `schema.prisma` file to reflect what was defined in MongoDB based on the information we put into our database. Unfortunately MongoDB doesn’t support relations between different collections. So we have to re-create the references between documents using the `ObjectId` field type from one document to another.

### PropertyOwner → Properties relation mapping (1-many)

In our previous definitions, every property has a propertyOwner, and a propertyOwner can have many properties. So now we need to setup that relationship in our **schema.prisma** file:

```js
model PropertyOwners {
  id         String       @id @default(auto()) @map("_id") @db.ObjectId
  v          Int          @map("__v")
  address    String
  name       String
  photo      String
  properties Properties[]
  rating     Float

  @@map("propertyowners")
}
```

This part of the relationship is fairly simple: we change the type of `properties` to be of type `Properties[]`.

**Note:** We can use the **@@map** keyword in order to rename the model. We can also use the **@map** keyword to rename a field to another name. Prisma has the following naming conventions: PascalCase for model names and camelCase for field names.

Next we have to change the model **Properties** to have the other portion of the relationship:
```js
model Properties {
  id              String         @id @default(auto()) @map("_id") @db.ObjectId
  v               Int            @map("__v")
  available       Boolean
  city            String
  description     String
  name            String
  photos          String[]
  propertyOwner   PropertyOwners @relation(fields: [propertyOwnerId], references: [id])
  propertyOwnerId String         @db.ObjectId
  rating          Float
  renters         Renters[]

  @@map("properties")
}
```
In order to define the relationship, we have to define two fields: `propertyOwner` and `propertyOwnerId`. The first one seems easy enough `propertyOwnerId` is a `String` type and we need to use the `@db.ObjectId` keyword to represent that it is an id for MongoDB. Next we change the propertyOwner field to be of type `PropertyOwners` and we need to define a `@relation`. Here we are mentioning that the fields that this references is the `propertyOwnerId` field and that is representing an `id` of another model (in this case **PropertyOwner**). We setup the first part of the properties → renters (1 → many) relationship as well, in this case the renters field represents `Renters[]`.

## Renter Many → Many Self-Relationship

In the Renters model we need to define the other part of the relationship for properties, and the roommate relationship as well:
```js
model Renters {
  id               String      @id @default(auto()) @map("_id") @db.ObjectId
  v                Int         @map("__v")
  city             String
  name             String
  rating           Float
  roommates        Renters[]   @relation("RoommateRenters")
  roommateRenter   Renters?    @relation("RoommateRenters", fields: [roommateId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  roommateId       String?     @db.ObjectId
  rentedPropertyId String?     @map("rentedProperty") @db.ObjectId
  rentedProperty   Properties? @relation(fields: [rentedPropertyId], references: [id])

  @@map("renters")
}
```

To complete the Renter → Property relationship we do something similar for the Property → PropertyOwner relationship: we create `rentedPropertyId` with the `String` field being optional marked by the type ending with `?`. We then set it as a `@db.ObjectId` and use a `@relation` on the `rentedProperty` field referencing the optional id we created.

Next is something that is a bit more complicated, we need to create three fields for the relationship between Renters and their roommates: 
```js
roommates        Renters[]   @relation("RoommateRenters")
roommateRenter   Renters?    @relation("RoommateRenters", fields: [roommateId], references: [id], onDelete: NoAction, onUpdate: NoAction)
roommateId       String?     @db.ObjectId
```
The `roommates` field which is the `Renters[]` type contains the `@relation("RoommateRenters")` which gives a name to the relation `RoommateRenters`. Next we define that each `roommateRenter` in this relationship called `RoommateRenters` is an optional field where it references an id we are calling `roommateId`. Then finally we create the id `roommateId` of an optional type `String`, and we use the `@db.ObjectId` to show it is a MongoDB id. We finish the `@relation` by adding `onDelete: NoAction, onUpdate: NoAction`. This is because the self-relation can cause an infinite loop if we update that field.

## Putting Prisma Client into the project
With that, we defined all the relationships we need, the next step is to add our Prisma Client into our project. In our `src` folder we’ll create a `prisma.js` file and add the following lines:

```js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;
```

Then now if our `index.js` server file we can pass it through the GraphQL context so that are resolvers only use a single instance of our Prisma Client:

```js
const prisma = require('./src/prisma');
...

app.use(
    ...
    expressMiddleware(server, {
        context: async ({ req }) => ({
            token: req.headers.token,
            // passing our prisma connection for re-use
            prisma
        }),
    })
);
```

## Create the new seed file

Though the syntax might be a bit different, the concept will still be similar to what we had to do for Mongoose. Prisma uses a `connect` option that will set up the relation between two models, and in the return portion we use the `include` option that will work similar to the way `populate` did in Mongoose. First step is to change some of the initial seed data:

```js
const Prisma = require('./src/prisma');

const renters = [
    {
        name: 'renter 1',
        city: 'Toronto',
        rating: 4.0,
        v: 0
    },
    {
        name: 'renter 2',
        city: 'Toronto',
        rating: 3.5,
        v: 0
    }
];

const propertyOwners = [
    {
        name: 'owner 1',
        address: 'Toronto',
        rating: 4.0,
        photo: 'something',
        v: 0
    },
    {
        name: 'owner 2',
        address: 'Toronto',
        rating: 4.0,
        photo: 'something',
        v: 0
    }
];

const properties = [
    {
        name: 'Deluxe suite 1',
        city: 'Toronto',
        rating: 5.0,
        available: true,
        description: 'amazing place 1',
        photos: [],
        v: 0
    },
    {
        name: 'Deluxe suite 2',
        city: 'Toronto',
        rating: 5.0,
        available: true,
        description: 'amazing place 2',
        photos: [],
        v: 0
    }
];
```

We’ll be needing the `v` field because it is a value present in the MongoDB store and tracks versioning. Next is we will  begin to create the relationships between Renters that are roommates:
```js
// create two renters, one of which is roommates with the second nested renter
const firstRenter = await Prisma.renters.create({
    data: {
        ...renters[0],
        roommates: {
            create: renters[1]
        }
    }
});
// connect renter 2 to be a roommate of renter 1
const secondRenter = await Prisma.renters.update({
    where: {
        id: firstRenter.roommates[0].id
    },
    data: {
        roommates: {
            connect: [{ id: firstRenter.id }]
        }
    }
});
```

We will be using a nested `create` which allows us to create both roommates together, and putting the id of the newly created renter in the `roommates` field. Next we can update the second renter created and use the `connect` option, which can take a **list** of objects containing an **id** value of the model we are going to connect. There are other methods like `connectOrCreate` but in this case we know its data we are initializing rather than connecting to data we’re not sure if it exists. Next we create the PropertyOwners:

```js
// Create propertyOwners with connected properties
// then connect renters to properties
await Prisma.propertyOwners.create({
    data: {
        ...propertyOwners[0],
        properties: {
            create:  {
                ...properties[0],
                renters: {
                    connect: [{ id: firstRenter.id }]
                }
            }
        }
    }
});

await Prisma.propertyOwners.create({
    data: {
        ...propertyOwners[1],
        properties: {
            create: {
                ...properties[1],
                renters: {
                    connect: [{ id: secondRenter.id }]
                }
            }
        }
    }
});
```

What is nice here is that we can immediately create the properties we wanted to originally link to PropertyOwners in the `create` option and simultaneously `connect` on the `renters` field and link all the models together. In fact it looks like our **seed.js** file is now a bit more clean than before!

## Updating our Renter resolvers and dataSources

For each of our models, we will need to update the methods to include the `prisma` instance that is now passed through the context for our dataSources to use, first up we’ll update Renters:
```js
Query: {
    getRenterById: async (_parent, args, { prisma }) => {
        return getRenterById(args.renterId, prisma);
    },
    renters: async (_parent, _args, { prisma }) => {
        return getAllRenters(prisma);
    }
},
Mutation: {
    createRenter: async (_parent, args, { prisma }) => {
        return createRenter(args.createRenterInput, prisma);
    }
}
```

**Note:** The Prisma instance will be passed through the `info` variable and we’ll destructure what we need for now from it.

Next, we need to head to the `renters/dataSource.js`:
```js
async function getRenterById(renterId, Prisma) {
    return Prisma.renters.findUnique({
        where: {
            id: renterId
        },
        include: {
            roommates: true
        }
    });
}

async function createRenter(renter, Prisma) {
    return Prisma.renters.create({
        data: {
            city: renter.city,
            name: renter.name,
            rating: 0.0,
            roommates: {
                connect: renter.roommates.map((renterId) => ({ id: renterId }))
            },
            v: 0
        },
        include: {
            roommates: true
        }
    });
}

async function getAllRenters(Prisma) {
    return Prisma.renters.findMany({
        include: {
            roommates: true
        }
    });
}
```

Other than the method name changes, the most notable portion is that we have the `include` option for the `roommates` field, this ensures that when we return from this method we have a populated `roommates` object. You’ll see that we include `v: 0` in our data payload for creates, this is the same as the `seed.js` file where for mongoDB documents we need that versioning.

**Note:** As for the Prisma naming convention, you may not end up wanting to use `Prisma` but instead use `prismaClient` or lowercase `prisma` instead. This depends on your style and feel free to adjust accordingly.

## Updating our Property resolvers and dataSources
```js
Query: {
    getPropertyById: async (_parent, args, { prisma }) => {
        return getPropertyById(args.propertyId, prisma);
    },
    properties: async (_parent, _args, { prisma }) => getAllProperties(prisma)
},
Mutation: {
    createProperty: async (_parent, args, { prisma }) => {
        return createProperty(args.createPropertyInput, prisma);
    },
    updateProperty: async (_parent, args, { prisma }) => {
        return updateProperty(args.updatePropertyInput.id, args.updatePropertyInput, prisma);
    }
}
```
However things for the property will become more complicated for the update method we created before:
```js
async function getPropertyById(propertyId, Prisma) {
    return Prisma.properties.findUnique({
        where: {
            id: propertyId
        },
        include: {
            renters: true,
            propertyOwner: true
        }
    });
}

async function createProperty(property, Prisma) {
    return Prisma.properties.create({
            data: {
                available: property.available,
                city: property.city,
                description: property.description,
                name: property.name,
                photos: property.photos || [],
                propertyOwnerId: property.propertyOwnerId,
                rating: 0.0,
                renters: {
                    connect: property.renters.map((renterId) => ({ id: renterId }))
                },
                v: 0
            },
            include: {
                propertyOwner: true,
                renters: true
            }
        });
}

async function updateProperty(propertyId, updatedProperty, Prisma) {
    const nonConnectPropertyFields = omit(updatedProperty, ['id', 'renters', 'propertyOwner']);

    const renters = updatedProperty.renters && {
        connect: updatedProperty?.renters.map((renterId) => ({ id: renterId }))
    };
    const propertyOwner = updatedProperty.propertyOwner && {
        connect: { id: updatedProperty.propertyOwner }
    };

    try {
        const savedProperty = await Prisma.properties.update({
            where: {
                id: propertyId
            },
            data: {
                ...nonConnectPropertyFields,
                ...(renters),
                ...(propertyOwner)
            },
            include: {
                renters: true,
                propertyOwner: true
            }
        });
        return {
            __typename: 'Property',
            ...savedProperty
        };

    } catch (err) {
        if (err?.meta?.cause === 'Record to update not found.') {
            return PropertyNotFoundError(propertyId);
        }
        return err;
    }
}

async function getAllProperties(Prisma) {
    return Prisma.properties.findMany({
        include: {
            renters: true,
            propertyOwner: true
        }
    });
}
```

For creating connections, we will need a way to remove the fields we want to re-purpose or re-make using the connect syntax, in this case we will want to remove the fields we don’t want to include from our input object (this is because we still want to destructure the rest of the input fields to make the data object cleaner). In this case we will omit `id, renters, propertyOwners`. To do that we will install `lodash.omit`, and then we will form the new objects containing the ids of the renters and the propertyOwners. For the return we still have to ensure we include `__typename: 'Property'` in the object.

## Error handling in Prisma

In this case you will see that we handle our errors by specifically looking for error messages within the err object, this is because sometimes Prisma may not return specific errors that we can consume into our Error types we create. In this case we have to check the contents of the error object, and map that to out **PropertyNotFoundError**. Adding more edge cases and types of errors may include adding more logic to this catch block in order to interpret errors, which may not look ideal. However if we want to be returning a specific type of error every time, for each of our GraphQL Union Error types then this a good enough approach for now.

## Updating our PropertyOwner resolvers and dataSources

This last entity is fairly simple in both porting over the resolver and the dataSource:
```js
Query: {
    getPropertyOwnerById: (_parent, args, { prisma }) => {
        return getPropertyOwnerById(args.propertyOwnerId, prisma);
    },
    propertyOwners: (_parent, _args, { prisma }) => getAllPropertyOwners(prisma)
},
Mutation: {
    createPropertyOwner: (_parent, args, { prisma }) => {
        return createPropertyOwner(args.createPropertyOwnerInput, prisma);
    }
}
```

```js
async function getPropertyOwnerById(propertyOwnerId, Prisma) {
    return Prisma.propertyOwners.findUnique({
        where: {
            id: propertyOwnerId
        },
        include: {
            properties: true
        }
    });
}

async function createPropertyOwner(propertyOwner, Prisma) {
    return Prisma.propertyOwners.create({
        data: {
            name: propertyOwner.name,
            address: propertyOwner.address,
            properties: {
                connect: propertyOwner.properties.map((propertyId) => ({ id: propertyId }))
            },
            photo: propertyOwner.photo,
            rating: 0.0,
            v: 0
        },
        include: {
            properties: true
        }
    });
}

async function getAllPropertyOwners(Prisma) {
    return Prisma.propertyOwners.findMany({
        include: {
            properties: true
        }
    });
}
```

## Transactions

Let’s say you want to perform a query or mutation where you want to make sure that each independent query runs, but you want to ensure that you can roll it back if there is an error in between. This is where transactions come into play, and we will be creating a mutation to showcase an example, right now if you want to add a roommate to one Renter, it will not update the other Renter object saying they are both roommates. We will create a **makeRoommates** mutation in the Renter schema:
```graphql
type Mutation {
    createRenter(createRenterInput: CreateRenterInput): Renter
    makeRoommates(renterIds: [ID]): [Renter]
}
```
Then we will add the method to the renters/resolver.js:
```js
makeRoommates: async (_parent, args, { prisma }) => {
    return makeRoommates(args.renterIds, prisma);
}
```
Finally we will add the code for the makeRoommates method:
```js
// Takes a list of renterIds and ensures that each renter
// contains a roommates field that has all the ids provided
async function makeRoommates(renterIds, Prisma) {
    const connectionRenterIds = renterIds.map((renterId) => ({ id: renterId }));
    const updates = renterIds.map((renterId) => Prisma.renters.update({
        where: {
            id: renterId
        },
        data: {
            roommates: {
                connect: connectionRenterIds.filter(({ id }) => id !== renterId)
            }
        },
        include: {
            roommates: true
        }
    }));
    return Prisma.$transaction(updates);
}
```

We will take the given ids, and then loop through each renterId provided in the input of the function to create an update where each Renter is a roommate of all the other Renters. Some things to point out on the syntax here for **Prisma$.transaction**: namely that I would suggest to follow the format that your transaction always includes a list of updates/mutations/queries like so:

```js
Prisma.$transaction([update1, update2, update3])
```

While Prisma does have **interactive transactions** meaning you can call a method and use its result to perform another query/mutation/update, however you can run into many problems during debugging this. Namely that the transaction may close before all the operations complete, and can require you to reconfigure your timeout for transactions (which I would not recommend in this early stage of the project). Prisma often in its documentation mentions that before using a **transaction** you can think to see if **Nested Writes** may solve your problem (see `seed.js` for an example). Likewise the **Batch/Bulk** operations like **deleteMany, updateMany, and createMany** run as transactions, so you can use those methods instead.

**Apollo pause:** To check if you have ported over to Prisma successfully, test by running the `seed.js` and re-run the endpoints you created for each entity, that will ensure that your project is in the correct state.

## Clean up and Conclusion

Now that we have successfully migrated over to Prisma, we can remove all instances of the `models` folder, and any reference to Mongoose so that we can uninstall it. During this tutorial we introduced some of the features of Prisma and then ported our Models to instead use the **schema.prisma** file. We had re-created our relationships between models, and then updated our endpoints to use the Prisma CRUD methods. We then showed how to perform some rudimentary error handling, and finally showcased an example of a mutation leveraging Prisma’s Transaction API.

At the end of this tutorial you should have a repository similar to [this](https://github.com/bitovi/node-graphql-tutorial-2023/tree/prisma)

I hope this has given you a glimpse into the power of Prisma, and the next tutorial in the series will cover adding Jest testcases and Fragments to the project.