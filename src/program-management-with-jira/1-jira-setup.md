@page learn-program-management-with-jira/jira-setup Setup a Continuous Exploration Board
@parent learn-program-management-with-jira 1

@description Learn to setup an exploration board in Jira

@body

## Overview

<img src="../static/img/program-management-with-jira/exploration-backlog.png"
  style="border: solid 1px black; max-width: 400px;"/>

<img src="../static/img/program-management-with-jira/exploration-board.png"
  style="border: solid 1px black; max-width: 400px;"/>

## Create the projects

## Create the Initiative issue type




<img src="../static/img/program-management-with-jira/issue-hierarchy.png"
  style="border: solid 1px black; max-width: 400px;"/>


[Rice](https://roadmunk.com/guides/rice-score-prioritization-framework-product-management/)

- Create an initiative
  - Put it above epic
  - Check that you can make it
  - Add custom fields
    - Reach
    - Impact
    - Value Confidence 
    - Effort
    - Effort Confidence


## Create the exploration workflow

- Create the workflow
  - Download


- Or create the workflow


1. Idea (remove open)
2. Refinement
3. Refined
4. Estimating
5. Validating
6. Ready
7. In Progress
8. Done


Add workflow:

<img src="../static/img/program-management-with-jira/add-workflow-1.png"
  style="border: solid 1px black; max-width: 400px;"/>



<img src="../static/img/program-management-with-jira/add-workflow-2.png"
  style="border: solid 1px black; max-width: 400px;"/>

<img src="../static/img/program-management-with-jira/add-workflow-3.png"
  style="border: solid 1px black; max-width: 400px;"/>


<img src="../static/img/program-management-with-jira/add-workflow-4.png"
  style="border: solid 1px black; max-width: 400px;"/>



Test creating an initiative

Relate initiatives and epics.

<img src="../static/img/program-management-with-jira/parent-link.png"
  style="border: solid 1px black; max-width: 400px;"/>



## Create a board

### Create the filter

Create a filter that only shows initiatives.

- Make sure it's sorted by rank `ORDER BY Rank ASC`

<img src="../static/img/program-management-with-jira/create-filter.png"
  style="border: solid 1px black; max-width: 400px;"/>


- save filter, make sure other folks can access

<img src="../static/img/program-management-with-jira/filter-access.png"
  style="border: solid 1px black; max-width: 400px;"/>

### Actually Create the board

Create a board from the filter

<img src="../static/img/program-management-with-jira/create-board.png"
  style="border: solid 1px black; max-width: 400px;"/>


### Configure Columns

<img src="../static/img/program-management-with-jira/configure-columns.png"
  style="border: solid 1px black; max-width: 400px;"/>
