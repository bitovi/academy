



## Overview 

0. Make sure you have estimated an epic's initiative 

   - 

1. Create boards and sprints for each product team

2. Add the boards as a source to the plan 

3. Create shared teams for each product team

4. Create a plan team for each product team

5. Assign each epic to its plan team

6. Rank the plan’s epics

7. Schedule the epics


issuekey in portfolioChildIssuesOf("ITSY-2") AND issueType = Epic

issuekey in portfolioChildIssuesOf("ITSY-2") AND issueType = Epic


1. Show there's no "story points"
2. Open the statistical editor 
   25 points Store (per epic)
   20 points Order

3. Open the autoscheduler
3. Update the story points
4. Update the timing


Now that we've laid out the epics, we want to calculate the worst-case timing for the work
so we can properly estimate the work.

To do this, we need to calculate the "adjusted" story points.

In the previbous video, we showed how to create epics with a story point median and confidence.

And, we showed how to create dependencies between epics.

In this video, we will show how to turn these individual statistical estimations into a 
worst-case plan for the initiative as a whole.  

We will have some help from a few tools to explain the statistics.

Lets get started.





=======

In the last video, to be able to see 
dependencies between epics, we made each epic 
2 weeks in length, regardless of what was estimated.

[ show result of last time ]

Now we want to make each of these epics the right size 
in terms of time.

For example, "Add a promotion to cart" was estimated 
at 30 points and only 50% confident. 



If we want to provide enough time to be 90% likely 
the work will complete, we need to adjust those 30 points 
to something like 70 points and give the team 7 weeks 
to complete the work.

[ show making "add promotion to cart" bigger]


We are going to show how to calculate the points 
adjustment and also turn those points into a time range.

We will use those time ranges to plot the epics and 
arrive at estimated work for our initiaitve.
We will use that estimated work to help prioritize 
our initiatives. We will also use the plot to investigate 
ways to shorten the amount of work we need to do 
"aka break the long poles".

Let's take a look at how to adjust the number of points.

This "Statistical Estimator" can take an estimate, 
a confidence, and provide an adjusted estimate.

For example, if someone is 50% confident something is going to take 10 days, this tool calculates you need to give 25 days 
to have a 90% chance the work will complete 25 days or earlier.

The tool uses a log-normal distribution to calculate 
these adjustments.  For more background, there is an article 
linked in the app and in the video.

We need to configure the tool to use story points.

But, to use story points, we need to 

We will use a tool that can take an estimate, a confidence 
of the estimate, and provide an adjusted estimate that
incor

=====

To calculate velocity, you can use Jira's velocity report.

Checkout the link below for more information on how to calculate velocity.

As ITSY Bitsy is made up, we're going to say that 
order has a velocity of 25 points per sprint
and store has a velocity of 20 points per sprint


Let's calculate the adjusted story points for "Order's 'add a promotion to the cart'" epic.

I'll change the sprint velocity to 25. I also want to output the number of story points.

Now I will put in 30 for the average story points and 50 for the confidence and we get a 
 76 story points for a 90% likelyhood threshold.

I'll enter that in Advanced Roadmaps.

This tool can also provide the number of working days the work will take, including 
giving an end date if a start date is given.

I'll put in the current start date of Nov 2 and see what the end date will be ...

====

I'll update the epic's timing to match and end on december 13th.  

Now we need to do this for the rest of the estimated epics.  Fortunately, we 
have another tool that can do this process in bulk.



we need to give something like 

STORE: 20
ORDER: 50 / 2