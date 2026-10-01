@page learn-graphql-102 Learn GraphQL 102
@parent bit-academy 5

@description Get the API you built in GraphQL 101 ready for real users, fixing one production problem at a time.

@body

## Before you begin

<a href="https://discord.gg/J7ejFsZnJ4">
<img src="./static/img/discord.png"
  style="float:left; margin:20px" width="57"/> <span style="margin-top: 10px;display: inline-block;">Click here to join the<br/>Bitovi Community Discord</span></a>

Join the Bitovi Community Discord to get help on Bitovi Academy courses or other GraphQL, Node.js, Angular, React, CanJS and JavaScript problems.

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In [GraphQL 101](learn-graphql-101.html), you built an API for a fictional insurance company. It works, but it isn't ready for real users yet. It returns every claim in one response, it accepts dates that don't exist, it tells anyone who asks exactly how it's built, anyone can change its data, and nothing stops a client from sending a query big enough to slow it down.

This course fixes those problems, one section and exercise at a time.

After this course, you'll be able to:

- Paginate long lists with cursor-based connections
- Use a custom scalar from a library to reject invalid values
- Return errors that clients can act on
- Protect an API from leaking its details, and from expensive queries
- Decide who can see and change which data
- Mark how long data can be cached, and cache repeated queries on the server
- Explain how subscriptions push live updates to clients

## Prerequisites

This course assumes you've completed [GraphQL 101](learn-graphql-101.html), or are comfortable writing queries, mutations, schemas, and resolvers.

## Outline

1. [Course Setup](learn-graphql-102/setup.html): create the course Codespace and start the API
2. [The Course Data](learn-graphql-102/course-data.html): the policyholders, policies, and claims the API starts with
3. [Pagination](learn-graphql-102/pagination.html): return claims one page at a time with cursors and connections
4. [Custom Scalars](learn-graphql-102/custom-scalars.html): replace plain-string dates with a date type that rejects invalid dates
5. [Error Handling](learn-graphql-102/error-handling.html): return coded errors for mistakes, and typed results for problems the user needs to see
6. [Security](learn-graphql-102/security.html): turn off introspection, hide schema details from errors, and limit page size and query depth
7. [Authorization](learn-graphql-102/authorization.html): decide who can see and change which data, and let only agents issue policies
8. [Caching and Performance](learn-graphql-102/caching-and-performance.html): mark how long data can be cached, and serve repeated queries from a server-side cache
9. [Subscriptions](learn-graphql-102/subscriptions.html): how a server pushes live updates to clients, and when to use them instead of polling
10. [Wrapping Up](learn-graphql-102/wrapping-up.html): what you changed, and where to go next
