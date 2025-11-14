@page learn-agile-program-management-with-jira/continuous-exploration-board Continuous Exploration Board
@parent learn-agile-program-management-with-jira 3

@description Learn to set up a Continuous Exploration 
exploration board in Jira. On the way, we will learn how to create
custom issue types, custom workflows, and custom fields.

@body

## Overview

Continuous Exploration replaces a traditional waterfall approach of up-front, rigid requirement definitions with a process that generates a consistent flow of features ready for implementation in the backlog. 

In this section, you will learn the steps required to set up a Continuous Exploration board.  It allows people to put any ideas they have into a backlog:

<img src="../static/img/program-management-with-jira/exploration-backlog.png"
  class="content-400-800-shadow"/>

And work through those ideas in a workflow:

<img src="../static/img/program-management-with-jira/exploration-board.png"
  class="content-400-800-shadow"/>

To do create the Continuous Exploration board, we will:

1. Create the Initiative issue type and add it to the issue type hierarchy
2. Create the Continuous Exploration workflow
3. Create the Continuous Exploration Board

Finally, to prepare for estimation and validation, we will:

1. Add the `Value`, `Value confidence`, `Story points median` and `Story points confidence` Custom Fields



## Create the Initiative issue type


The following video shows how to:

1. Create an `Initiative` issue type with a description of:

   _An outcome-focused feature or effort that can span multiple product teams._
2. <code>[0:57](https://youtu.be/rBYxqhNGGmQ?t=57)</code> Place Initiatives above Epics in the "Issue type hierarchy".
3. <code>[1:31](https://youtu.be/rBYxqhNGGmQ?t=91)</code> Add Initiatives to the right Schemes
4. <code>[1:57](https://youtu.be/rBYxqhNGGmQ?t=117)</code> Verify we can create an Initiative
5. <code>[2:37](https://youtu.be/rBYxqhNGGmQ?t=157)</code> Enable epics to link to a parent initiative.

<iframe class="iframe-16-9" src="https://www.youtube.com/embed/rBYxqhNGGmQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Create the Continuous Exploration workflow

The following video shows how to:

1. Create a new workflow with a name of _Continuous Exploration_ and a description of:

   _Determine what should be built to maximize product value and customer success._

2. <code>[0:49](https://youtu.be/QZzKaGHZ54o?t=49)</code> Create the statuses for the workflow. Status __names__, `{category}` and descriptions are:

   - __Idea__ `{To Do}` - A feature idea or outcome to explore
   - __Refinement__ `{To Do}` - Determining the goals of the initiative and its broad requirements
   - __Refined__ - `{To Do}` The initiative is defined well enough for estimation and validation
   - __Estimating__ `{To Do}` - Estimating how long the initiative will take
   - __Validating__ `{To Do}` - Gathering evidence the initiative will be successful
   - __Ready__ `{To Do}` - Ready for development, but not started
   - __In Progress__ `{In Progress}` - The initiative is being developed
   - __QA__ `{In Progress}` - The feature is being tested
   - __UAT__ `{In Progress}` - The feature is being tested against users
   - __Done__ `{Done}` - The feature is released to customers

3. <code>[3:12](https://youtu.be/QZzKaGHZ54o?t=192)</code> Ensure new initiatives will be give the __Idea__ status

4. <code>[3:36](https://youtu.be/QZzKaGHZ54o?t=216)</code> Associate initiatives with the Continous Exploration workflow

<iframe class="iframe-16-9" src="https://www.youtube.com/embed/QZzKaGHZ54o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Create the Continuous Exploration board

The following video shows how to:

1. Create a Filter showing only Initiatives. The query should be:

   ```
   issueType = Initiative ORDER BY Rank ASC
   ```

2. <code>[1:21](https://youtu.be/65C9f6OR4G0?t=81)</code> Create a Kanban Board sourced from the Filter
3. <code>[2:05](https://youtu.be/65C9f6OR4G0?t=125)</code> Create the Boards Columns with the following names:
   
   _Refinement, Refined, Estimating / Validating, Ready, In Progress, QA, UAT, Done_
   
4. <code>[2:58](https://youtu.be/65C9f6OR4G0?t=178)</code> Add statuses to the right columns. The "Column to Status" mapping is as follows:

   - _Kanban Backlog_ - `IDEA`
   - Refinement - `Refinement`
   - Refined - `Refined`
   - Estimating / Validating - `Estimating` and `Validating`
   - Ready - `Ready`
   - In Progress - `In Progress`
   - QA - `QA`
   - UAT - `UAT`
   - Done - `Done`

5. <code>[4:00](https://youtu.be/65C9f6OR4G0?t=240)</code> Fixing duplicate statuses

<iframe class="iframe-16-9" src="https://www.youtube.com/embed/65C9f6OR4G0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Adding Custom Fields

The following video demonstrates how to create four custom fields. For _Initiatives_ we will create:

- `Value` - Estimated business value in dollars.
- `Value confidence` - Confidence in the business value, provided as a percentage

For _Epics_ we will create:

- `Story points median` - Average number of story points needed to complete the work
- `Story points confidence` - Confidence of the "Story points median", provided as a percentage

To create these custom fields, the video walks through these 4 steps:

1. Create custom fields
2. <code>[1:16](https://youtu.be/SUcM798b9-w?t=76)</code> Assign to custom fields to a context
3. <code>[3:06](https://youtu.be/SUcM798b9-w?t=186)</code> Update screens to show custom fields
4. <code>[4:19](https://youtu.be/SUcM798b9-w?t=259)</code> Verify custom fields are working


<iframe class="iframe-16-9" src="https://www.youtube.com/embed/SUcM798b9-w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
