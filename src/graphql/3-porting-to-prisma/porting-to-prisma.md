@page learn-graphql/porting-to-prisma Converting Mongoose to Prisma
@parent learn-graphql 3

@description In this guide we will be working off of a starting point [project](https://github.com/bitovi/node-graphql-tutorial-2023/tree/mongodb) and will be removing the need for Mongoose and instead we will be using Prisma to perform our queries and mutations!

@body

## What is an ORM?

To begin we will be addressing what is an ORM: it stands for Object Relational Mapping. This is essentially a technique used in creating a bridge between object-oriented programs like Node JS and relational databases like SQL. Instead of having to build your own custom ORM tool from scratch, you can make use of an ORM (even Mongoose is an ORM).

## What is Prisma?

Prisma is a new type of ORM where you can define your model in the declarative Prisma schema which serves as the single source of truth for your database schema and the models in your programming language. Using the Prisma Client you get type-safe methods, and some nice autocompletion when interacting with a collection or table. Prisma also comes with **Prisma Migrate**, which is a declarative data modeling and migration tool which generates a migration file, updates the database schema, and generates the new Prisma client for use during development.