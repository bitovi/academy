@page learn-graphql-101 Learn GraphQL 101
@parent bit-academy 4

@description Learn GraphQL fundamentals by querying and extending a real GraphQL API: schemas, resolvers, queries, and mutations.

@body

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other GraphQL, Node.js, Angular, React, CanJS and JavaScript problems.

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

GraphQL is a query language for APIs, plus a server runtime that answers those queries using functions you write.

In this course you'll work with a small API for a fictional insurance company, with policies and policyholders, built with Apollo Server. You'll query it, find its limits, and then extend it yourself.

After this course, you'll be able to:

- Explain GraphQL's operation types: queries and mutations
- Explain how a schema and its resolvers relate
- Write queries and mutations, with arguments, nested fields, variables, directives, and fragments, against a GraphQL API
- Send a query from code, the way an app does
- Explore an unfamiliar API's schema with introspection
- Extend an API by adding schema fields and arguments, and the resolvers that implement them
- Change a schema without breaking clients, using `@oneOf` and `@deprecated`
- Describe GraphQL's trade-offs versus REST, including caching and the N+1 problem

## Outline

1. [Course Setup](learn-graphql-101/setup.html): create the course Codespace and start the API
2. [What is GraphQL?](learn-graphql-101/what-is-graphql.html): how GraphQL compares to REST, and your first query
3. [The Course Data](learn-graphql-101/course-data.html): the policyholders and policies the API starts with
4. [Writing Queries](learn-graphql-101/writing-queries.html): nested fields, arguments, variables, directives, fragments, sending a query from code, and request validation
5. [Exploring the Schema](learn-graphql-101/exploring-the-schema.html): ask the API to describe its own schema with introspection
6. [Schemas and Resolvers](learn-graphql-101/schemas-and-resolvers.html): how the server answers queries, and adding a new argument
7. [Mutations](learn-graphql-101/mutations.html): issue policies with input types, make a field required, and evolve the schema with `@oneOf` and `@deprecated`
8. [N+1 and DataLoader](learn-graphql-101/n-plus-one.html): why nested fields can multiply the work your server does, and batching with DataLoader
9. [Final Exam](learn-graphql-101/final-exam.html): add insurance claims to the API, using everything from the course
