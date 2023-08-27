@page learn-agile-program-management-with-jira/managing Managing
@parent learn-agile-program-management-with-jira 13

@description Learn how to manage a program's active work.

@body


Overview
--------

Once you have a plan, you must help coordinate and report on the plan. You will learn:

*   When to schedule planning ceremonies to coordinate multiple product teams.
    
*   How to run the planning ceremony.
    
*   How to set up release reporting.
    

When to schedule team coordination meetings
-------------------------------------------

We believe there are many different ways of managing product teams, not limited to two-week scrum-style sprints. That being said, two-week sprints are the baseline we will use for part of the training, as two-week sprints are the most common pattern we see.

For two-week product scrum teams, we strongly suggest breaking up the Sprint Planning meeting into two meetings, separated by at least one day for grooming. A two-week sprint might look like:

<table>
<thead>
<tr><th></th><th><strong>M</strong></th><th><strong>Tu</strong></th><th><strong>W</strong></th><th><strong>Th</strong></th><th><strong>F</strong></th></tr>
</thead>
<tbody style="vertical-align: top"><tr><th><p><strong>Week 1</strong></p></th><td><p>Sprint Start</p></td><td><p></p></td><td><p></p></td><td><p></p></td><td><p></p></td></tr><tr><th><p><strong>Week 2</strong></p></th><td><p></p></td><td><p><strong>Sprint Prototyping</strong></p></td><td><p>Grooming</p></td><td><p>Grooming</p></td><td><p><strong>Sprint Planning</strong></p></td></tr></tbody></table>

The two meetings are:

*   Sprint Prototyping - Product teams meet to roughly plan out their sprint.
    
*   Sprint Planning - Product teams meet to commit to a sprint.
    

We split out these meetings to enable more efficient sprint planning and give time for grooming. The reasons are beyond the scope of this training. If you would like to know more about how Bitovi manages a single team, please vote for “Agile Project Management with Jira”.

When multiple teams use the calendar above, we suggest adding an additional meeting between Sprint Prototyping and Sprint Planning: <span class="color-purple bold">Program Sprint Planning</span>. For example, it might be scheduled the day after Sprint Prototyping as follows:

<table>
<thead>
<tr><th></th><th><strong>M</strong></th><th><strong>Tu</strong></th><th><strong>W</strong></th><th><strong>Th</strong></th><th><strong>F</strong></th></tr>
</thead>
<tbody style="vertical-align: top"><tr><th><p><strong>Week 1</strong></p></th><td><p>Sprint Start</p></td><td><p></p></td><td><p></p></td><td><p></p></td><td><p></p></td></tr><tr><th><p><strong>Week 2</strong></p></th><td><p></p></td><td><p>Sprint Prototyping</p></td><td><p><strong>Program Sprint Planning</strong><br>Grooming</p></td><td><p>Grooming</p></td><td><p>Sprint Planning</p></td></tr></tbody></table>

The Program Sprint Planning meeting is used to align multiple product teams on the delivery plan and make any adjustments necessary to the delivery plan.

The sequence of:

1.  Individual product team Sprint Prototyping
    
2.  Combined <span class="color-purple bold">Program Sprint Planning</span>
    
3.  Individual sprint planning
    

… is an efficient and “product team-led” method for coordinating multiple teams. It established the following workflow:

1.  Individual teams connect and discuss their plans and need for the following sprint
    
2.  Teams meet and communicate plans, status and needs for the following sprints, enabling teams to make adjustments to their sprint plans.
    
3.  Individual teams commit to their work.
    

This sequence is somewhat similar to a two-phased commit protocol. [https://en.wikipedia.org/wiki/Two-phase\_commit\_protocol](https://en.wikipedia.org/wiki/Two-phase_commit_protocol)

Structuring Program Sprint Planning Meetings
--------------------------------------------

The goal of <span class="color-purple bold">Program Sprint Planning</span> is to:

1.  Ensure teams are effectively coordinating their work
    
2.  To update the roadmap for future coordination and reporting needs
    

Furthermore, <span class="color-purple bold">Program Sprint Planning</span> meetings should have a high “signal to noise” ratio. This means that people should be discussing what’s important to the product and important to themselves. This is particularly challenging for <span class="color-purple bold">Program Sprint Planning</span> because there are often many topics to discuss, and the chances that every participant is necessary for every conversation are very low.

For this reason, we strongly encourage two changes to how typical “scrum of scrum” meetings are held:

*   Meetings should be organized around initiatives, not teams. Instead of each team giving its status (and the other teams potentially not paying attention), the meeting should discuss initiative by initiative.
    
*   A time-boxed agenda should be created and shared beforehand, with specific people listed to specific time-slots.
    

Preparing for Program Sprint Planning
-------------------------------------

A few days before <span class="color-purple bold">Program Sprint Planning</span>, create a program sprint planning document and share it with the team leads. The document looks as follows:

<a href="../static/img/program-management-with-jira/managing/example-program-sprint-planning.pdf">

<img src="../static/img/program-management-with-jira/managing/example-program-sprint-planning.png"
  class="content-400-800-shadow"/>
</a>
    

This document is sorted by initiatives release date and grouped by releases and/or milestones. For each initiative, specify the following:

*   `1:20` - a time when discussion on that initiative will take place
    
*   👥 - the people who should attend a discussion on that initiative
    
*   🛑 - blockers preventing or delaying the delivery of the initiative
    
*   📝 - any other notes on timing or activity surrounding the initiative
    

The document also includes:

*   An _Action Items_ section for listing important tasks people should follow up on.
    
*   A _Continuous Exploration_ section for sharing status and prioritizing the exploration board.
    

After creating the document, you will need to:

*   Share the document with attendees
    
*   Remind attendees which parts of the meeting they should attend
    

Running Program Sprint Prototyping
----------------------------------

1.  Go through the initiatives, starting with the closest to delivery
    
    1.  Go through each epic
        
        1.  Get the status of the epic. Update the `status` and `startDate` and `endDate`
            
        2.  Update the document with any new info.
            
        3.  Take action items
            
            1.  Todos
                
            2.  New stories that need to be created?
                
2.  Go through the CX board.
    
    1.  Discuss how initiatives are progressing. Start with the “right”, work “left”
        

### After the meeting

1.  Share a summary of the meeting in slack
    

Exercise
--------

### Step 1: Create the Program Sprint Planning Document

Using the template above, create a program sprint planning document. Create and share an agenda.

### Step 2: Run Program Sprint Planning

Run a mock sprint planning, sharing status on each initiative.