@page learn-graphql-101/course-data The Course Data
@parent learn-graphql-101 3
@outline 2

@description Meet the policyholders and policies in the course API. Come back to this page whenever an exercise refers to specific data.

@body

## Overview

Throughout this course, you'll work on the API for a fictional insurance company. It holds two kinds of data:

- **Policyholders**: the company's customers
- **Policies**: the insurance each policyholder owns (auto, home, life, or renters)

This page shows the data the API starts with, so you know what to expect before writing a query. Field names are shown exactly as you'd use them in a query.

## Policyholders

<table>
   <tr>
      <th><code>id</code></th>
      <th><code>name</code></th>
      <th><code>email</code></th>
   </tr>
   <tr>
      <td><code>ph1</code></td>
      <td>Maria Alvarez</td>
      <td>maria.alvarez@example.com</td>
   </tr>
   <tr>
      <td><code>ph2</code></td>
      <td>James Okafor</td>
      <td>james.okafor@example.com</td>
   </tr>
   <tr>
      <td><code>ph3</code></td>
      <td>Priya Raman</td>
      <td>priya.raman@example.com</td>
   </tr>
</table>

## Policies

<table>
   <tr>
      <th><code>policyNumber</code></th>
      <th><code>type</code></th>
      <th><code>monthlyPremium</code></th>
      <th><code>effectiveDate</code></th>
      <th><code>riskTier</code></th>
      <th><code>policyholder</code></th>
   </tr>
   <tr>
      <td>AUTO-100001</td>
      <td><code>AUTO</code></td>
      <td>142.50</td>
      <td>2025-01-15</td>
      <td><code>MEDIUM</code></td>
      <td>Maria Alvarez</td>
   </tr>
   <tr>
      <td>HOME-100002</td>
      <td><code>HOME</code></td>
      <td>98.00</td>
      <td>2024-06-01</td>
      <td><code>LOW</code></td>
      <td>Maria Alvarez</td>
   </tr>
   <tr>
      <td>AUTO-100003</td>
      <td><code>AUTO</code></td>
      <td>210.75</td>
      <td>2025-03-10</td>
      <td><code>HIGH</code></td>
      <td>James Okafor</td>
   </tr>
   <tr>
      <td>LIFE-100004</td>
      <td><code>LIFE</code></td>
      <td>45.00</td>
      <td>2023-11-20</td>
      <td><code>LOW</code></td>
      <td>Priya Raman</td>
   </tr>
   <tr>
      <td>RENTERS-100005</td>
      <td><code>RENTERS</code></td>
      <td>18.25</td>
      <td>2025-08-01</td>
      <td><code>MEDIUM</code></td>
      <td>Priya Raman</td>
   </tr>
</table>

Each policy also has an `id` (`p1` through `p5`, in the order above).

## How the data is connected

Each policy belongs to **one** policyholder, and a policyholder can have **several** policies. Maria Alvarez, for example, has both an auto and a home policy.

<figure style="margin: 1em 0">
    <img src="../static/img/graphql-101/course-data.svg" alt="ph1 Maria Alvarez owns p1 AUTO-100001 and p2 HOME-100002. ph2 James Okafor owns p3 AUTO-100003. ph3 Priya Raman owns p4 LIFE-100004 and p5 RENTERS-100005." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">Which policyholder owns which policy.</figcaption>
</figure>

In a query, you follow that connection with nested fields: from a policy to its `policyholder`, or from a policyholder to their `policies`. You'll do this in [Writing Queries](./writing-queries.html).

## Good to know

- **Your changes are saved.** Policies you add or change are written to **services/policies/data.json**, and claims to **services/policies/claims.json**, so they're still there after the server restarts. To go back to the starting data, stop the server, run `npm run reset-data` in **services/policies**, and start it again.
- **`monthlyPremium`** is in US dollars. The API returns it as a number, so trailing zeros are dropped: `210.75` comes back as `210.75`, but `98.00` comes back as `98`.
