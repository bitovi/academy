@page learn-graphql-101/setup Course Setup
@parent learn-graphql-101 1
@outline 2

@description Create the GraphQL 101 Codespace and start the course API.

@body

## Create the Codespace

The course environment runs in a GitHub Codespace, a cloud development environment that opens in your browser with everything preinstalled.

✏️ Click the button below to create a Codespace:

<a href="https://codespaces.new/bitovi/graphql-and-kafka-workshop?devcontainer_path=.devcontainer/101/devcontainer.json"><img src="https://github.com/codespaces/badge.svg" alt="Open in GitHub Codespaces"/></a>

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
      <td>GraphQL 101</td>
   </tr>
   <tr>
      <td><strong>Region</strong></td>
      <td>East US or West US</td>
   </tr>
   <tr>
      <td><strong>Machine type</strong></td>
      <td>2-core</td>
   </tr>
</table>

✏️ Once the Codespace finishes loading, start the API by running this in its terminal:

```shell
cd services/policies && npm run dev
```

You should see:

<div data-toolbar-order="">

```text
🚀 Policies service ready at http://0.0.0.0:4001/
```

</div>

Codespaces opens port `4001` in a new browser tab, showing **Apollo Sandbox**, an in-browser editor for writing and running GraphQL queries. If the tab doesn't open, open the **Ports** tab in the Codespace and click the globe icon next to port `4001`.

Leave the server running while you work through the course. It restarts on its own when you save a change.

### When you take a break

GitHub [charges Codespaces use](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) by the hour while a Codespace is running, and personal accounts get a free amount each month. A Codespace stops on its own after [30 minutes without activity](https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces), unless you've changed that setting. To stop it sooner, see [Stopping and starting a codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace). Your changes are kept, and you can start it again from the same page.

## Next steps

Next, we'll learn what GraphQL is, and run our first query.
