@page learn-technology-consulting/tools-and-technology Tools and Technology
@parent learn-technology-consulting 7

@description Learn the tools and technology commonly used within a project.

@body


## Versioning and Environment Workflows

This document describes the process of development workflows with respect to versioning software and application environments (dev, test, staging, prod). The specifics on your project should be documented in the
[learn-technology-consulting/transition-sales-to-delivery#appsummarydocument App Summary Document]

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

For a quick overview of some different Git branching strategies, see:
[this
talk](https://docs.google.com/presentation/d/1XSGZA30_r7i5kacURsJs8tPKapcWjjkhECLyKGmXHSQ/edit?usp=sharing)
and [this
article](https://www.atlassian.com/git/tutorials/comparing-workflows).

## Communication Tools

The following the communication tools that should be present on every project. The specifics on your project should be documented in the [learn-technology-consulting/transition-sales-to-delivery#appsummarydocument App Summary Document]

- Screen Sharing - _Google Meet_ or _Slack Calls_
- Video Conference - _Google Meet_ or _Slack Calls_
- Chat - _Slack_
- Wiki - _GitHub Wiki_
- Calendars - _Shared Google Calendars_ and a project/company calendar.
- Meetings - When meetings are held.
