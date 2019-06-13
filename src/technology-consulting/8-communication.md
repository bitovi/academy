@page learn-technology-consulting/communication Communication
@parent learn-technology-consulting 8

@description Learn how to write good.

@body

## Overview

## Building Rapport

### Face time

![Office Prank](../static/img/technology-consulting/face-time.gif "Office Prank")

- Meet in person for project kickoff
- Plan travel to the client site
- Video chat

It’s 10x easier to build rapport in person than it is over the Internet. Yes, remote work is easier now than ever, but building a relationship is still much harder when you can’t see the other person.

We’ve found that meeting a person in the first weeks of a project makes the rest of the project go smoother. Find a way to meet in person whenever possible to kick off a project.

### Non-work bonding time

![Get Some Dinner](../static/img/technology-consulting/dinner.gif "Get Some Dinner")

- Get to know people outside of work
- Invite to lunch, drinks, or coffee
- Learn 3 non-work things
- Bring snacks!

When meeting in person, use the opportunity to get to know the person outside work. Ask them to go to lunch, dinner, drinks, or coffee, just to get to know them.

While you’re there, try to learn 3 things about them not at all related to their career. For example:

> Jessica loves flying drones, she’s into home automation platforms, and he has an 8 year old daughter and a newborn.

Buy some healthy snacks, candy, or donuts and bring them into the office. Bribes work!

### Speak up when others are silent

![Obama listening](../static/img/technology-consulting/obama.gif "Obama listening")

- Employees are operating in fear
- Be courageous and speak out
- But still be polite and respectful
- Speaking up develops trust

Employees are often operating in fear. Fear of stepping on someone’s toes, getting reprimanded or fired, saying the wrong thing and feeling embarrassed, etc. Bitovi will never fire an employee for speaking truth to power, so take advantage of it!

Be courageous and speak out openly about the problems you see that stand in the way of success. Organizational problems, dogmatic process, bad UX, etc. Of course be polite and respectful, but don’t be afraid to say what’s wrong.

In the process of speaking honestly, clients tend to develop more and more trust in you, since you’re providing rare insights.

### Be playful to get what you need

![Why so serious?](../static/img/technology-consulting/so-serious.gif "Why so serious?")

- Use humor to be persistent without being annoying
- Good when you’re frustrated or incredulous
- Makes you more relatable and approachable

When bureaucratic red tape stands in the way of progress, don’t take no for an answer. Humor can often be a way to be persistent without being annoying. For example, Justin loves to talk about the time he jokingly told a manager who claimed it would take 4 weeks to get a dev server that he would send an email to Steve Jobs asking him if he thought 4 weeks was an appropriate amount of time. Soon after, he got his devserver.

Using humor in situations where you’re feeling frustrated and incredulous is often an effective way to get what you want while not making people hate you.

## Setting Expectations

```
Expectations - Results = Performance
```

The most basic consulting maxim is to exceed expectations. To say this another way, the best way to get your client to love you is to set low expectations and wildly exceed them. In reality, this means:

- Be careful to never over promise, especially when there are external dependencies or unknowns
- Pad estimates to account for external dependencies and unknowns

### Good, Fast, Cheap ... pick two!

<img src="../static/img/technology-consulting/goodfastcheap.png" alt="Good fast cheap" width="640px"/>


You may have heard the following maxim: cheap, fast, good...pick two. While this may be useful (and true) for sales discussions, a more useful variation for project planning is:


__Scope, resources, deadline ... pick two!__


This means that any project lead or PM can “fix”:

- the scope and resources, but then the deadline must be variable
- the resources and deadline, but then the scope must be variable
- the scope and deadline, but the the amount of resources must be variable

Think of a project as a balloon with three edges. If you squeeze two edges, the third must expand. If you squeeze all three edges, the balloon will pop.

Bad or inexperienced project managers will attempt to tell you that all three factors are already set, and we must “work harder” to meet expectations. This is a trap and we must push back immediately or we’ll be setting ourselves up for failure. No matter how small the project, there must be an opportunity at the start for the team to set at least one of these factors.

### Pushing back

![Shoving people on a train](../static/img/technology-consulting/shove.gif "Shoving people on a train")

- Don’t be a pushover
- Project constraints are not fixed and can be changed!
- Identify the largest problems

Inexperienced consultants tend to be pushovers and think of project constraints as fixed and unchangeable.
Experienced consultants recognize that nothing in a project is truly unchangeable. The key to their success is identifying the largest problems standing in the way of the project success and pushing back on them, as hard as necessary.

### Balancing Progress and Oversight

![Move forward like a shark](../static/img/technology-consulting/shark.gif "Move forward like a shark")

- Always tradeoffs between moving a project forward and client sign-off
- Optimize for progress
- Give stakeholders opportunities to weigh in or course correct
- Document! Document! Document!

There will always be a tradeoff between moving a project forward and getting signoff from a client or stakeholder. You may often deal with clients who say they want to be involved in many layers of decisions but they are so busy or non-responsive that progress becomes blocked waiting for their approvals.
We’ve found the best practice for balancing these concerns is to optimize for progress, but give stakeholders plenty of opportunities to weigh in or course correct. In other words, in most cases, move forward with your best judgement, but visibly document your course via emails or tickets, in a way where clients can step in if they desire.

## Exercise: The Unresponsive Client

You’re in charge of adding a search box to a component. You could build it into the existing grid in a completely abstract way, which would take 5 days, or you could make it work in the way needed for this specific use case, which would take two days. You ask your client which they would prefer but they are in two days of meetings and not replying promptly. This is the most important feature right now, so switching to something else isn’t a viable option.

__What do you do?__

<details>
<summary>
Answer
</summary>

How likely is it that the project will reuse the search feature in a future grid? Let’s for example assume, based on your current knowledge, there’s a less than 25% chance of reuse. Therefore, I would recommend choosing the non-abstract approach, and writing an email, or writing a comment on the ticket tagging your client which summarizes your decision, the reasons for it, and states “I will proceed with this approach, but let me know if you disagree”. Forward progress is being made, but with transparency and giving your client the opportunity to course correct if they have different information.

Principals used:
- Balancing progress and oversight

</details>

## Exercise: Project Planning

Your client informs you that your team will be working on a new feature for your project. They’ve committed to an internal deadline of July 1st, with a non-negotiable set of requirements, and you have a team of yourself and 2 devs to deliver.

__What do you do?__

<details>
<summary>
Answer
</summary>

Let them know that plan is likely untenable, and that you'd like to evaluate the scope before committing to that deadline (otherwise there's risk in not meeting it). Work with them to find a scope that keeps them within their time and staffing constraints. If they are not flexible, explain the scope-resources-deadline trifecta and the risks. Ask them to consider additional resources, or a more flexible deadline.

Principals used:
- The Consulting Trifecta
- Pushing Back

</details>

## Exercise: The Difficult Developer

There is one particularly grumpy client developer that joins your team in the middle of the project. Every idea you propose they argue against. They tend to nitpick all your pull requests with bikeshed-type comments. Recently, they proposed that we rewrite our project in Angular because it's easier to onboard new developers to a popular framework.

__What do you do?__

<details>
<summary>
Answer
</summary>

Reach out to the developer and try to get to know them better. Try to understand their concerns and be flexible when necessary. Do your best to communicate your position and find a way to work together. Bring up your concerns during a team retrospective and try to develop consensus on the best approach. If all of that fails, work with the team lead and the client to mediate and identify the best possible outcome.

Principles used:
- Building rapport
- Pushing back

</details>

## Communication Strategies

The following best practices might seem basic, but surprisingly few people follow through with them. Simply performing “the basics” will make you stand out, ensure clarity and reduce risk of an expectation gap growing over time.

### Successful Meetings

![Meetings are fun](../static/img/technology-consulting/meetings.gif "Meetings are fun")

- Come Prepared
- Take Notes
- Send Recaps
- Take Ownership


Come into a meeting with an agenda. State the agenda at the start so everyone is aware of what you’d like to accomplish. This might include topics of discussion or key questions you’d like to answer.

Simply take notes during calls and meetings. Summarize the “next actions” and make sure its clear who is assigned each action.

Simply send a summary of your notes and next steps out to all stakeholders or attendees. If you’re meeting alone with a client, send it to them.

When appropriate, make it clear that you will complete certain tasks by a certain date.

### Ask Questions

![Confused Puppies](../static/img/technology-consulting/confused-puppies.gif "Confused Puppies")

- Don’t be embarrassed
- Never leave an interaction without fully understanding
- Restate your understanding

Don’t be embarrassed if you don’t understand something. Strive to never leave an interaction without fully understanding what was discussed or how something will work. If you’re unsure, ask to restate a summary of your understanding back and ask for confirmation. Ironically, you never actually sound “dumb” when you ask for clarification or say you don’t understand something, you come off as brave and intelligent.

### State Expectations Explicitly

![tan](../static/img/technology-consulting/tan.gif "tan")

- It’s up to you to add structure to fuzzy situations
- Create a suggested plan, state what you own
- If more discussion needed, ask!

Often, a project or discussion will end without clear roles, responsibilities, or tasks. When that happens, it’s up to you to add structure to these fuzzy edges. Create a suggested plan and state which parts you will take ownership of. Or if more discussion or direction is needed, ask for that.

### Just Care!

![Do I get bonus points?](../static/img/technology-consulting/bonus.gif "Do I get bonus points?")

- Caring takes you from good to great
- People will notice
- Connect with others who care
- Gain respect

As dumb as it sounds, I’ve found that one of the key differences between great consultants and average ones is caring - really caring about making the project successful through any means necessary. Most people just go through the motions. If you care a lot, and you’re not ashamed to show it, people will notice. Other people who also care will be attracted to you and respect you, and doors will tend to open as a result.

## Business Writing



The best business writing puts the onus on the writer instead of the reader. Think hard about your audience, what they know, what they need to know, their time constraints, etc, and make it as easy on them as physically possible. If you follow this principle, you’ll be a very effective communicator.

More often than not, people do the opposite. They write quickly, lazily, and from their perspective, leaving the reader to piece together puzzle pieces before they can understand the context and content of their message. Most people will give up and opt out rather than jump through these hoops, so make it easy on them.

### Optimize For Short Attention Spans

![Good dog](../static/img/technology-consulting/good-dog.gif "Good dog")

- Everyone has these!
- Get to the point
- Be concise, not thorough

Everyone has a short attention span, so get to the point.

The number one mistake I see in business writing (usually emails), is attempting to be thorough and complete instead of concise.

Ironically, your message has its best chance of actually working if you can boil it down to its essence and avoid writing long essays that no one will end up reading.

### Don’t Bury the Lede

![Dogs in sand](../static/img/technology-consulting/dogs.gif "Dogs in sand")

- Journalists write in order of priority
- Most important items first
- Lede = essence of your argument
- People unlikely to dig it out

Journalists usually write their articles (at least in newspapers) in order of priority. They assumed people would read the first paragraph, or maybe the first two or three paragraphs, far more often than the entire article. Therefore, they put the most important summary in the first paragraph, then the second most important point in the second paragraph, etc. This is called “not burying the lede.”

The lede is the summary or the essence of your argument. If you “bury” it under mountains of text, it’s unlikely many people will be able to dig it out.

### Use Whitespace

![Highlighter](../static/img/technology-consulting/highlight.gif "Highlighter")

- Whitespace is pleasing to the eye
- Long blocks lead to abandonment
- Use lists and bullets
- Short paragraphs and sentences
- Break up writing with headings
- __Bold__ and <span style="background-color: yellow">highlights</span> for emphasis


Whitespace is pleasing to the eye and encourages further reading. By contrast, long blocks of text are intimidating and leads to abandonment - whether an article, email, marketing copy, or any form of writing. I’m sure there’s a UX study somewhere to prove this, but until we find it, just take my word for it.

1. Use
2. Lists

And short paragraphs. With short sentences.

- Bullet lists
- Work well
- Too

Break up your writing with headings

Use bold and highlighted words to emphasize the most important parts of your message.

### Executive Summaries / Calls to Action

- Details are still important
- If you can’t be concise, try 3 sections:
  - Exec summary - one sentence
  - Details
  - Recommendation

![This is not a mundane detail](../static/img/technology-consulting/detail.gif "This is not a mundane detail")

In many cases the details are important and can’t be condensed to the brevity you might strive for. In these cases, consider 3 sections to your email:

- The executive summary - one sentence that summarizes the problem
- The details - A longer passage explaining the details
- The recommendation - We’re consultants, so usually it’s appropriate to offer a suggested course of action, even if the ultimate decision is not ours to make

## Exercise: Meeting

You recently attended a meeting where you were asked to discuss a new feature on your project. You started on the work, but today at standup you learned another developer is working on the same feature. Furthermore, your project manager is asking you to attend another meeting today to discuss a different new feature.

__What can you do to make this meeting effective and to avoid this duplicate effort in the future?__

<details>
<summary>
Answer
</summary>

Send out an an agenda in advance of the meeting. Also, explain what happened with the confusion around the previous feature, and that you'd like to agree who will work on this feature at the meeting. During the meeting, ask clarifying questions about the new feature and who is expected to implement it. Offer to take ownership of the feature if appropriate. Take notes about all of this. After the meeting, send out a recap of what was discussed to all of those who attended, making it clear who will be implementing the feature.

Principles used:
- Come prepared (setting an agenda will make the meeting more focussed)
- State expectations explicitly (explaining the confusion from before will help clarify the expectation you want to identify an explicit owner)
- Take notes and send recaps (there's no question of who will be implementing the feature this time)
- Take ownership (your initiative creates less confusion)
- State expectations explicitly (everyone knows that you own this feature)
- Just care (having a clear purpose to the meeting and taking ownership show your dedication to the project)

</details>

## Exercise: Email

Consider the following email:

> Hey everyone,  
> I wanted to make sure we are all on the same page for the navigation projects being delivered. It was recently brought to my attention that the delivery dates for navigation are as follows:
>- Rates & Fees: ~June 27th
>- Report Overview: ~July 2nd
>
> It is my understanding that this is a polished UI experience with service integration, prepared for the next phase of testing. The team working on Report Overview is slated to meet their deadline, from the UI perspective and has already met many times with the business analysts to iron out specific details and behaviors. However, I am concerned that Rates & Fees will miss the June 27th deadline. Dedicated development started on Rates & Fees on June 2nd, with UI development starting June 9th. Dedicated development refers to team resources working full time on this project, not including Srini and I’s proof of concept.  
> Starting development this late, does not give the required time for UI testing and verifying the business requirements in order to deliver a solid application. I had hoped that a missed deadline would not occur while I was assisting in development, but I must stress the importance on starting early. The delay in starting Rates & Fees has led us to this point.
> Note, I will continue to assist Sanjay in developing the UI for Rates & Fees, but would like to open a discussion on what steps we need to take to get this project back on track.


__What do you think the biggest problems are with it?__

Once you’ve identified those problems, try to rewrite it to solve those problems.


<details>
<summary>
Answer
</summary>

> Hey everyone,  
>
> I am concerned that Rates & Fees will __miss__ the June 27th deadline. Let's discuss how we can address this concern at today's standup.
>
> This is mainly due to the fact that full time dev didn't begin until June 2nd, which doesn't give us enough time for QA and verification. Unfortunately, I only learned about this deadline very recently, or I would have notified you sooner.

Principles used:
- Optimize for a short attention span (condensed from 5 paragraphs to 2)
- Don’t bury the lede (the point of the email is stated first)
- Use whitespace (separating the first sentence from the rest makes the point clearer)
- Use bold to emphasize the most important parts of your message (need to discuss this ASAP, so highlight the call to action)
- Exec summaries and calls to action (it's clear what the next step is)

</details>

## Exercise: More Email

Improve the following email:


> Hi Ravi,
>
> I felt that David wasn't being very articulate as to why he needed access to Google Analytics so I gave him a call. I didn't think he was being clear so I wanted to clarify with him before we made any decisions At first I didn't quite understand his reasoning but after my phone call with him I changed my mind. I think it would be a good idea to give our designer access to Google Analytics. I think David would be more receptive to me and we could better communicate on issues and how to solve them.


<details>
<summary>
Answer
</summary>

> Hi Ravi,
>
> I think we should give David access to Google Analytics. I think it would be a good idea for 2 reasons:
> 1. He would be more receptive if he could see how his work was affecting the site (such as testing out the conversion rate of design changes to the contact form, etc).
> 2. We could work better and at a faster pace when solving issues (For example, for the month of June, 87 people came to the Contact Us page but only about 13 people filled out a form. If David had firsthand access to this information, we could work together to debug that issue quicker).
>
> Do you agree?

Principles used:
- Don’t bury the lede (the point of the email is stated first)
- Use lists (the reasons are easier to see)
- Exec summaries and calls to action (the email is easy to follow)

</details>

## Exercise: Organizing

Consider the following thoughts. Find a way to organize this into relevant categories, and highlight the most important parts.

> - Major homepage dev is complete and on time. Play with the demo here
> - Minor bugs remain, listed here
> - The QA team will start working on this page today
> - We still don't have a full QA server or timeline. If we don't have it by end of week, we'll be a week behind on our timeline. Who will own this?
> - We can't test the logged in views of the homepage without a QA server.
> - Even though the homepage and locator will be done and ready to deploy before the production servers are available, we decided we'll still deploy Club Locator first (maybe by only a few days) to minimize risk on a lower visibility page.
> - This means we'll be maintaining separate code branches for the locator release and the Locator+Homepage release. This is why we'll have Homepage on one server - http://samsminor.herokuapp.com - and locator on another - http://samsminor.herokuapp.com


<details>
<summary>
Answer
</summary>

> Blockers
> - We still don't have a full QA server or timeline. If we don't have it by end of week, we'll be a week behind on our timeline. Who will own this?
> - We can't test the logged in views of the homepage without a QA server.
>
> Status
> - Major homepage dev is complete and on time. Play with the demo here.
> - Minor bugs remain, listed here
> - The QA team will start working on this page today
>
> Discussion
> - Even though the homepage and locator will be done and ready to deploy before the production servers are available, we decided we'll still deploy Club Locator first (maybe by only a few days) to minimize risk on a lower visibility page.
> - This means we'll be maintaining separate code branches for the locator release and the Locator+Homepage release. This is why we'll have Homepage on one server - http://samsminor.herokuapp.com - and locator on another - http://samsclub.herokuapp.com
>

Principles used:
- Use bullets (thoughts are organized by topic)
- Use bold to emphasize the most important parts of your message (the most important piece is highlighted)

</details>
