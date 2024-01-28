@page learn-graphql/adding-testing Testing Node.js and GraphQL with Jest
@parent learn-graphql 4

@description At the start of this tutorial you should have a repository similar to [this](https://github.com/bitovi/node-graphql-tutorial-2023/tree/prisma). So far we created our endpoints for our three entities, we had added Mongoose, and ported our endpoints to use Prisma instead. At each point we had to manually test the endpoints in Apollo Sandbox, and while that is a useful tool, in a real project we would be working with a testing framework in order to make sure that our endpoints still work. Today we’ll be adding testcases to our project and leveraging executeOperation to emulate requests to our Apollo Server, giving us the capability to test code ranging from our resolvers, to our dataSources. The concept here would be an **integration** test since it will be testing our GraphQL resolvers and dataSources. Without further ado, let’s start!

@body

## Setting up the testing Framework

We will be using the jest library to do all of our testing:
```shell
npm i jest
```
Next we will be adding a file following the naming convention of `ENTITY_NAME.test.js` to each respective folder for each entity we have. First things first we will create our `renter.test.js` file within the renter folder.

## Cleaning data in the database:

It’s important to note that if you’ve been following along in these tutorials your database now contains documents that were created by Mongoose, and then by Prisma. We will now remove all that previous data in the database so that we can ensure our database only contains documents created using Prisma endpoints. We are doing this since some of the previously created data with Mongoose will not have the information required in order to resolve our relationships between entities and this will end up breaking some of our queries when testing. Before we mentioned one of the features of Prisma was **Prisma Migrate** which is something that in our tutorials we haven’t needed to use, however the first step that it does is to drop the database we have connected to. It is important to note that there are a number of ways to drop the database for MongoDB, but deleting all the entries can become messy with some of the relationships we have defined so far.

In our terminal we will run the following:
```shell
npx prisma migrate
```
You will see an error, but when checking the collection in Mongo Atlas you will see that all the data will be deleted. Now that our database is empty, we can continue writing testcases for our entities.

Note: To re-add data just run the `seed.js` file we created in earlier tutorials.

## Testing Renter entities:

To start we will be initializing our own `ApolloServer` and creating a context containing our Prisma Client in order to perform our queries. We do this because our methods that we use to call our Apollo Server uses a method called `executeOperation`, this method can take three main variables. The first is the query itself, which we can take from our testing within Apollo Sandbox. Next is `variables` for queries that require some sort of user input, but make sure that the name correlates to the one defined in your schema! Finally is the `contextValue` which in our case includes our Prisma Client; you may also end up passing your user authentication or other pieces of information here.

You’ll note that there is a variable called `RenterFields` which are passed into the query and that the query itself has `...RenterFields`. This is an example of fragments, rather than continuously re-write each field we want to resolve from our queries, we created a `./test/helpers/fragments.js` file that contains the fragments we will re-use across different testcases and queries. A side-benefit is that we no longer have to update every query if this changes later on, we simply need to update our fragment and what are testcases expect respectively. You will need to include the `${NAME_OF_FRAGMENT}` before the query/mutation definition so that you can use it.

```js
require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const omit = require('lodash.omit');
const prisma = require('../prisma');
const { typeDefs, resolvers } = require('../');
const { RenterFields } = require('../../test/helpers/fragments');

const testServer = new ApolloServer({
    typeDefs,
    resolvers
});

const contextValue = { prisma };

async function createRenter(createRenterInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            mutation CreateRenter($createRenterInput: CreateRenterInput) {
                createRenter(createRenterInput: $createRenterInput) {
                    ...RenterFields
                    roommates {
                        ...RenterFields
                    }
                }
            }
        `,
        variables: { createRenterInput }
    },
    { contextValue });
}

async function makeRoommates(renterIds) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            mutation Mutation($renterIds: [ID]) {
                makeRoommates(renterIds: $renterIds) {
                    ...RenterFields
                    roommates {
                        ...RenterFields
                    }
                }
            }
        `,
        variables: { renterIds }
    },
    { contextValue });
}

async function renters() {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            query Renters {
                renters {
                    ...RenterFields
                    roommates {
                        ...RenterFields
                    }
                }
            }
        `},
    { contextValue });
}

async function getRenterById(renterId) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            query GetRenterById($renterId: ID!) {
                getRenterById(renterId: $renterId) {
                    ...RenterFields
                    roommates {
                        ...RenterFields
                    }
                }
            }
        `,
        variables: {
            renterId
        }
    },
    { contextValue });
}

describe('Renter entity endpoints', () => {
    const seedValue = Math.floor(Math.random() * 10000);

    const createRenterInput = {
        city: 'Test City' + seedValue,
        name: 'Test renter name' + seedValue,
        roommates: []
    };

    describe('Renter - Create', () => {
        it('creates a renter and verifies it was created', async() => {
            const response = await createRenter(createRenterInput);
            expect(response.body.singleResult.errors).toBeUndefined();
            expect(response.body.singleResult.data.createRenter).toEqual({
                ...createRenterInput,
                id: expect.any(String),
                rating: 0
            });
        });
    });

    describe('Renter - Update', () => {
        it('creates two users and checks both users all roommates with one another after calling makeRoommates', async() => {
            const [renter1, renter2] = await Promise.all([
                createRenter(createRenterInput),
                createRenter(createRenterInput)
            ]);

            const createdRenterId1 = renter1.body.singleResult.data.createRenter.id;
            const createdRenterId2 = renter2.body.singleResult.data.createRenter.id;
            const { body } = await makeRoommates([createdRenterId1, createdRenterId2]);
            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.makeRoommates).toEqual(
                expect.arrayContaining([
                    { 
                        ...renter1.body.singleResult.data.createRenter,
                        roommates: [{ ...omit(renter2.body.singleResult.data.createRenter, ['roommates']) }]
                    },
                    {
                        ...renter2.body.singleResult.data.createRenter,
                        roommates: [{ ...omit(renter1.body.singleResult.data.createRenter, ['roommates']) }]
                    }
                ])
            )
        });
    });

    describe('Renter - Read', () => {
        it('queries to retrieve all renters', async() => {
            const { body } = await renters();
            expect(body.singleResult.errors).toBeUndefined();
            expect(Array.isArray(body.singleResult.data.renters)).toBe(true);
        });

        it('queries for the renter created previously using getRenterById', async() => {
            const createRenterResponse = await createRenter(createRenterInput);

            const createdRenterId = createRenterResponse.body.singleResult.data.createRenter.id;
            const { body } = await getRenterById(createdRenterId);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.getRenterById).toEqual({
                ...createRenterInput,
                id: createdRenterId,
                rating: 0
            });
        });
    });
});
```

## Testing Paradigms

In this code above, we wanted to make it somewhat explicit what we are testing, in these case our core CRUD endpoints, and wanted to have different describes in order to keep the separations of what we were testing clear. Because we would be adding lots of test data into the database, we added a `seedValue` so that the names would have a lower likely-hood of clashing, making testing easier.

When expecting values that you aren’t sure exactly what the result will be, you can use `expect.any(String)`. In our testcases we use it for an id since that will get generated by the database, but we just want to ensure that it does get returned. Another useful method with Jest is `expect.ArrayContaining([])`, this is something we use when attempting to test an array of objects but we may not be sure what order they will be returned. This will test that an object is in that list that matches what you are looking for.

We separate the functions we call within the testcases into their own separate functions for a number of reasons: one is because we may re-use them later within different testcases, the other is so that our testcases aren’t filled with logic just to query the Apollo Server. This is so that we have our testcases only focusing on what it needs to test, nothing more.

## Renter Fragment

We will create the file `./test/helpers/fragments.js`:
```js
module.exports = {
    RenterFields: `
        fragment RenterFields on Renter {
            city
            id
            name
            rating
        }
    `
}
```

To define a fragment, it has to be on an existing entity, and we have to use the `fragment` keyword. In this case we define a fragment `RenterFields` on the entity `Renter` and define what fields it resolves. It does not have to include all of the fields on the entity, so you can use a fragment and still include other fields as well. As we test more entities we will add more to this file for our use.

## Renter Deletion Problem

While writing these testcases, an issue occurred within the codebase; there was no clear way to delete a Renter entity. Part of this problem is due to the `roommates` relationship each Renter has, and if you want to delete a Renter, you must first disconnect the relationship between it and other `roommates`. So we needed to create a new endpoint for Renters:

First step is to add the definition to the src/renters/schema.js:
```graphql
type Mutation {
    ...
    deleteRenter(renterId: ID): Boolean
}
```
Next is to add the resolver in `src/renters/resolvers.js`:
```js
Mutation: {
    ...
    deleteRenter: async (_parent, args, { prisma }) => {
        return deleteRenter(args.renterId, prisma);
    }
}
```
And finally to add the code in `src/renters/dataSource.js`:
```js
async function deleteRenter(renterId, Prisma) {
    // disconnect relationship between roommate and renter
    await Prisma.renters.update({
        where: {
            id: renterId
        },
        data: {
            roommates: {
                set: []
            }
        }
    });
    // now delete renter
    const deletedRenter = await Prisma.renters.delete({
        where: {
            id: renterId
        }
    });

    return Boolean(deletedRenter.id);
}
```

Now we need to actually test this new endpoint, so we will add a testcase to our `renter.test.js` file:
```js
async function deleteRenter(renterId) {
    return testServer.executeOperation({
        query: `
            mutation DeleteRenter($renterId: ID) {
                deleteRenter(renterId: $renterId)
            }
        `,
        variables: {
            renterId
        }
    },
    { contextValue });
}
...
describe('Renter - Delete', () => {
    it('creates a renter, and then deletes it', async() => {
        const response = await createRenter(createRenterInput);
        expect(response.body.singleResult.errors).toBeUndefined();
        const deletedRenter = await deleteRenter(
            response.body.singleResult.data.createRenter.id
        );
        expect(deletedRenter.body.singleResult.data.deleteRenter).toEqual(true);
    });
});
```

## Testing PropertyOwner entities

These set of testcases are fairly simple, but follow the same idea in `./propertyOwners/propertyOwner.test.js`:

```js
require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const prisma = require('../prisma');
const { typeDefs, resolvers } = require('../');
const { RenterFields, PropertyFields, PropertyOwnerFields } = require('../../test/helpers/fragments');

const testServer = new ApolloServer({
    typeDefs,
    resolvers
});

const contextValue = { prisma };

async function createPropertyOwner(createPropertyOwnerInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyOwnerFields}
            ${PropertyFields}
            mutation CreatePropertyOwner($createPropertyOwnerInput: CreatePropertyOwnerInput) {
                createPropertyOwner(createPropertyOwnerInput: $createPropertyOwnerInput) {
                    ...PropertyOwnerFields
                }
              }
        `,
        variables: { createPropertyOwnerInput }
    },
    { contextValue });
}

async function propertyOwners() {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyOwnerFields}
            ${PropertyFields}
            query PropertyOwners {
                propertyOwners {
                    ...PropertyOwnerFields
                }
            }
        `
    },
    { contextValue });
}

async function getPropertyOwnerById(propertyOwnerId) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyOwnerFields}
            ${PropertyFields}
            query GetPropertyOwnerById($propertyOwnerId: ID!) {
                getPropertyOwnerById(propertyOwnerId: $propertyOwnerId) {
                    ...PropertyOwnerFields
                }
            }
        `,
        variables: {
            propertyOwnerId
        }
    },
    { contextValue });
}

describe('Property Owner entity endpoints', () => {
    const seedValue = Math.floor(Math.random() * 10000);

    const createPropertyOwnerInput = {
        address: 'Test PO Address - ' + seedValue,
        name: 'Test Landlord - ' + seedValue,
        photo: 'some photo' + seedValue,
        properties: []
    };

    describe('PropertyOwner - Read', () => {
        it('Retrieves all propertyOwners', async() => {
            const { body } = await propertyOwners();
            expect(body.singleResult.errors).toBeUndefined();
            expect(Array.isArray(body.singleResult.data.propertyOwners)).toBe(true);
        });

        it('Queries for the propertyOwner created previously using getPropertyOwnerById', async() => {
            const result = await createPropertyOwner(createPropertyOwnerInput);

            expect(result.body.singleResult.errors).toBeUndefined();
            const createdPropertyOwner = result.body.singleResult.data.createPropertyOwner;

            const { body } = await getPropertyOwnerById(createdPropertyOwner.id);
            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.getPropertyOwnerById).toEqual(createdPropertyOwner);
        });
    });

    describe('PropertyOwner - Create', () => {
        it('Creates a propertyOwner', async() => {
            const { body } = await createPropertyOwner(createPropertyOwnerInput);
            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.createPropertyOwner).toEqual({
                ...createPropertyOwnerInput,
                id: expect.any(String),
                rating: 0
            });
        });
    });
});
```

## Property and PropertyOwner Fragment

Now let’s add our fragments to our `./test/helpers/fragment.js` file:
```js
module.exports = {
    PropertyOwnerFields: `
        fragment PropertyOwnerFields on PropertyOwner {
            id
            name
            address
            rating
            photo
            properties {
                ...PropertyFields
            }
        }
    `,
    PropertyFields: `
        fragment PropertyFields on Property {
            available
            id
            name
            city
            description
            photos
            rating
            renters {
                ...RenterFields
            }
        }
    `
}
```

There is a particular reason in this case why we left out `propertyOwner` from `PropertyFields`. This is because eventually this would lead to a very nested resolution path and would complicate our testcases. Much of the information would be redundant if we attempt to make this resolve. In practicality, if you were to query a list of `properties` from a `propertyOwner`, you would not need to know the `propertyOwner` since that information would already be available at the top level. Meanwhile if you were to query a `property` and want to get the information of the `propertyOwner` you can simply add that information to your query after the fragment. You will see an example of this when we test the Properties entity.

## Testing PropertyOwner entities

This entity becomes more interesting in order to test the update methods, and we even found an error in our schema when testing the endpoints in `./properties/properties.test.js`:

```js
require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const omit = require('lodash.omit');
const prisma = require('../prisma');
const { typeDefs, resolvers } = require('../');
const { RenterFields, PropertyFields } = require('../../test/helpers/fragments');
const { createPropertyOwner } = require('../propertyOwners/dataSource')
const { createRenter } = require('../renters/dataSource')


const testServer = new ApolloServer({
    typeDefs,
    resolvers
});

const contextValue = { prisma };

async function properties() {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            query Properties {
                properties {
                    ...PropertyFields
                    propertyOwner {
                        id
                        name
                        address
                        rating
                        photo
                    }
                }
            }
        `
    },
    { contextValue });
}

async function createProperty(createPropertyInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            mutation Mutation($createPropertyInput: CreatePropertyInput) {
                createProperty(createPropertyInput: $createPropertyInput) {
                    ...PropertyFields
                    propertyOwner {
                        id
                        name
                        address
                        rating
                        photo
                    }
                }
            }
        `,
        variables: { createPropertyInput }
    },
    { contextValue });
}

async function updateProperty(updatePropertyInput) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            mutation UpdateProperty($updatePropertyInput: UpdatePropertyInput) {
                updateProperty(updatePropertyInput: $updatePropertyInput) {
                    ...on PropertyNotFoundError {
                        message
                        propertyId
                    }
                    ...on Property {
                        ...PropertyFields
                        propertyOwner {
                            id
                            name
                            address
                            rating
                            photo
                        }
                    }
                }
            }
        `,
        variables: { updatePropertyInput }
    },
    { contextValue });
}

async function getPropertyById(propertyId) {
    return testServer.executeOperation({
        query: `
            ${RenterFields}
            ${PropertyFields}
            query GetPropertyById($propertyId: ID!) {
                getPropertyById(propertyId: $propertyId) {
                    ...PropertyFields
                    propertyOwner {
                        id
                        name
                        address
                        rating
                        photo
                    }
                }
            }
        `,
        variables: {
            propertyId
        }
    },
    { contextValue });
}

describe('Property entity endpoints', () => {
    const seedValue = Math.floor(Math.random() * 10000);

    const createPropertyInput = {
        available: true,
        city: 'Test Property City - ' + seedValue,
        renters: [],
        name: 'Test Property Name - ' + seedValue,
        description: 'Test Property Decription - ' + seedValue
    };

    const createPropertyOwnerInput = {
        address: 'Test PO Address - ' + seedValue,
        name: 'Test Landlord - ' + seedValue,
        photo: 'some photo' + seedValue,
        properties: []
    };

    const createRenterInput = {
        city: 'Test City' + seedValue,
        name: 'Test renter name' + seedValue,
        roommates: []
    };

    describe('Property - Read', () => {
        let createdProperty;
        beforeAll(async() => {
            const propertyOwner = await createPropertyOwner(createPropertyOwnerInput, prisma)
            
            const renter = await createRenter(createRenterInput, prisma)

            const { body } = await createProperty({
                ...createPropertyInput,
                propertyOwnerId: propertyOwner.id,
                renters: [renter.id]
            });

            createdProperty = body.singleResult.data.createProperty;
        });

        it('Retrieves all properties', async() => {
            const { body } = await properties();
            expect(body.singleResult.errors).toBeUndefined();
            expect(Array.isArray(body.singleResult.data.properties)).toBe(true);
        });

        it('Retrieves the created property with getPropertyById', async() => {
            const { body } = await getPropertyById(createdProperty.id);
            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.getPropertyById).toEqual(createdProperty)
        });
    });

    describe('Property - Create', () => {
        it('Create a propertyOwner and a renter to create a property and tests that relationships are connected', async() => {
            const propertyOwner = await createPropertyOwner(createPropertyOwnerInput, prisma)
            
            const renter = await createRenter(createRenterInput, prisma)

            const { body } = await createProperty({
                ...createPropertyInput,
                propertyOwnerId: propertyOwner.id,
                renters: [renter.id]
            });

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.createProperty).toEqual({
                ...createPropertyInput,
                rating: 0,
                photos: [],
                id: expect.any(String),
                renters: [omit(renter, ['rentedPropertyId', 'roommateId', 'roommates', 'v'])],
                propertyOwner: omit(propertyOwner, ['properties', 'v'])
            });
        });            
    });

    describe('Property - Update', () => {
        let createdProperty;
        beforeAll(async() => {
            const propertyOwner = await createPropertyOwner(createPropertyOwnerInput, prisma)
            
            const renter = await createRenter(createRenterInput, prisma)

            const { body } = await createProperty({
                ...createPropertyInput,
                propertyOwnerId: propertyOwner.id,
                renters: [renter.id]
            });

            createdProperty = body.singleResult.data.createProperty;
        });

        it('Updates a property with an incorrect ID and returns PropertyNotFoundError', async() => {
            const NON_EXISTANT_UUID = '63c19d15b3db1c7857b59a7c';
            const { body } = await updateProperty({ id: NON_EXISTANT_UUID });

            expect(body.singleResult.data.updateProperty).toEqual({
                message: 'Unable to find property with associated id.',
                propertyId: NON_EXISTANT_UUID
            })
        });

        it('Updates previously created property and updates non-relational fields', async() => {
            const updatesToProperty = {
                id: createdProperty.id,
                available: false,
                city: 'New Test Property City - ' + seedValue,
                name: 'New Test Property Name - ' + seedValue,
                description: 'New Test Property Decription - ' + seedValue
            };
            const { body } = await updateProperty(updatesToProperty);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.updateProperty).toEqual({
                ...updatesToProperty,
                photos: [],
                propertyOwner: expect.any(Object),
                rating: 0,
                renters: expect.any(Array)
            })
        });

        it('Updates previously created property and updates renters with newly created Renter', async() => {
            const newCreatedRenterInput = {
                city: 'New - Test City' + seedValue,
                name: 'New - Test renter name' + seedValue,
                roommates: []
            };
            const renter = await createRenter(newCreatedRenterInput, prisma)
            const updatesToProperty = {
                id: createdProperty.id,
                renters: [renter.id]
            };

            const { body } = await updateProperty(updatesToProperty);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.updateProperty.renters).toEqual(
                [omit(renter, ['rentedPropertyId', 'roommateId', 'roommates', 'v'])]
            )
        });

        it('Updates previously created property and updates propertyOwner with newly created propertyOwner', async() => {
            const newCreatedPropertyOwnerInput = {
                address: 'New - Test PO Address - ' + seedValue,
                name: 'New - Test Landlord - ' + seedValue,
                photo: 'New - some photo' + seedValue,
                properties: []
            };
            const propertyOwner = await createPropertyOwner(newCreatedPropertyOwnerInput, prisma)
            const updatesToProperty = {
                id: createdProperty.id,
                propertyOwnerId: propertyOwner.id
            };
            const { body } = await updateProperty(updatesToProperty);

            expect(body.singleResult.errors).toBeUndefined();
            expect(body.singleResult.data.updateProperty.propertyOwner).toEqual(
                omit(propertyOwner, ['v', 'properties'])
            )
        });
    });
});
```

### Testing Paradigms

In this file, we use a `beforeAll` hook to setup some data that we want to reference later, in this case we want to create a Property before the test runs so we can simply call `getPropertyById` in our Read testcase.

In order to create a property, we need to have created a `propertyOwner` first, and to test the resolution of `renters` as well we would need to create a `renter` entity as well. Rather than test Apollo Server for those two actions (which we already covered in our other testcases), we chose to call the dataSource methods directly. This became a little tricky when expecting what the return will be since we still have extra fields that get returned, in this case we use `omit` to make the massaging of data much easier so we can test that the relationships did get created.

## Property Update Problem

When testing the update method, a number of situations needed to be covered: namely ensuring that our `PropertyNotFoundError` would be thrown, we could update our non-relational fields, and finally being able to ensure `renters` and `propertyOwner` could be updated with new relationships. During this process we found some errors in the schema for `property` and how we updated the relationships for both `renters` and the `propertyOwner`.

First thing to change was the `UpdatePropertyInput`, we simply want the ID rather than an entire object of a propertyOwner, so we should be making the input say that explicitly with `propertyOwnerId`:
```graphql
input UpdatePropertyInput {
    ...
    propertyOwnerId: ID
}
```

Then we needed to update the object for propertyOwner since it was malformed when passed into the Prisma `update` method `properties/dataSource.js`:
```js
const propertyOwner = updatedProperty.propertyOwnerId && {
    connect: { id: updatedProperty.propertyOwnerId }
};
```
Next as an update, we want to include a list of renters that are currently renting that property, with the previous code not only was the object not formed correctly, when it was fixed it would actually only add the new list of renters to the existing list. What we wanted to do with this update was that if you passed in a list of renters, that list became the current list of renters on the property. To do that we used the option called `set` instead of `connect` which we were using before:
```js
const renters = updatedProperty.renters && {
      set: updatedProperty?.renters.map((renterId) => ({ id: renterId }))
  };
```

The new `updateProperty` method should contain the following new lines of code:
```js
const renters = updatedProperty.renters && {
    set: updatedProperty?.renters.map((renterId) => ({ id: renterId }))
};
const propertyOwner = updatedProperty.propertyOwnerId && {
    connect: { id: updatedProperty.propertyOwnerId }
};

...
const savedProperty = await Prisma.properties.update({
    where: {
        id: propertyId
    },
    data: {
        ...nonConnectPropertyFields,
        renters,
        propertyOwner
    },
    include: {
        renters: true,
        propertyOwner: true
    }
});
...
```

This means that during the update for properties, you pass the id of the new propertyOwner you want in `propertyOwnerId`.

## Adding a test script:

The last step is to add a simple test script to `package.json` so that we can run our testcases from the command line:
```json
"scripts": {
  ...
  "test": "jest --coverage"
}
```

With this we can now type `npm run test` in our terminal in our project directory and have all our testcases run! With the `--coverage` flag we will see what lines of our code we haven’t tested, which is a good metric for a strong test suite.

## Conclusion

Testing is very useful in many projects, even pointing out flaws in our current tutorial. Now if we need to change our ORM, entities, or add new features, each existing endpoint has a testcase to ensure their stability. We leveraged the power of fragments to keep our query strings smaller and consistent between different queries. This also means that if we have to update our fragments, we only need to change it in one spot rather than across many methods. We learned about `executeOperation` and how to setup our testcases in a way to test our resolvers and dataSources. At the end of this tutorial you should have a repository similar to [this](https://github.com/bitovi/node-graphql-tutorial-2023/tree/fragments). Now that we included testcases it will become much easier to ensure we don’t make breaking changes going forward!