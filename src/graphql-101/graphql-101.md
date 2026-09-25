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
- Write queries and mutations, with arguments and nested fields, against a GraphQL API
- Extend an API by adding schema fields and arguments, and the resolvers that implement them
- Describe GraphQL's trade-offs versus REST, including caching and the N+1 problem

## Environment

The exercises run in a GitHub Codespace, so there's nothing to install locally.

<a href="https://codespaces.new/bitovi/graphql-and-kafka-workshop?devcontainer_path=.devcontainer/101/devcontainer.json"><img src="https://github.com/codespaces/badge.svg" alt="Open in GitHub Codespaces"/></a>

## Outline

1. [What is GraphQL?](learn-graphql-101/what-is-graphql.html): how GraphQL compares to REST, and your first query
2. [The Course Data](learn-graphql-101/course-data.html): the policyholders and policies the API starts with
3. [Writing Queries](learn-graphql-101/writing-queries.html): nested fields, arguments, variables, and request validation
4. [Schemas and Resolvers](learn-graphql-101/schemas-and-resolvers.html): how the server answers queries, and adding a new argument
5. [Mutations](learn-graphql-101/mutations.html): issue policies with input types, and make a field required
6. [N+1 and DataLoader](learn-graphql-101/n-plus-one.html): why nested fields can multiply the work your server does, and batching with DataLoader
7. [Final Exam](learn-graphql-101/final-exam.html): add insurance claims to the API, using everything from the course
