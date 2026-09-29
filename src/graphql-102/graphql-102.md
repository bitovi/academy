@page learn-graphql-102 Learn GraphQL 102
@parent bit-academy 4

@description Learn how to get a GraphQL API ready for real users, then combine separate APIs into one API with federation.

@body

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other GraphQL, Node.js, Angular, React, CanJS and JavaScript problems.

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In [GraphQL 101](learn-graphql-101.html), you built an API for a fictional insurance company. It works, but it isn't ready for real users yet. It returns every claim in one response, it tells anyone who asks exactly how it's built, and nothing stops a client from sending a query big enough to slow it down.

The first part of this course fixes those problems, one short lesson and exercise at a time.

The rest of the course is one larger exercise. The insurance company has grown, and its policies, claims, and billing data now live in three separate APIs. Using **federation**, you'll combine those APIs so clients can still query a single endpoint, and you'll use what you learned in the lessons along the way.

After this course, you'll be able to:

- Use introspection to explore a schema, and explain why production APIs often turn it off
- Paginate long lists with cursor-based connections
- Return errors that clients can act on
- Protect an API from expensive or malicious queries
- Explain how GraphQL responses can be cached
- Explain how subscriptions push live updates to clients
- Combine separate APIs into one API with federation

## Prerequisites

This course assumes you've completed [GraphQL 101](learn-graphql-101.html), or are comfortable writing queries, mutations, schemas, and resolvers.

## Outline

1. [Course Setup](learn-graphql-102/setup.html): create the course Codespace and start the API
2. [The Course Data](learn-graphql-102/course-data.html): the policyholders, policies, and claims the API starts with
3. [Introspection](learn-graphql-102/introspection.html): explore the schema with introspection queries, and turn introspection off

More lessons are coming soon. The course will also cover:

- Pagination
- Error handling
- Security
- Caching and performance
- Subscriptions
- Federation
