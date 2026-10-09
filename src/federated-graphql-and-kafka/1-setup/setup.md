@page learn-federated-graphql-and-kafka/setup Course Setup
@parent learn-federated-graphql-and-kafka 1
@outline 2

@description Create the course Codespace, and start Kafka, the other teams' APIs, your Claims API, and the gateway.

@body

## Create the Codespace

✏️ Click the button below to create a Codespace:

<a href="https://codespaces.new/bitovi/graphql-and-kafka-workshop?devcontainer_path=.devcontainer/federation/devcontainer.json"><img src="https://github.com/codespaces/badge.svg" alt="Open in GitHub Codespaces"/></a>

✏️ Confirm these options, then click **Create codespace**:

<table>
   <tr>
      <th>Option</th>
      <th>Value</th>
   </tr>
   <tr>
      <td><strong>Repository</strong></td>
      <td><code>bitovi/graphql-and-kafka-workshop</code></td>
   </tr>
   <tr>
      <td><strong>Branch</strong></td>
      <td><code>main</code></td>
   </tr>
   <tr>
      <td><strong>Dev container configuration</strong></td>
      <td>Federated GraphQL + Kafka</td>
   </tr>
   <tr>
      <td><strong>Region</strong></td>
      <td>East US or West US</td>
   </tr>
   <tr>
      <td><strong>Machine type</strong></td>
      <td>8-core</td>
   </tr>
</table>

The first start takes a few minutes. The Codespace installs your Claims API's packages and builds the other teams' APIs. Wait until the terminal shows a prompt.

## What's in the Codespace

The Codespace opens the **federation** folder. Only two folders in it are yours to edit:

<table>
   <tr>
      <th>Folder</th>
      <th>What it is</th>
   </tr>
   <tr>
      <td><strong>claims</strong></td>
      <td>Your Claims API. It already has paginated claims, filing, and approval.</td>
   </tr>
   <tr>
      <td><strong>gateway</strong></td>
      <td>The gateway, and the list of APIs it combines. You'll add your API to that list in Federation Basics.</td>
   </tr>
</table>

Everything else runs in Docker, from images the other teams built: Kafka, the Policies API, the Billing API, and the Claims Desk web app. **docker-compose.yml** lists them. Their code isn't in the Codespace, just as another team's code wouldn't be on your laptop. You'll learn what they offer from the gateway's schema, the way teams do at real companies.

## Start everything

You'll use two terminals: one for everything the other teams run, and one for your Claims API.

✏️ In the first terminal, start Kafka, the other teams' APIs, the Claims Desk, and the gateway:

```shell
npm start
```

It starts the Docker services and waits until they're ready. Then it combines the APIs' schemas, and starts the gateway. That takes about a minute the first time. Lines from the gateway start with `[gateway]`, and lines about combining schemas start with `[compose]`. Everything is ready when you've seen both of these:

<div data-toolbar-order="">

```text
[compose] ✔ Composition successful
[gateway] ... INF Listening on http://localhost:4000
```

</div>

Leave it running. You'll come back to this terminal to read what it prints.

✏️ Open a second terminal by clicking the **+** at the top right of the terminal panel. Start your Claims API:

```shell
cd claims && npm run dev
```

You should see:

<div data-toolbar-order="">

```text
🚀 Claims API ready at http://localhost:4002/graphql
```

</div>

Leave it running too. It restarts on its own when you save a change to your code.

## Check that it works

Codespaces gives each port its own web address. The **Ports** tab, next to the terminal, lists them by name.

✏️ In the **Ports** tab, click the globe icon next to **Gateway** (port `4000`). It opens Hive Gateway's welcome page. Click **Visit Laboratory** to open its built-in GraphQL explorer, which works like Apollo Sandbox. Click **Add operation**, and run this query:

```graphql
{
  policies {
    policyNumber
    totalPaidOut
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "policies": [
      { "policyNumber": "AUTO-100001", "totalPaidOut": 1250 },
      { "policyNumber": "HOME-100002", "totalPaidOut": 3800 },
      { "policyNumber": "AUTO-100003", "totalPaidOut": 975.25 },
      { "policyNumber": "LIFE-100004", "totalPaidOut": 0 },
      { "policyNumber": "RENTERS-100005", "totalPaidOut": 0 }
    ]
  }
}
```

</div>

That one query used two APIs. `policyNumber` came from the Policies API and `totalPaidOut` came from the Billing API. The gateway asked each one for its part.

✏️ In the gateway explorer, add another operation, and ask for claims:

```graphql
{
  claims(status: OPEN) {
    claimNumber
    policyId
  }
}
```

The gateway rejects it (trimmed for readability):

<div data-toolbar-order="">

```json
{
  "errors": [
    {
      "message": "Cannot query field \"claims\" on type \"Query\".",
      "extensions": { "code": "GRAPHQL_VALIDATION_FAILED" }
    }
  ]
}
```

</div>

None of the APIs the gateway knows about has a `claims` field.

✏️ In the **Ports** tab, click the globe icon next to **Your Claims API** (port `4002`). Your API opens in Apollo Sandbox. Run the same query:

```graphql
{
  claims(status: OPEN) {
    claimNumber
    policyId
  }
}
```

You should see:

<div data-toolbar-order="">

```json
{
  "data": {
    "claims": [
      { "claimNumber": "CLM-5004", "policyId": "p3" },
      { "claimNumber": "CLM-5006", "policyId": "p5" }
    ]
  }
}
```

</div>

Your API works, but the gateway doesn't know about it yet, so apps can't reach it through the gateway.

<figure style="margin: 1em 0">
    <img src="../static/img/federated-graphql-and-kafka/claims-not-in-graph-yet.svg" alt="The Claims Desk queries the gateway on port 4000, which asks the Policies and Billing APIs for their parts. The gateway has no connection to your Claims API yet, because it isn't in the gateway's config. You can query your Claims API directly in Apollo Sandbox on port 4002, but apps going through the gateway can't reach it." style="width: 100%; max-width: 800px">
    <figcaption style="text-align: center">Your Claims API runs, but nothing connects it to the gateway yet.</figcaption>
</figure>

✏️ In the **Ports** tab, click the globe icon next to **Claims Desk** (port `3000`). The app team's Claims Desk lists every policy with its premium and payouts. Its **Claims** column says **Waiting for the Claims API**, and the label at the top says **Your Claims API: not in the graph yet**. That changes in Federation Basics.

## When you take a break

A free GitHub account can run this Codespace for about 15 hours a month at no cost, or 22.5 hours with GitHub Pro. GitHub includes [120 hours a month, and each hour on an 8-core machine counts as 8](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces). The course takes about 2 hours, so that's plenty, as long as the Codespace isn't left running when you're not using it.

A Codespace stops on its own after [30 minutes without activity](https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces), unless you've changed that setting. To stop it yourself, see [Stopping and starting a codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace).

Your code changes are kept. When you start the Codespace again, run both commands in [Start everything](#start-everything) again.

## Next steps

Next, we'll look at the system: which team owns which API, what each one returns, and which events travel through Kafka.
