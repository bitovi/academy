@page learn-agile-program-management-with-jira/advanced-roadmap-setup Advanced Roadmap Setup
@parent learn-agile-program-management-with-jira 7

@description Learn how to set up Jira’s Advanced Roadmap

@body

## Overview

Jira’s [Advanced Roadmap](https://www.atlassian.com/software/jira/guides/advanced-roadmaps/overview#what-are-scenarios-in-advanced-roadmaps) feature enables the coordination of timelines across multiple projects and teams. We will use Advanced Roadmaps as part of the upcoming [learn-agile-program-management-with-jira/estimating],  Scheduling, and Managing training pages.  

We will learn how to set up an Advanced Roadmap plan that shows all initiatives that are in the estimating phase and later. The plan will also be able to:

- show epics and stories under those initiatives
- show the "Story points median" and "Story points confidence" fields we will use to estimate work

<img src="../static/img/program-management-with-jira/advanced-roadmap/advanced-roadmap.png"
  class="content-400-1080-shadow"/>

## Creating an Advanced Roadmap Plan

The following video creates a filter and then an Advanced Roadmap plan. 
The video walks through these 4 steps:

1. Make sure you have an initiative between _Refined_ and _Done_ 
   
2. <code>[0:12](https://youtu.be/MJKAFeN4BjM?list=PL--xV5crGpX_EdvA-rcDXVC4qjiujYTKE&t=12)</code> Create a filter that returns initiatives after _Refined_ and returns all other 
   issue types.

   Name the filter: _Initiatives in Estimating and beyond AND all other issue types_
   
   Use the following JQL:

   ```
   ( issueType = Initiative and status not in (Idea, Refinement, Refined) ) OR (issueType != Initiative) ORDER BY Rank ASC
   ```

3. <code>[1:46](https://youtu.be/MJKAFeN4BjM?list=PL--xV5crGpX_EdvA-rcDXVC4qjiujYTKE&t=106)</code> Make sure other people can view and edit the filter

4. <code>[2:11](https://youtu.be/MJKAFeN4BjM?list=PL--xV5crGpX_EdvA-rcDXVC4qjiujYTKE&t=131)</code> Create a plan

5. <code>[2:50](https://youtu.be/MJKAFeN4BjM?list=PL--xV5crGpX_EdvA-rcDXVC4qjiujYTKE&t=170)</code> Configure the plan to use story points

6. <code>[3:02](https://youtu.be/MJKAFeN4BjM?list=PL--xV5crGpX_EdvA-rcDXVC4qjiujYTKE&t=182)</code> Add the "Story points median" and "Story points confidence" fields to the plan

7. <code>[3:22](https://youtu.be/MJKAFeN4BjM?list=PL--xV5crGpX_EdvA-rcDXVC4qjiujYTKE&t=202)</code> Verify the plan is working


<iframe class="iframe-16-9" src="https://www.youtube.com/embed/MJKAFeN4BjM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>