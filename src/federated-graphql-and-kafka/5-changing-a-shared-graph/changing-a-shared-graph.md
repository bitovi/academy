@page learn-federated-graphql-and-kafka/changing-a-shared-graph Changing a Shared Graph
@parent learn-federated-graphql-and-kafka 5
@outline 2

@description Fix your subgraph when another team's change stops the subgraphs from fitting together, and rename a field without breaking the apps that use it.

@body

## Overview

In this section, we will:

- See what happens when another team ships a change that doesn't fit your subgraph
- Read a composition error, and fix your side of it
- Learn the difference between breaking composition and breaking a client
- Rename a field without breaking the Claims Desk

## Objective 1: Fix a change that breaks composition

### A request from the Billing team

The Billing team wants staff to see each claim's payout next to the claim. They've built version 2 of their subgraph. It adds a `payout` field to your `Claim` type, the same way you added `claims` to the Policies team's `Policy` type.

✏️ Open a new terminal, and ship the Billing team's version 2:

```shell
npm run billing:ship-v2
```

It restarts the Billing subgraph with its new schema. A few seconds later, the `npm start` terminal shows:

<div data-toolbar-order="">

```text
[compose] ℹ Detected changes, recomposing
[compose] ✖ Local composition failed:
[compose] ✖ Detected 1 error
[compose]    - Non-shareable field Claim.id is resolved from multiple
  subgraphs: it is resolved from subgraphs billing and claims and
  defined as non-shareable in subgraph claims
```

</div>

The error is on one line in your terminal. It's wrapped here for readability. You may also see `Can't reach a subgraph right now` while Billing restarts.

Composition failed, so the gateway kept its last working supergraph. Everything that worked before still works, and the Claims Desk looks the same. But Billing's new field isn't there yet.

✏️ In the gateway explorer, run:

```graphql
{
  claim(id: "c1") {
    claimNumber
    payout {
      amount
      paidOn
    }
  }
}
```

You get a validation error (trimmed for readability):

<div data-toolbar-order="">

```json
{
  "errors": [
    {
      "message": "Cannot query field \"payout\" on type \"Claim\". Did you mean \"amount\"?",
      "extensions": { "code": "GRAPHQL_VALIDATION_FAILED" }
    }
  ]
}
```

</div>

In a real company, this failure would happen earlier. A schema registry composes every new subgraph schema before it's published, and rejects one that doesn't fit. Apollo calls this [breaking composition](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/composition). The Billing team would find out before they deployed, and come to you.

### Reading the error

"Non-shareable field Claim.id is resolved from multiple subgraphs" means two subgraphs both claim to resolve `Claim.id`. By default, Apollo's [guide to sharing types](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/sharing-types) says, "a single object field can't be defined or resolved by more than one subgraph schema."

Billing declared `Claim` as an entity, with `@key(fields: "id")`, so it can add `payout`. Your subgraph declares `Claim` as an ordinary type, so its `id` field belongs to your subgraph alone. The two declarations don't agree on what `Claim` is.

Federation has a directive for fields that several subgraphs resolve, [`@shareable`](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/directives#shareable): it "indicates that an object type's field is allowed to be resolved by multiple subgraphs." That fits fields whose data really is duplicated. It doesn't fit here. Billing doesn't have claims; it wants to add a field to yours. That's what entities are for, so `Claim` needs to be an entity in your subgraph too.

### Exercise

✏️ Make `Claim` an entity, keyed by its `id`. Change **claims/src/schema.graphql** and **claims/src/resolvers.ts**.

Unlike Billing, your subgraph has claims. So when the gateway sends you a claim's representation, your reference resolver can return the whole claim.

When you save, the `npm start` terminal should show `[compose] ✔ Composition successful`.

✏️ In the gateway explorer, run the query again, this time for two claims:

```graphql
{
  c1: claim(id: "c1") {
    claimNumber
    payout {
      amount
      paidOn
    }
  }
  c4: claim(id: "c4") {
    claimNumber
    payout {
      amount
      paidOn
    }
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "c1": {
      "claimNumber": "CLM-5001",
      "payout": { "amount": 1250, "paidOn": "2025-04-10" }
    },
    "c4": {
      "claimNumber": "CLM-5004",
      "payout": null
    }
  }
}
```

</div>

`CLM-5004` is still open, so it hasn't been paid.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/schema.graphql**, add `@key` to `Claim`:

```graphql
type Claim @key(fields: "id") {
```

✏️ In **claims/src/resolvers.ts**, add a reference resolver to the `Claim` entry:

```ts
  Claim: {
    // The gateway sends a claim's id when another subgraph,
    // like Billing, needs the rest of it.
    __resolveReference: (reference: { id: string }) =>
      claims.find((c) => c.id === reference.id),
    policy: (claim: Claim) => ({ id: claim.policyId }),
  },
```

</details>

## Objective 2: Change a field without breaking clients

### Two kinds of breaking change

Composition checks that the subgraphs fit together. It doesn't check the queries apps send. A change can compose fine and still break every app that uses the field.

The GraphQL documentation on [schema change management](https://graphql.org/learn/governance-versioning/#identify-breaking-changes) defines a breaking change as "any change that breaks the server/client contract. This happens when previously valid operations become invalid or when the shape of the returned data changes." Its list of common breaking changes starts with "Removing fields or types" and "Renaming fields or types."

Now that claims have payouts, `Claim.amount` is easy to confuse with `Payout.amount`. You'd like to call it `claimedAmount`.

### Exercise

✏️ In **claims/src/schema.graphql**, rename the `amount` field on `Claim` to `claimedAmount`. Only the one on `Claim`: leave `FileClaimInput` alone, and don't change any resolvers.

Composition succeeds. Your subgraph's schema is valid, and nothing else in the supergraph used `Claim.amount`.

✏️ Open the Claims Desk on port `3000`. Within a few seconds it shows:

<div data-toolbar-order="">

```text
The gateway rejected the Claims Desk's query: Cannot query field "amount" on type "Claim". Did you mean "payout"?
```

</div>

The app team's query still asks for `amount`. It's no longer valid, so the whole query fails, and the Desk shows nothing at all.

✏️ Undo the rename, so `Claim` has `amount` again. The Claims Desk recovers within a few seconds.

### Deprecate first, remove later

The safe way to rename a field is in steps. The GraphQL documentation describes them under [deprecate fields before removal](https://graphql.org/learn/governance-versioning/#deprecate-fields-before-removal):

1. Add the new field next to the old one.
2. Mark the old one `@deprecated`. The directive "marks fields and enum values as obsolete while keeping them functional. This gives clients advance warning to update their queries before you remove the deprecated element."
3. Wait for clients to move to the new field. The documentation says to "remove deprecated elements only when usage drops to acceptable levels or the deadline passes. For critical systems, wait until usage reaches zero."

That last step needs data about which fields clients use. Schema registries collect it from the gateway. Hive's [usage insights](https://the-guild.dev/graphql/hive/docs/schema-registry/usage-reporting) put it this way: "with the knowledge of what GraphQL fields are being used, you can confidently evolve your schema without breaking your consumers."

### Exercise

✏️ Rename the field safely. Add a `claimedAmount` field to `Claim`, with the same type and description as `amount`. Deprecate `amount`, with a reason that tells clients what to use instead. Change **claims/src/schema.graphql** and **claims/src/resolvers.ts**.

✏️ In the gateway explorer, run:

```graphql
{
  claim(id: "c4") {
    claimNumber
    amount
    claimedAmount
  }
}
```

You should see both fields, with the same value:

<div data-toolbar-order="">

```json
{
  "data": {
    "claim": {
      "claimNumber": "CLM-5004",
      "amount": 2200,
      "claimedAmount": 2200
    }
  }
}
```

</div>

The schema now reports `amount` as deprecated, with your reason, so tools that read the schema can warn the app team. The Claims Desk keeps working, since its query is still valid. When the app team moves to `claimedAmount`, and usage of `amount` drops to zero, you can remove it.

### Solution

<details>
<summary>Click to see the solution</summary>

✏️ In **claims/src/schema.graphql**, update the amount fields on `Claim`:

```graphql
  "Amount claimed in US dollars"
  amount: Float! @deprecated(reason: "Use claimedAmount. Billing's payouts also have an amount.")
  "Amount claimed in US dollars"
  claimedAmount: Float!
```

✏️ In **claims/src/resolvers.ts**, add a resolver to the `Claim` entry. Claims are stored with an `amount` property, so `claimedAmount` can't use a default resolver:

```ts
    claimedAmount: (claim: Claim) => claim.amount,
```

</details>

### Hiding a field instead

Sometimes a field shouldn't be in the supergraph at all, but other subgraphs still need it. Federation's [`@inaccessible`](https://www.apollographql.com/docs/graphos/schema-design/federated-schemas/reference/directives#inaccessible) directive "indicates that a definition in the subgraph schema should be omitted from the router's API schema, even if that definition is also present in other subgraphs." Clients can't query it, but the gateway can still use it between subgraphs. Like removing a field, hiding one breaks any client still asking for it, so it needs the same care.

## Next steps

Next, we'll publish an event every time a claim is filed or approved, so other teams can react without calling your API, and without losing events when Kafka is down.
