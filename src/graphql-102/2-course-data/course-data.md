@page learn-graphql-102/course-data The Course Data
@parent learn-graphql-102 2
@outline 2

@description Meet the policyholders, policies, and claims in the course API. Come back to this page whenever an exercise refers to specific data.

@body

## Overview

The course API is the same fictional insurance company you worked on in GraphQL 101. It holds three kinds of data:

- **Policyholders**: the company's customers
- **Policies**: the insurance each policyholder owns (auto, home, life, or renters)
- **Claims**: requests for payment against a policy, such as after a car accident

This page shows the data the API starts with. Field names are shown exactly as you'd use them in a query.

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
      <th><code>id</code></th>
      <th><code>policyNumber</code></th>
      <th><code>type</code></th>
      <th><code>monthlyPremium</code></th>
      <th><code>effectiveDate</code></th>
      <th><code>riskTier</code></th>
      <th><code>policyholder</code></th>
   </tr>
   <tr>
      <td><code>p1</code></td>
      <td>AUTO-100001</td>
      <td><code>AUTO</code></td>
      <td>142.50</td>
      <td>2025-01-15</td>
      <td><code>MEDIUM</code></td>
      <td>Maria Alvarez</td>
   </tr>
   <tr>
      <td><code>p2</code></td>
      <td>HOME-100002</td>
      <td><code>HOME</code></td>
      <td>98.00</td>
      <td>2024-06-01</td>
      <td><code>LOW</code></td>
      <td>Maria Alvarez</td>
   </tr>
   <tr>
      <td><code>p3</code></td>
      <td>AUTO-100003</td>
      <td><code>AUTO</code></td>
      <td>210.75</td>
      <td>2025-03-10</td>
      <td><code>HIGH</code></td>
      <td>James Okafor</td>
   </tr>
   <tr>
      <td><code>p4</code></td>
      <td>LIFE-100004</td>
      <td><code>LIFE</code></td>
      <td>45.00</td>
      <td>2023-11-20</td>
      <td><code>LOW</code></td>
      <td>Priya Raman</td>
   </tr>
   <tr>
      <td><code>p5</code></td>
      <td>RENTERS-100005</td>
      <td><code>RENTERS</code></td>
      <td>18.25</td>
      <td>2025-08-01</td>
      <td><code>MEDIUM</code></td>
      <td>Priya Raman</td>
   </tr>
</table>

Policies also have two fields that aren't stored, but calculated when you ask for them:

- **`annualPremium`**: `monthlyPremium` × 12
- **`totalClaimed`**: the total `amount` of the policy's **approved** claims. Open and denied claims don't count.

## Claims

<table>
   <tr>
      <th><code>id</code></th>
      <th><code>claimNumber</code></th>
      <th><code>amount</code></th>
      <th><code>status</code></th>
      <th><code>filedDate</code></th>
      <th><code>policy</code></th>
   </tr>
   <tr>
      <td><code>c1</code></td>
      <td>CLM-5001</td>
      <td>1250.00</td>
      <td><code>APPROVED</code></td>
      <td>2025-04-02</td>
      <td>AUTO-100001</td>
   </tr>
   <tr>
      <td><code>c2</code></td>
      <td>CLM-5002</td>
      <td>430.50</td>
      <td><code>DENIED</code></td>
      <td>2025-06-18</td>
      <td>AUTO-100001</td>
   </tr>
   <tr>
      <td><code>c3</code></td>
      <td>CLM-5003</td>
      <td>3800.00</td>
      <td><code>APPROVED</code></td>
      <td>2024-11-05</td>
      <td>HOME-100002</td>
   </tr>
   <tr>
      <td><code>c4</code></td>
      <td>CLM-5004</td>
      <td>2200.00</td>
      <td><code>OPEN</code></td>
      <td>2025-08-21</td>
      <td>AUTO-100003</td>
   </tr>
   <tr>
      <td><code>c5</code></td>
      <td>CLM-5005</td>
      <td>975.25</td>
      <td><code>APPROVED</code></td>
      <td>2025-05-09</td>
      <td>AUTO-100003</td>
   </tr>
   <tr>
      <td><code>c6</code></td>
      <td>CLM-5006</td>
      <td>640.00</td>
      <td><code>OPEN</code></td>
      <td>2025-09-12</td>
      <td>RENTERS-100005</td>
   </tr>
</table>

## How the data is connected

- Each policy belongs to **one** policyholder, and a policyholder can have **several** policies. Maria Alvarez has both an auto and a home policy.
- Each claim belongs to **one** policy, and a policy can have **several** claims. `AUTO-100001` has two claims, and `LIFE-100004` has none.

In a query, you follow these connections with nested fields. From a policyholder you can reach their `policies`, and from each policy its `claims`, all in one request. You can also go the other way, from a claim to its `policy` and on to the `policyholder`.

## Good to know

- **Your changes are saved.** Policies and claims you add are written to **services/policies/data.json** and **services/policies/claims.json**, so they're still there after the server restarts. To go back to the starting data, stop the server, run `npm run reset-data` in **services/policies**, and start it again.
- **Amounts are in US dollars.** The API returns them as numbers, so trailing zeros are dropped: `975.25` comes back as `975.25`, but `1250.00` comes back as `1250`.
