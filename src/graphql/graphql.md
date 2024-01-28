@page learn-graphql Learn Graphql
@parent bit-academy 4

@description Build a backend application for property rentals using Node JS, GraphQL and Apollo Server.
        Learn about using ORMs like Mongoose and Prisma with a NoSQL Mongo database!
        Write testcases testing created endpoints.

@body

## Before You Begin

<p><a href="https://discord.gg/J7ejFsZnJ4">
<img src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a></p>

<br/>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other
GraphQL, Node JS, Angular, React, CanJS and JavaScript problems.

Please ask questions related to GraphQ: in the [GraphQL chat room](https://discord.gg/Qv26e4uq5z).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In this guide, we will build a GraphQL server in Apollo Studio:

You can see a finished repository of the code we are about to write [here](https://github.com/bitovi/node-graphql-tutorial-2023).

This application (and course) assumes a fair bit of knowledge about Node JS, and some basic concepts of GraphQL. It is intended to teach developers about some updates to commonly used frameworks and to illustrate some more advanced concepts. We will be including how to perform:

- Defining Schemas
- Schema Stitching
- Entity Resolution
- Error Handling and Unions
- Directives
- Setting Up MongoDB with Mongoose
- Converting from Mongoose to Prisma
- Adding Testing with Jest and introducing Fragments

As for the application itself, it:

- Is written in Node JS 18.12.1, Apollo Server 4, GraphQL 16.6
- Has basic CRUD endpoints for three entites: Properties, PropertyOwners and Renters
- Has schema stitching and separate resolvers for each of the entities
- Has some local data that creates relationships and can illustrate entity resolution
- Transforms over time to include a database, and use different ORMs
- Illustrates an introduction to more advanced concepts and includes a baseline for testing endpoints

## Outline

This GraphQL tutorial will take you through creating different entities, how to create a server using Apollo Server 4, and some of the plugins available to use. We will go through queries, mutations, dealing with the resolver chain (A.K.A how to handle entity resolution). We’ll talk a bit about growing our graph including update mutations and introduce some error handling. Then we’ll go over directives that are available for the maintenance of your graph, and then end with adding some cache control for some fields within an entity.

We are going to create a baseline application that has three main entities: renters, properties, and propertyOwners. This application will create some create/read endpoints for the following entities, and establish the different relationships between renters, properties, and propertyOwners. We want to start building an application that allows renters to find roommates as well as properties that are owned by property owners.

Once the baseline application is created, we’ll also go over some basic methods to perform CRUD operations within Mongoose, and how we will pull related entities from our database (what is known as joins in SQL) using the `populate` function in Mongoose. We’ll also create a small seed file in order to fill our database with some baseline information.

After that we will swap Mongoose for Prisma, and use that to perform our queries and mutations. This will encompass what porting Mongodb over to Prisma will look like.

Finally we will add testing with Jest and include some nice abstractions to keep testing as clean as possible and introduce the idea of Fragments to do so.

## Requirements

In order to complete this guide, you need to have [Node.js](https://nodejs.org/en/) version
18.12.1 or later installed. This is to use the new `--watch` feature that was added to Node JS.

## Next Steps

✏️ Head over to the [first lesson](learn-graphql/setting-up-apollo.html) and get the initial project created.