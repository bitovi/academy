@page learn-program-management-with-jira/ideas Ideas
@parent learn-program-management-with-jira 4

@description Learn how to add feature ideas to the ideas backlog.

@body


## Overview

The ideas backlog is a collection of rough ideas sorted by expected product value.

<img src="../static/img/program-management-with-jira/exploration-backlog.png"
  style="border: solid 1px black; max-width: 1000px;"/>


## What is the `Ideas Backlog` list?

The `Ideas Backlog` is a list of initiative ideas that stakeholders and the TPO manage. The ideas are not fully refined, and therefore can not be estimated or accurately prioritized. However, this list should be prioritized by which ideas are anticipated to create the most value. The highest priority initiatives should be expected to be further developed and moved into `Refinement`.


## What is the process for sourcing ideas?

Initiatives in the `Ideas Backlog` are just ideas. Anyone can add them at any time. However,
they would ideally be sourced through a __Discovery Workflow__.

<img src="../static/img/program-management-with-jira/continuous-exploration-workflow.png"
	style="border: solid 1px black; min-width: 400px; width: 100%; max-width: 800px"/>

The discovery workflow is a process that looks at:

- Analytics
- Customer feedback
- Competitor research
- User studies

... and synthesizes the quantitative and qualitative data into a picture for the team to think
about and brainstorm.

<img src="../static/img/program-management-with-jira/customer-reports.png"
  style="border: solid 1px black; min-width: 400px; width: 100%; max-width: 800px"/>

The discovery workflow is out of scope for this training.  If you'd like to learn more, please vote for
the [https://github.com/bitovi/academy/issues/386 Product Discovery Process] training.

## Creating ideas in Jira

While ideas can be created at anytime, by anyone.  In order to have a fruitful conversation
around which ideas should prioritized and moved into `Refinement`, it's helpful to have
the value proposition detailed in the initiative. The following is an example
idea that includes RICE scoring.

<div class='jira-issue'>
<p class='jira-title'>Promotions</p>
<div class='jira-description'>

Promotions can have a [large impact on customer purchasing decisions](https://www.inc.com/peter-roesler/new-study-shows-deals-promotions-affect-every-part-of-shopping-experience.html). We should look
to add some sort of promotional offer to increase sales.  

__Impact__

We can either target a new user promotion or
existing customer promotion.  Lets assume it's a promotion for new customers
to help them complete their cart.

- Reach - We see about 1000 abandoned carts a month.
- Impact - Maybe we can convince 5% of those to convert.
- Value Confidence - Our customers have been asking for this. But we haven't done any research. 20% confidence.

<form class='jira-details'>
<div class='jira-label'>Reach</div><div class='jira-value'>1000</div>
<div class='jira-label'>Impact</div><div class='jira-value'>2</div>
<div class='jira-label'>Value Confidence</div><div class='jira-value'>10</div>
<div class='jira-label'>Effort</div><div class='jira-value-none'></div>
<div class='jira-label'>Effort Confidence</div><div class='jira-value-none'></div>
</form>

</div>
</div>

## Prioritization with RICE Scoring

There are many prioritization schemes. For example, you might look into:

- Projected Revenue Upside Score - How much more revenue a feature might generate?
- [Weighted Shortest Job First](https://www.scaledagileframework.com/wsjf/) - What is the cost of delay?

We are using RICE scoring in this training because
it's relatively simple for people to understand and we don't have real-world analytics and
data for people to use. There are various interpretations of RICE scoring (examples:
[Roadmunk's](https://roadmunk.com/guides/rice-score-prioritization-framework-product-management/),
[Intercom's](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/)
). For this training, we will provide the following values:

- `Reach` - How many customers will this project impact over a single quarter?
- `Impact` - How much of an impact will this feature have on users.  This takes on the following "gut" values:
	- 0.5 - Minimal impact
	- 1 - Low Impact
	- 2 - Medium Impact
	- 5 - Large Impact
	- 10 - Massive Impact
- `Value Confidence` - The confidence of the value estimate.  This is a value between 0 and 100%.
- `Effort` - An estimate of engineering time in weeks to complete the feature.
- `Effort Confidence` - The confidence of the effort estimate.


## How to sort the unrefined list?

Once a sprint, this list should be reviewed and reprioritized.






## Exercise

- Come up with some of your own product ideas
- Sort them as a team
- Figure out the customers
