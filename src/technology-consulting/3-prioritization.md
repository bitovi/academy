@page learn-technology-consulting/prioritization Informed Prioritization
@parent learn-technology-consulting 3
@outline 3

@description Learn how to decide what should be built.

@body

## Overview

The goal of technology consulting is to deliver value to
your clients. This usually means successful products. Figuring out
what should be done is the first and most critical step toward
successful outcomes. This article goes over a wide variety of
approaches, process, and techniques that help discover and
prioritize what should be done.

## Checklist

Developing a viable product is one of the most difficult challenges
anyone will undertake. However, there are some processes that
**must** be followed to achieve success.

**No matter what stage of the product delivery cycle you are in, you should:**

<input type="checkbox"/> Have clearly articulated and measurable [learn-technology-consulting/goals goals].

<input type="checkbox"/> Document what needs to be done in a prioritized backlog ([Backlogs](#backlogs)).

**Before starting a new product, your team should:**

<input type="checkbox"/> Demonstrate product viability. ([Product Validation](#product-validation))

**In ongoing product development, a product team should:**

<input type="checkbox"/> Ingest customer feedback regularly and use it to update the backlog ([Continuous Exploration](#continuous-exploration))

This lesson goes over how to implement these processes.

## Backlogs

A [backlog](<https://en.wikipedia.org/wiki/Scrum_(software_development)#Product_backlog>) is an ordered list of things that need to be done within a project. This is the output of the [Continuous Exploration](#continuous-exploration)
process. Backlogs come in many shapes and sizes:

- Sometimes there is a single backlog, and other times there are multiple.
- Sometimes there is a high level of detail needed to add an entry to a backlog,
  sometimes there is not.

The following are some generally accepted best practices:

- A single person is responsible for maintaining and editing the backlog - the [Product Owner](#product-owner).
- All entries are validated before being entered into the backlog.
- The backlog is subject to change within some short timeframe (a sprint or less).

For how to allocate backlog work, read the next page: [learn-technology-consulting/development].

Further reading:

- [Product Backlog](https://www.scrum-institute.org/The_Scrum_Product_Backlog.php) - All things that need to be done within a project.
- [Sprint Backlog](https://www.scrum.org/resources/what-is-a-sprint-backlog) - Product backlog items selected for a sprint.
- SAFe [Program and Solution Backlogs](https://www.scaledagileframework.com/program-and-solution-backlogs/):
  - Solution Backlog - A [capability](https://www.scaledagileframework.com/solution/) backlog.
  - Program Backlog - A feature backlog.
- SAFe [Team Backlog](https://www.scaledagileframework.com/team-backlog/) - A user story backlog.

## Product Validation

[Product Validation](https://svpg.com/product-validation/) is the process of
making sure the product will be successful without actually building the
product. While many of the [Continuous Exploration](#continuous-exploration) section’s techniques (like prototyping) should also be used to validate your product,
the following list of techniques can be useful at the start of a new product or major
feature:

- [Customer Letter](https://svpg.com/the-customer-letter/) - Write up an imagined press release or letter to a customer advocating for the product or feature’s benefits.
- [Assessing Product Opportunities](https://svpg.com/assessing-product-opportunities/) - A list of 10 questions test product-market fit.
- [Concierge method](http://ibuildmvps.com/blog/the-concierge-minimum-viable-product-maximizes-customer-learning) - Manually do the work your app would do.
- [Reference customers](https://svpg.com/the-power-of-reference-customers/) - Find 6 reference customers before you launch in the marketplace.

## Continuous Exploration

[Continuous Exploration](https://www.scaledagileframework.com/continuous-exploration/)
is the process for determining what should be in the [product backlog](<https://en.wikipedia.org/wiki/Scrum_(software_development)#Product_backlog>). At its most basic, this process consists of:

1. Collecting qualitative and quantitative data from the products stakeholders and users. ([Collecting research data](#collecting-data))
2. Analyzing that data and determining what should be done. ([Prioritization Techniques](#prioritization-techniques))

### Collecting data

Everyone has good ideas that will make a product more successful. Too often,
the ideas that get chosen are picked because:

- A person with authority likes those ideas
- A person with the strongest debate skills likes those ideas

Researching your users and collecting both quantitative and qualitative data
helps inform which features get added to the backlog. This data should be
reviewed and discussed periodically (every 1-3 sprints).
The following list several techniques:

**Passive**

- Analytics - See how your users are using the site.
- Customer feedback - Prompt users to submit features, rate pages, give feedback.
  - Feedback form - Allow users to submit feature request or bugs through the application.
  - Rating - Allow users to rate pages to quickly express satisfaction or dissatisfaction.
  - "Everything Else" category - Add a place for "missing" features to your app.
- Public APIs - Allow the community to build new ideas on top of your platform.
- Customer Support - Capture customer support requests.

**Active**

- Surveys
  - Feature Poll - Poll your users on what features they would like to see.
  - [Sean Ellis Test](https://www.cleverism.com/product-market-fit-sean-ellis-test/) - Ask users if they could no longer use the product/service.
  - [Net Promoter Score](https://en.wikipedia.org/wiki/Net_Promoter) - Gauge the loyalty of a firm’s customer relationships.
- Interviews - Talk to users or potential users about their problems.
- UX studies - Watch someone use the app.
- Hack Nights - Get developers to hack on new ideas of their own.
- Competitor review - Check out what the competition is doing.

### Prioritization Techniques

Once you have some data, it’s time to prioritize features for the backlog. The
following are a number of different prioritization techniques:

- [User Story Mapping](https://manifesto.co.uk/user-story-mapping/) -
  Complete the most essential workflow first.
- [Rice](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/) - `SCORE = Reach * Impact * Confidence / Effort`
- [Weighted Shortest Job First](https://www.scaledagileframework.com/wsjf/) - `SCORE = Cost of Delay / Duration`.  
  `Cost of Delay = Business Value + Time Criticality + Risk Reduction`.
- [Kano Model](https://en.wikipedia.org/wiki/Kano_model) - Survey
  users to find out what they like.
- [MoScoW method](https://en.wikipedia.org/wiki/MoSCoW_method) - Must Haves > Should Haves > Could Haves > Won’t Haves
- [You Aren’t Gonna Need it (Yagni)](https://martinfowler.com/bliki/Yagni.html) - Build immediate needs now. Leave "might needs" for later.

Additional Reading:

- [9 product prioritization frameworks for product managers](https://roadmunk.com/guides/product-prioritization-techniques-product-managers/)
- [7 Strategies to Choose the Best Features for Your Product](https://www.productplan.com/strategies-prioritize-product-features/)

## Roles

### Product Management

From [Product Manager vs. Product Owner](https://medium.com/@melissaperri/product-manager-vs-product-owner-57ff829aa74d), a good Product Manager is taught how to prioritize work against clear outcome oriented goals, how to discover and validate real customer and business value, and what processes are needed to reduce the uncertainty that the product will succeed in market.

Definitions:

- [SAFe Product Management](https://www.scaledagileframework.com/product-and-solution-management/)

### Product Owner

From [Product Manager vs. Product Owner](https://medium.com/@melissaperri/product-manager-vs-product-owner-57ff829aa74d), the three main responsibilities of a Product Owner include:

- Define the product backlog and create actionable user stories for the development teams. (Who creates the user stories varies depending on Scrum training)

- Groom and prioritize the work in the backlog.

- Accept the completed user stories to make sure the work fulfills the criteria.

Definitions:

- [SAFe Product Owner](https://www.scaledagileframework.com/product-owner/)
- [Scrum Guide Product Owner](https://scrumguides.org/scrum-guide.html#product-owner)

<!-- TODO: Requires Content Creation -->
<!-- ## Introducing these concepts -->

<!-- _TODO_ -->

<!-- - Understand why these things are important. -->
<!-- - Ask why an entry in the backlog was added. -->
<!-- - Review the checklist. -->
