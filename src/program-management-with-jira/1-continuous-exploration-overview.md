@page learn-agile-program-management-with-jira/continuous-exploration Continuous Exploration
@parent learn-agile-program-management-with-jira 1

@description Learn about the Continuous Evaluation workflow and Jira board we use
to take feature ideas and turn them into actionable multi-team plans.

@body

## Overview

In this section, you will learn:

- About Continuous Exploration, a process for identifying which features best
  serve a product and its customers.
- How the Evaluation workflow fits within the overall Continuous Exploration process.
- Learn the basic flow of Continuous Exploration and how it maps to the Jira board we will be using.

For the exercise, you will download the Continuous Exploration process document so you can share it with your team.

The following is the [Google Slides presentation](https://docs.google.com/presentation/d/1I5ePcX45_0au1DqdoDvwjH0J-EGkyASvyOFmEUoPXxk/edit?usp=sharing)
for this material:

<iframe class="iframe-16-9-plus-nav" src="https://docs.google.com/presentation/d/e/2PACX-1vTdT9kQsnZRb4dqBmLKQ26GKqRjA3BtbYTm3UV4_vpbVQ_GjMefbIOGzJYp_mJVixRYEnTc1UPsi8bM/embed?start=false&loop=false&delayms=3000" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>




## Continuous Exploration

<img src="../static/img/program-management-with-jira/departments.png"
  class="content-400-800-shadow"/>

Continuous Exploration is the process of determining which features should be built to
maximize product value and customer success.  The output of the Continuous Exploration
process is the __product backlog__ - a prioritized list of features that represents
the product team’s best guess at how they will achieve their target outcomes.

 Continuous Exploration is a term popularized by
[Scaled Agile](https://www.scaledagileframework.com/continuous-exploration/). The following
is their definition:

> Continuous Exploration (CE) is the process that drives innovation and fosters alignment on what should be built by continually exploring market and customer needs, and defining a Vision, Roadmap, and set of Features for a Solution that addresses those needs.
> © Scaled Agile, Inc.

Bitovi’s Continuous Exploration process is represented by the following two combined workflows:

<img src="../static/img/program-management-with-jira/continuous-exploration/workflow.png"
	class="content-400-800-shadow"/>

The __Discovery Workflow__ looks at data, analytics, customer feedback and competitor research
to source _strong_ feature ideas.

The __Evaluation Workflow__ gets alignment on what the
feature represents and evaluates the costs and benefits of the idea.

Often, these workflows are shared partially across 2 individuals that cooperate closely together:

- A Product Manager, Product Owner, or Product Researcher - responsible
  for the __Discovery Workflow__ and helps evaluate the benefit. They are doing customer
	research, surveying customers, constantly looking at analytics.

- A Program Manager, Delivery Manager or Technical Product Owner (TPO) - responsible for managing how and when features get built. They help define the requirements, and work with engineering teams to estimate work. They also report on the progress of the work.


The __Discovery Workflow__ is out of the scope of this training. This training is largely
focused on the Program Manager, Delivery Manager, or TPO role. So,
we will focus on the __Evaluation workflow__.  

## Evaluation Workflow

The evaluation workflow's goal is to produce a prioritized list of features that represents
the product team’s best guess at how they will achieve their target outcomes. This best guess is
often called the __product backlog__.  In summary, there are four broad steps to produce a prioritized list of features:

1. Define what the feature is.
2. Evaluate and validate the feature’s benefits.
3. Estimate the feature’s costs.
4. Rank the feature against other features.

In the next page, step of the tutorial, an exploration board and workflow to help us manage this process.

## Exploration Board Overview

In the next lesson, we will be setting up a Board in Jira to manage
the exploration process. Let’s take a look at it now to get a sense of it.

It first starts with an ideas space.  This is the `backlog` below:


<img src="../static/img/program-management-with-jira/exploration-backlog.png"
  class="content-400-800-shadow"/>

Team members add their rough ideas into `backlog`. This should be prioritized with the
strongest ideas at the top.  

Once the team has capacity to explore new work, they move those features into
`refinement`.  Anything added to `refinement` above automatically gets added to
`refinement` the board below:

<img src="../static/img/program-management-with-jira/continuous-exploration/kanban-board.png"
  class="content-400-1080-shadow"/>

This board tracks features as they progress from rough ideas to implemented
features available to customers. The following summarizes each column:

- `Refinement` - The _Program Manager_ is working to define the goals of the feature and its specific requirements.
- `Refined` - The feature is defined well-enough for estimation and validation to begin.
- `Estimating / Validating` - The feature is being estimated or validated.
- `Ready` - The feature is _prioritized_ and ready for development.
- `In Progress` - The feature is being developed.
- `QA` - The feature is being tested.
- `UAT` - The feature is being validated against users.
- `Done` - The feature was successfully released to customers.




## Exercise: Share the Workflow

Now that you’ve been introduced to the continuous exploration workflow, its time to get the resource you can use to introduce your team to the process.  Please download the and review the following link: 

[Continuous Exploration Workflow PDF](../static/img/program-management-with-jira/continuous-exploration/continuous-exploration.pdf)

You can use it as a template to establish your team’s continuous exploration process!