@page learn-graphql-102/setup Course Setup
@parent learn-graphql-102 1
@outline 2

@description Create the GraphQL 102 Codespace and start the course API.

@body

## Create the Codespace

GraphQL 102 runs in a new Codespace, separate from the one you used in 101. It starts with the finished 101 API: policies, policyholders, and claims, with every 101 exercise already done. You don't need to bring over any of your 101 work.

The code is tidied up a little compared with what you wrote in 101. The `[RESOLVER]` and `[LOADER]` log lines are gone, and some comments are shorter, but everything works the same way.

✏️ Click the button below to create a Codespace:

<a href="https://codespaces.new/bitovi/graphql-and-kafka-workshop?devcontainer_path=.devcontainer/102/devcontainer.json"><img src="https://github.com/codespaces/badge.svg" alt="Open in GitHub Codespaces"/></a>

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
      <td>GraphQL 102</td>
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

Codespaces opens port `4001` in a new browser tab, showing **Apollo Sandbox**. If the tab doesn't open, open the **Ports** tab in the Codespace and click the globe icon next to port `4001`.

Leave the server running while you work through the course. It restarts on its own when you save a change.

### When you take a break

GitHub [charges Codespaces use](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) by the hour while a Codespace is running, and personal accounts get a free amount each month. A Codespace stops on its own after [30 minutes without activity](https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces), unless you've changed that setting. To stop it sooner, see [Stopping and starting a codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/stopping-and-starting-a-codespace). Your changes are kept, and you can start it again from the same page.

## Next steps

Next, we'll look at the policyholders, policies, and claims the API starts with.
