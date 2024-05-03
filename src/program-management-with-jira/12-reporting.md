@page learn-agile-program-management-with-jira/reporting Reporting
@parent learn-agile-program-management-with-jira 12

@description Learn how to report on high-level status using Jira as the source of truth. 

@body

Overview
--------

Both teams and stakeholders need a sense of timing. Teams need to know when work will complete so they can coordinate effectively. Stakeholders want a sense of timing to weigh cost benefits or be able to assist if work is not progressing smoothly.

For timing, it’s critical to keep Advanced Roadmap the source of truth. But, Advanced Roadmap is not something that everyone on the team will be comfortable looking at:

<img src="../static/img/program-management-with-jira/reporting/big-roadmap.png"
  class="content-400-800-shadow"/>

There’s too much data! Furthermore, Advanced Roadmap does not convey details about how timing has changed.

In this training, we will learn to use the “Timeline Report”. A tool created by Bitovi to generate simplified reporting from Advanced Roadmaps.

There is an initiative view:

<img src="../static/img/program-management-with-jira/reporting/initiative-report.png"
  class="content-400-800-shadow"/>

Notice, the report:

*   Can break out Dev, QA, and UAT timing
    
*   Can indicate which initiatives are delayed
    

For projects that operate with Releases, “Timeline Report” includes a release view:

<img src="../static/img/program-management-with-jira/reporting/release-report.png"
  class="content-400-800-shadow"/>

The following sections detail:

*   Why it’s critical to keep Jira the source of truth
    
*   Some general guidelines on how the “Timeline Report” behaves
    
*   How to make initiatives take on different statuses
    
*   How to break out the initiative timing to show dev, qa, and uat timing
    
*   How to report on release timing
    

Let’s learn how to use the “Timeline Report” and why!


The following is the [Google Slides presentation](https://docs.google.com/presentation/d/1zvMxqCu7h_hDpCP-SM6cNXWUbzasTbVqoKq2cTpOErU/edit?usp=sharing)
for this material:

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRu7fc5Ak81pr_sia28FrLKPwY_0XsNEAOSU4M_2goUXuiSOw0MqnqUiRynodZfn4AmySWs63z0meXw/embed?start=false&loop=false&delayms=3000" frameborder="0" class="block-16-by-9" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>



Keeping Jira the Source of Truth
--------------------------------

Too often, Program Managers spend a lot of time gathering dates, times, and statuses from various project teams and assembling them into something a wider audience, typically stakeholders and senior management can understand. This often expresses itself as a PowerPoint slide at a [SteerCo](https://www.projectmanager.com/blog/steering-committee-definition) meeting.

At best, the time spent producing the PowerPoint slide is inefficient. At worst, the PowerPoint slide becomes the source of truth and limits time spent maintaining and improving the more valuable representation of the plan - the Advanced Roadmap plan.

Timeline Report Guidelines
--------------------------

The Timeline Report’s goal is to help present a simplified representation of the work being done or going to be done. By simplifying, there can sometimes be a conflict between data. For example:

*   An initiative could be put in a “QA” status, but the development epics are still in progress.
    
*   An epic could be “in progress”, but its start date is in the future
    

When this happens, the tool will provide a browser-console warning about the miss-match:

<img src="../static/img/program-management-with-jira/reporting/release-in-each-status.png"
  class="content-400-800-shadow"/>

A primary goal of the “Timeline Report” is to keep the timeline up to date, so when there are conflicts between statuses and the `start date` and `due dates`, the dates win. For example, all epics with a `due date` less than the current date will be treated as “complete”.

Connecting the Timeline Report to your Jira instance
----------------------------------------------------

The timeline report can be found at [https://timeline-report.bitovi-jira.com/](https://timeline-report.bitovi-jira.com/) . To use it:

1.  Go to [https://timeline-report.bitovi-jira.com/](https://timeline-report.bitovi-jira.com/) . The site will redirect to Jira to authenticate the app to read data.
    
2.  Select the Jira instance you would like the app to connect to:  
    
    <img src="../static/img/program-management-with-jira/reporting/pick-site.png"
  class="content-400-800-shadow"/>
    
      
    Notice: The app only has “read” access. Furthermore, it does not save any data.
    
3.  Click “Accept” and you will be redirected back to the Jira app.
    

Change the Reported Status from “Not Started” to “On Track”
-----------------------------------------------------------

**Given**: A timeline like:

<img src="../static/img/program-management-with-jira/reporting/starting-timeline.png"
  class="content-400-800-shadow"/>

It will produce a report like:

<img src="../static/img/program-management-with-jira/reporting/starting-report.png"
  class="content-400-800-shadow"/>

**Steps**: Move an epic’s start date before the current date:

<img src="../static/img/program-management-with-jira/reporting/move-this-epic.png"
  class="content-400-800-shadow"/>

**Result**: The initiative shows up as “on track” as follows

<img src="../static/img/program-management-with-jira/reporting/on-track.png"
  class="content-400-800-shadow"/>

Change the Reported Status to “Behind”
--------------------------------------

**Given**: The previous timeline.

**Steps**: Move an epic so the initiative’s timeline will be delayed

<img src="../static/img/program-management-with-jira/reporting/delayed.png"
  class="content-400-800-shadow"/>

**Result**: The initiative will be displayed as delayed

<img src="../static/img/program-management-with-jira/reporting/delayed-report.png"
  class="content-400-800-shadow"/>

The timer can be used to control the reference point to determine if the initiative is delayed:

<img src="../static/img/program-management-with-jira/reporting/compare-to-zero.png"
  class="content-400-800-shadow"/>

Change the Reported Status to “Blocked”
---------------------------------------

**Given**: The previous timeline.

**Steps**:

1.  Add a blocked status to your epics
    
2.  Set the status to blocked:  
    
    <img src="../static/img/program-management-with-jira/reporting/blocked-epic.png"
  class="content-400-800-shadow"/>

**Result:**  
The reported status is shown as blocked.

<img src="../static/img/program-management-with-jira/reporting/blocked-report.png"
  class="content-400-800-shadow"/>

Change the Reported Status to “Complete”
----------------------------------------

**Given**: The previous timeline.

**Steps**: Move all of the initiative’s epics to complete before the current time.

<img src="../static/img/program-management-with-jira/reporting/complete-epic.png"
  class="content-400-800-shadow"/>

**Result**: The initiative is shown as “complete”:

<img src="../static/img/program-management-with-jira/reporting/complete-report.png"
  class="content-400-800-shadow"/>

Show a Development, QA, and UAT breakout
----------------------------------------

It can be nice to see an initiative’s timing as it flow from development, to QA (testing), and finally to User Acceptance Testing (UAT).

**Given**: The previous timeline.

**Steps**:

1.  Create epics with a QA and UAT label.  
    
    <img src="../static/img/program-management-with-jira/reporting/qa-and-uat-labels.png"
  class="content-400-800-shadow"/>
      
    Note: Epics without a QA or UAT label are assumed to be development epics.  
    
2.  Select the “Work breakdown” option
    
    <img src="../static/img/program-management-with-jira/reporting/check-breakout.png"
  class="content-400-800-shadow"/>

**Result**: The Dev, QA, and UAT epics timelines are reported individually.

<img src="../static/img/program-management-with-jira/reporting/phase-breakout.png"
  class="content-400-800-shadow"/>

  
Role Up Into Releases
------------------------

In some organizations, multiple initiatives are released together as part of a “Release”. The “Jira Timeline” can report release timings as well.

**Given**: The previous timeline.

**Steps**:

1.  Create a release  
    
    <img src="../static/img/program-management-with-jira/reporting/create-release.png"
  class="content-400-800-shadow"/>
    
2.  Add the release to your initiatives.  
    
    <img src="../static/img/program-management-with-jira/reporting/label-release.png"
  class="content-400-800-shadow"/>
    
3.  Click “show releases”  
      
    <img src="../static/img/program-management-with-jira/reporting/show-releases.png"
  class="content-400-800-shadow"/>

**Result**: The initiatives are shown as part of a release. Add more releases and initiatives to releases to see additional releases.

<img src="../static/img/program-management-with-jira/reporting/releases-report.png"
  class="content-400-800-shadow"/>

Exercise
--------

In these exercises, you will learn how to change your initiative’s epics so they are reported with the “Timeline Report”.

### Step 1: Make your initiative appear as “not started”

Connect your Jira instance to the “Timeline Report”. Ensure your Initiative is visible.

### Step 2: Add QA and UAT epics

Add QA and UAT epics to your initiative. Make the timeline show the QA and UAT breakout.

### Step 3: Create Releases

Create releases and decide which initiative belongs to which release. Hopefully there are at least 4 initiatives. Each release can have its own initiative.

### Step 4: Stagger Releases

Decide which release (and therefore initiatives) should be in which reported status:

*   Not Started
    
*   In Development
    
*   In QA
    
*   In UAT
    

Each team member should try to time their epics so each reported release status is present. That is:

*   There should be one release where `dev=not started`, `qa=not started`, `UAT=not started`
    
*   There should be one release where `dev=in progress`, `qa=not started`, `UAT=not started`
    
*   There should be one release where `dev=completed`, `qa=in progress`, `UAT=not started`
    
*   There should be one release where `dev=completed`, `qa=completed`, `UAT=in progress`
    

It will look something like:

<img src="../static/img/program-management-with-jira/reporting/release-report.png"
  class="content-400-800-shadow"/>