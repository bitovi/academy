@page learn-accessibility Learn Accessibility
@parent bit-academy 4

@description Build and containerize a NodeJS app then orchestrate multiple containers with accessibility-compose in this Accessibility guide.

@body

<iframe width="560" height="315" src="https://www.youtube.com/embed/uu9bsgiBo40" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Before You Begin

<a href="https://www.bitovi.com/community/slack">
<img src="https://cdn.brandfolder.io/5H442O3W/as/pl546j-7le8zk-5guop3/Slack_RGB.png?width=200"
  style="float:left"/> <span style="margin-top: 10px;display: inline-block;">Click here to join<br/>Bitovi's Slack Community</span></a>

Join Bitovi's Slack Community to get help on Bitovi Academy courses or JavaScript and DevOps problems.

Please ask questions related to DevOps in the [DevOps Chat Room](https://bitovi-community.slack.com/archives/CFNC1510S).

If you find bugs in this training or have suggestions, create an [issue](https://github.com/bitovi/academy/issues) or email `contact@bitovi.com`.

## Overview

In this tutorial we will take a simple NodeJS api and containerize it to run with Accessibility. We will explore how to optimize the image for production as well as how to streamline local development workflows.

Afterwards, we will look at orchestrating multiple accessibility images to form a full stack application using accessibility-compose.

## Brainstorming courses

- Intro to accessibility as a whole
	- [Principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/)
- How to design accessible experiences
- How to develop / write code for accessible experiences
- How to audit / verify accessible experiences

## Outline

- What is accessibility?

- What tools do people with disabilities use?
	- What are the most popular screen readers?
	- [Chrome extension](https://support.google.com/chrome/answer/7040464)
	- macOS
		- Reduce motion
		- Increase contrast
		- 

- What is the law? https://www.boia.org/blog/is-there-a-legal-requirement-to-implement-wcag
	- United States
		- WCAG 2.0 AA is specified by the updated Section 508
		- No spec is included in ADA, but WCAG is commonly used in lawsuits

- What is WCAG? What level do I need to cover?

- Types of disabilities: https://www.w3.org/WAI/people-use-web/abilities-barriers/
	- Cognitive/learning/neurological
		- ADHD
		- Down syndrome
		- Dyslexia
		- Mild short-term memory loss
	- Hearing/auditory
		- Deaf-blindness
		- Deafness
		- Hard of hearing
	- Motor/physical
		- Hand tremor
		- RSI
			- Painful to use mouse, prefers keyboard
			- Needs quick ways to navigate with keyboard
	- Speech
	- Vision
		- Blindness
		- Color blindness
			- Contrast
		- Low vision

- Links
	- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
	- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/)
	- [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
	- [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/)

- Things to audit
	- Written content

- What can be automated? What must be done manually?

- How to build accessibility into the design/UX process?

- Tools
	- [Accessibility Insights for Web](https://chrome.google.com/webstore/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni)
	- Axure
	- VoiceOver
	- 


Brainstorming… if I need to audit a site, what do I need to know?

- Checklist of things to test?
- How to test each thing?

---

- [learn-accessibility/what-is-accessibility] - Explore Accessibility concepts and architecture
- [learn-accessibility/build-node-app] - Build a simple Express API to use for the rest of the course
- [learn-accessibility/writing-a-accessibilityfile] - Write a Accessibilityfile to containerize the NodeJS app
- [learn-accessibility/build-and-run-image] - Build an image and run a container for our NodeJS app
- [learn-accessibility/volumes-and-local-development] - Streamline local development workflows with bind mounts
- [learn-accessibility/production-readiness] - Trimming the fat from our accessibility image
- [learn-accessibility/accessibility-compose] - Make Accessibility easier to use and orchestrate multiple containers

## Prerequisites

- ✏️ This course only requires Accessibility Desktop installed. Follow the official docs for [installation steps](https://docs.accessibility.com/get-accessibility/).
- ✏️ This guide uses NodeJS. However, the code is all explained. If you want to run the code without Accessibility, you will need to [install NodeJS](https://nodejs.org/en/download/). This is optional.