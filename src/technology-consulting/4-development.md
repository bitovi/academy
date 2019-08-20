@page learn-technology-consulting/development Efficient Development
@parent learn-technology-consulting 4
@outline 3

@description Learn the tools and technology commonly used within a project.

@body

## Overview

## Checklist

### Tools and environment


Source control is

- <input type="checkbox"/> Used
- <input type="checkbox"/> Git
- <input type="checkbox"/> Used with a branch and merge strategy.

An issue tracker is

- <input type="checkbox"/> Used
- <input type="checkbox"/> Integrated with source control.
- <input type="checkbox"/> Used by non developers.

The following environments exist

- <input type="checkbox"/> Development
- <input type="checkbox"/> Test
- <input type="checkbox"/> Staging
- <input type="checkbox"/> Production

Continuous integration

- <input type="checkbox"/> Exists
- <input type="checkbox"/> Runs on all commits / pushes
- <input type="checkbox"/> Emails on failure

A 1-3 step process for the following exist:

- <input type="checkbox"/> Setting up a development environment
- <input type="checkbox"/> Testing the application.
- <input type="checkbox"/> Building the application into a production distributable.
- <input type="checkbox"/> Deploy to test and staging.- <input type="checkbox"/>

### Code quality

Is the high level architecture documented and followed?

- <input type="checkbox"/> Yes
- <input type="checkbox"/> No

Are there unit tests?

- <input type="checkbox"/> Yes
- <input type="checkbox"/> No


Is there documentation for the code?

- <input type="checkbox"/> Yes
- <input type="checkbox"/> No

All modules include:

- <input type="checkbox"/> High level documentation.
- <input type="checkbox"/> Tests
- <input type="checkbox"/> Inline documentation
- <input type="checkbox"/> A demo

Are there performance tests?

- <input type="checkbox"/> Yes
- <input type="checkbox"/> No

The service layer is:

- <input type="checkbox"/> RESTful
- <input type="checkbox"/> Documented
- <input type="checkbox"/> Tested
- <input type="checkbox"/> Built / working

Is technical debt measured? _Is some value (often in days / weeks) of technical debt calculated?_

- <input type="checkbox"/> Yes
- <input type="checkbox"/> No

Is technical debt factored into estimates? _Do estimations of time, or points, or effort include discussions of technical debt?_

- <input type="radio"/> Yes
- <input type="radio"/> No

### Team


Is there a QA team or resource?

- <input type="radio"/> Yes
- <input type="radio"/> No

Are teams grouped by specialty? _Example: client vs server_

- <input type="radio"/> Yes
- <input type="radio"/> No

Do you work alongside the client's developers?

- <input type="radio"/> Yes
- <input type="radio"/> No

Is every piece of code known to at least two people? _No piece of code should be "workable" by only one person._

- <input type="radio"/> Yes
- <input type="radio"/> No

There are code reviews

- <input type="radio"/> Every commit
- <input type="radio"/> Every week
- <input type="radio"/> Every month
- <input type="radio"/> Of new people's code
- <input type="radio"/> Never


## Methodologies

The following are some common project management methodologies.

### Scrum

Summary:

- Work organized in sprints (~2-6 weeks)

Guides:


- [Atlassian](https://www.atlassian.com/agile/scrum)
- [Scrum Guide](https://www.scrumguides.org/scrum-guide.html)

### Kanban

Summary:

- Task board where any engineer can take a job
  and complete it.
- Continuous delivery

Guides:

- [Atlassian](https://www.atlassian.com/agile/kanban)

### Extreme Programming

- [Extreme Programming](http://www.extremeprogramming.org/)

[Compared to Scrum](https://www.mountaingoatsoftware.com/blog/differences-between-scrum-and-extreme-programming):

- Allows changes in sprints.
- Work in strict priority order.
- Prescribes engineering practices (TDD, automation, pair programming)

## Versioning and Environment Workflows

This document describes the process of development workflows with respect to versioning software and application environments (dev, test, staging, prod). The specifics on your project should be documented in the
[learn-technology-consulting/transitioning-to-delivery#app-summary-document App Summary Document]

- Versioning Software: GitHub
- Continuous Integration: TravisCI
- Environments
  - Production - The production servers and databases users interact with.
  - Staging - An environment that matches production as closely as possible that
    is able to verify the next release is going to work as expected.
  - Development - An environment that allows developers to quickly show off
    new features or test their code in a near production environment.
- Branches
  - master - Represents the features that will go onto staging.
  - `{ISSUE_NUM}_FEATURE` - A feature branch that is forked from `master`.  When ready, it is merged into `master`
  - `RELEASE-pre.X` - A tagged version of master that will be pushed to _Staging_ for testing.  If successful, it will be tagged without `-pre.X` for released.
  - `RELEASE` - A release that will be pushed to _Production_.  

## Ops

- Continuous Integration
- Continuous Deployment
- Monitoring




## Roles

### Service Owner

- [How it relates to devOps](https://www.atlassian.com/agile/devops)
