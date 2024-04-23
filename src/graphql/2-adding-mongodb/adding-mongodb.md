@page learn-graphql/adding-mongodb Connecting Apollo Server with MongoDB
@parent learn-graphql 2

@description In this guide we will be working off of a starting point [project](https://github.com/bitovi/node-graphql-tutorial-2023) and will be removing the need for static data, while adding a connection to a live database!

We’ll also go over some basic methods to perform CRUD operations, and how we will pull related entities from our database (what is known as joins in SQL) using the `populate` function in Mongoose. We’ll also create a small seed file in order to fill our database with some baseline information.

@body

## Setting up MongoDB in the cloud

Rather than host a local instance of MongoDB, we can instead use **MongoDB Atlas** and leverage their free-tier option in order to set up a MongoDB instance. I would recommend to follow the first 5 minutes of the video to get your account and your [cluster setup](https://www.youtube.com/watch?v=xrc7dIO_tXk&ab_channel=MongoDB). After this video I would suggest to keep your connection uri so that we can begin to use it in our project.

### Dependencies

First things first, we’ll need to install some packages that we’ll be going to use:

```shell
npm i mongodb mongoose dotenv
```

We are deciding to use `dotenv` so that we can put our connection uri inside a file .env at the highest level of the directory. And this file won’t be committed to any repository so that we don’t share our precious connection uri! We’ll add the following line to the `.env` file:

`MONGODB_URL="mongodb+srv://<your_connection_uri_here>"`

## Mongoose vs MongoDB Native Driver:

In this tutorial we’ll be going with Mongoose as our package of choice, but let’s quickly go over our options on why we might use one or the other. For us, Mongoose provides a nice way to create a Model of any entity we want to refer to, and when we want to create a new document using that Model, we get inherent model validation out of the box. Rather than having to include document validation ourselves within our resolvers or dataSource files, Mongoose will throw an error if an incorrect field is placed during a `save` operation. You can also create and manage relationships data relatively quickly by making the schema strict (in terms of validation), and using the `populate` method. Some drawbacks are that Mongoose can hide some complexity of what it is doing away from developers making it really difficult to understand complex concepts.

The MongoDB native driver is definitely more performant than Mongoose and a lot of methods between the two are fairly similar in syntax. However you might have to create some boilerplate validation code since MongoDB will allow you store a document that doesn’t have to follow the same schema as other objects within the same collection. However depending on your use-case that may be better, for example where some sub-fields are not meant to be a consistent **type** between different documents. For this tutorial though, it keeps the GraphQL schema definition and the Mongoose definition fairly rigid to keep our entities consistent.

## Adding the Mongoose connection to our server

Add this line to the top of the `/index.js` file:

```js
require('dotenv').config();
```

And the following lines to setup the mongoose connection added to the database:

```js
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);
```

**Note:** We are adding this `strictQuery` to `false` because Mongoose has a deprecation warning around this being set to false by default in Mongoose 7.

### Creating the Mongoose Models
In the `/src` folder we’ll create a `/models` folder and create three files: `property.js, propertyOwner.js, and renter.js`. We are keeping the model definitions separate from other parts of the code so we can keep our mongoose model definitions clean and concise.

In our `/src/models/renter.js` file we’ll add the following lines of code:
```js
const { Schema, model } = require('mongoose');

const renterSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60
    },
    city: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    roommates: [{
        type: Schema.Types.ObjectId,
        ref: "Renter"
    }],
    deprecatedField: Boolean,
    nonDeprecatedField: Boolean
});

const Renter = model("Renter", renterSchema);

module.exports = {
    Renter
};
```

What is notable here is that with each field we are able to create specific types, add some level of verification and set whether the field is required or not. Another interesting portion is the **roommates** field having a `Schema.Types.ObjectId` type and a `ref: "Renter"`. This is Mongoose’s way to indicate that a field represents another object and will be referenced by the ID string we pass to that field. This is the first step in being able to take an ID, and eventually resolve a `Renter` object during the resolution process. Lastly we export our `Renter` so that we can use it in our resolvers going forward, this object will give us many helper functions around CRUD operations so that we can integrate MongoDB easily.

In our `/src/models/propertyOwner.js` file we’ll add the following lines of code:

```js
const { Schema, model } = require('mongoose');

const propertyOwnerSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    properties: [{
        type: Schema.Types.ObjectId,
        ref: "Property"
    }],
    photo: String
});

const PropertyOwner = model("PropertyOwner", propertyOwnerSchema);

module.exports = {
    PropertyOwner
};
```

Nothing here is notable aside from being able to add a list of `Schema.Types.ObjectId`, and remember that we are creating our Mongoose models to match the GraphQL schemas we created earlier.

In our `/src/models/property.js` file we’ll add the following lines of code:

```js
const { Schema, model } = require('mongoose');

const propertySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 60
    },
    city: {
        type: String,
        required: true
    },
    available: Boolean,
    description: {
        type: String,
        maxLength: 250
    },
    photos: [String],
    rating: {
        type: Number,
        required: true
    },
    renters: [{
        type: Schema.Types.ObjectId,
        ref: "Renter"
    }],
    propertyOwner: {
        type: Schema.Types.ObjectId,
        ref: "PropertyOwner"
    }
});

const Property = model("Property", propertySchema);

module.exports = {
    Property
};
```
In this model, the only notable fields are ensuring the relationship between `renters` and `propertyOwner` fields are created correctly and are referencing the same name that we passed into the `model` method for both renters and propertyOwners.

## Creating a seed script

At this point we have our models setup, but in order to start switching our resolvers to use Mongoose, we will need to create data within our database. That is where creating a seed file will come in handy, and we will learn some useful methods that we get from Mongoose. Create a `seed.js` file at the top-level of the project, we are going to use the static information we had before, and move it to the `seed.js` file with some adjustments:

```js
require('dotenv').config();
const mongoose = require('mongoose');
const { Property, PropertyOwner, Renter } = require('./src/models');

const renters = [
    {
        name: 'renter 1',
        city: 'Toronto',
        rating: 4,
        roommates: []
    },
    {
        name: 'renter 2',
        city: 'Toronto',
        rating: 3.5,
        roommates: []
    }
];

const propertyOwners = [
    {
        name: 'owner 1',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    },
    {
        name: 'owner 2',
        address: 'Toronto',
        rating: 4.0,
        properties: [],
        photo: 'something'
    }
];

const properties = [
    {
        name: 'Deluxe suite 1',
        city: 'Toronto',
        rating: 5.0,
        renters: [],
        available: true,
        description: 'amazing place 1',
        photos: [],
        propertyOwner: null
    },
    {
        name: 'Deluxe suite 2',
        city: 'Toronto',
        rating: 5.0,
        renters: [],
        available: true,
        description: 'amazing place 2',
        photos: [],
        propertyOwner: null
    }
];
```
**Note:** We are removing the need for `id` fields in our objects. We are also setting some initial reference values as null before we give them values later on.

Next we are going to run an `async runSeed()` function which will connect to our database, create the initial entities and then attach the relationships before creating the fields:

```js
async function runSeed() {

    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URL);
    try {
        const newRenter = new Renter(renters[0]);
        const newRenterTwo = new Renter(renters[1]);

        // establish relationship
        newRenter.set('roommates', [newRenterTwo._id]);
        newRenterTwo.set('roommates', [newRenter._id]);
        
        await newRenter.save();
        await newRenterTwo.save();

        const newPropertyOwner = new PropertyOwner(propertyOwners[0]);
        const newPropertyOwnerTwo = new PropertyOwner(propertyOwners[1]);

        const newProperty = new Property(properties[0]);
        const newPropertyTwo = new Property(properties[1]);

        newProperty.set('renters', [newRenter._id]);
        newPropertyTwo.set('renters', [newRenterTwo._id]);
        newProperty.set('propertyOwner', [newPropertyOwner._id]);
        newPropertyTwo.set('propertyOwner', [newPropertyOwnerTwo._id]);

        newPropertyOwner.set('properties', [newProperty._id]);
        newPropertyOwnerTwo.set('properties', [newPropertyTwo._id]);

        await newPropertyOwner.save();
        await newPropertyOwnerTwo.save();

        await newProperty.save();
        await newPropertyTwo.save();

        console.log('done');
    } catch (err) {
        console.error('runSeed error', err);
    } finally {
        mongoose.connection.close();
    }
}

runSeed();
```

We can use the `new Entity()` method which will return a MongoDB document for us to save later on. We still want to set up our relationships, our models contain a useful method called `set` that we can set any field we want in the MongoDB document. Once our objects are now in the shape we want them to be, we then save them to the database.

We create our propertyOwners before our properties, so that we can set the `propertyOwner` field which is required by our model validation. Once we save our propertyOwners and our properties we have our console log print out `done` so we get a visual confirmation. We use the `finally` block during our `try/catch` in order to close our connection to Mongoose after our seeding is done.

Next we go to our `package.json` and we add a `seed` field to our scripts parameter:
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node --watch ./index.js",
    "seed": "node ./seed.js"
}
```

Your `package.json` should look like above for the `scripts` field.

## Adding Mongoose to our dataSources

Now that we have created the baseline models we want that match our entities, all we need to do to add values into the database is to run `npm run seed` from a console within the project directory. If the seed successfully ran, you will know that our models are correct by viewing them within the MongoDB Atlas webpage. The next step is to go into our dataSources and begin porting over our operations, go into `src/renters/dataSource.js`:
```js
const { Renter } = require('../models');

async function getRenterById(renterId) {
    return Renter.findById(renterId)
        .populate('roommates');
}

async function createRenter(renter) {
    const newRenter = new Renter({
        city: renter.city,
        name: renter.name,
        rating: 0,
        roommates: renter.roommates || []
    });

    const savedRenter = await newRenter.save();
    return savedRenter.populate('roommates');
}

async function getAllRenters() {
    return Renter.find({})
        .populate('roommates');
}
```

Mongoose provides out-of-the-box methods for most operations we want to do here. Notice that at the top of the file we import our `Renter` model from our `src/models` directory. Another important thing to notice is the `populate` function. This is Mongoose’s way of performing a join operation on the id we attached to the field **roommates**. This populate method will fetch the data we need related to that id, removing the need to have a custom resolution strategy in our `src/renters/resolvers.js`. In fact we can remove the need for the entire `Renter` field in the resolvers object (we will be doing similar things for the other two entities properties, and propertyOwners).

When creating or updating an entity, we still want to have the `roommates` field populated. In this case we have to add a step where we `save` an entity first, and then return by calling the `.populate` function with the fields we want to return. If we return without calling `.populate` then it will return only the string value of those fields which will break our GraphQL query.

Now let’s move over to the `src/propertyOwners/dataSource.js` and add Mongoose to the methods:
```js
const { PropertyOwner } = require('../models');

async function getPropertyOwnerById(propertyOwnerId) {
    return PropertyOwner.findById(propertyOwnerId)
        .populate('properties');
}

async function createPropertyOwner(propertyOwner) {
    const newPropertyOwner = new PropertyOwner({
        name: propertyOwner.name,
        address: propertyOwner.address,
        properties: propertyOwner.properties || [],
        photo: propertyOwner.photo,
        rating: 0
    });

    const savedPropertyOwner = await newPropertyOwner.save();

    return savedPropertyOwner
        .populate('properties');
}

async function getAllPropertyOwners() {
    return PropertyOwner.find({})
        .populate('properties');
}
```

**Note:** Do not forget to remove the PropertyOwner field from the resolvers in `src/propertyOwners/resolver.js`.

Finally we head to our `src/properties/dataSource.js` file and we add the following lines:
```js
const { Property } = require('../models');
const { PropertyNotFoundError } = require('../../errors');

async function getPropertyById(propertyId) {
    return Property.findById(propertyId)
        .populate('renters propertyOwner');
}

async function createProperty(property) {
    const newProperty = new Property({
        available: property.available,
        city: property.city,
        description: property.description,
        name: property.name,
        photos: property.photos || [],
        propertyOwner: property.propertyOwnerId,
        rating: 0,
        renters: property.renters || []
    });

    const savedProperty = await newProperty.save();

    return savedProperty
        .populate('renters propertyOwner');
}

async function updateProperty(propertyId, updatedProperty) {
    const savedProperty = await Property.findByIdAndUpdate(
        propertyId,
        updatedProperty,
        { new: true }
    ).populate('renters propertyOwner');

    if (!savedProperty) {
        return PropertyNotFoundError(propertyId);
    }
    return {
        __typename: 'Property',
        id: savedProperty.id,
        available: savedProperty.available,
        city: savedProperty.city,
        description: savedProperty.description,
        name: savedProperty.name,
        photos: savedProperty.photos,
        propertyOwner: savedProperty.propertyOwnerId,
        rating: savedProperty.rating,
        renters: savedProperty.renters
    }
}

async function getAllProperties() {
    return Property.find({})
        .populate('renters propertyOwner');
}
```

Now an interesting part here is that if we need to `populate` multiple fields on one entity, we don’t have to chain multiple `populate` methods. We simply need to pass in one space-separated string of the fields we need to populate (see line 6 for an example). If the field we wish to populate is a field on a nested entity, then we can follow this notation `ENTITY_NAME.FIELD_NAME` and Mongoose will populate it for us.

The `updateProperty` function is also something to note since we are doing something a bit different, we are passing in a third input to `findIdAndUpdate`. By adding `{ new: true }`, it indicates that we should return a new document on update. If there is no returned document, then we can throw our `PropertyNotFoundError`. The other difference is how we return the updated document, because we cannot destructure the fields like so:
```js
return {
  __typename: 'Property',
  ...savedProperty
}
```
Doing this will make the return object have other MongoDB-related fields and will break the return type for this GraphQL mutation.

## Conclusion

During this tutorial we covered how to get MongoDB setup in the cloud, how to use `dotenv` in order to hide our connection string, and had walked through some of the features of Mongoose’s Schema creation methods. Next we created a `seed.js` script in order to initialize data within our database. Finally we used those models defined to upgrade our dataSource methods. We talked about some of the features of populate and how it can make entity resolution easier.

At the end of this tutorial you should have a repository similar to [this](https://github.com/bitovi/node-graphql-tutorial-2023/tree/mongodb)

I hope you learned something new in this tutorial, and in the next tutorial in the series will we cover  porting over our endpoints from Mongoose to Prisma!