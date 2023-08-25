@page learn-agile-program-management-with-jira/advanced-roadmap-setup Advanced Roadmap Setup
@parent learn-agile-program-management-with-jira 7

@description Learn how to set up an advanced roadmap.

@body

## Overview


## Creating a filter that only shows estimated work and beyond 

All epics and stories are ok ...

1. Make sure you have an initiative in _estimating_ (or _In Progress_)
   ```
   ( issueType = Initiative and status not in (Idea, Refinement, Refined) ) OR (issueType != Initiative) ORDER BY Rank ASC
   ```
2. Create the filter
3. Make sure other people can see the filter 


## Creating the Plan

1. Set the source
2. Set as story points
3. Add custom fields
4. Verify it's working
