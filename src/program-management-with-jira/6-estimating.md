@page learn-agile-program-management-with-jira/estimating Estimating
@parent learn-agile-program-management-with-jira 6

@description Learn how to estimate.

@body



- Estimate or validate - depends on what you think the bigger risk is,
  but often can be done at the same time.
	- if both can be done at the same time, how to manage the double status?
	- can have sub tickets


## How to estimate


Very similar to how we [break down user stories](https://www.bitovi.com/blog/how-to-break-down-epics-into-user-stories), we break down an initiative into epics.


Building epics in JIRA is wasteful if they are likely to change.

We recommend building it out in a bulleted list.


1. Write up the user journey working through the features. Make sure to include
   happy paths and edge cases.
2. Under them, write up the work items needs to complete the task by team.

	 We indent to highlight dependencies.

It looks like:

> ## Epics
>
> ### Happy Paths
>
> __Customer is able to see the fanny-pack promotion on the homepage__
>
> - Promotion - Provide a list of promotions for the user
>   - Promotion - Receive a list of promotions
>     - Administration - Build and publish discounts
>
> __Customer clicks the fanny-pack discount and is prompted to add the fanny-pack to the cart__
>
> __Customer adds the fanny-pack and promotion to the cart__
>
> - Cart - Enable a promotion to be added to the cart
>   - Promotions - Verify if a promotion is available
>
> Customer sees a warning about needing $100 to use the promotion.
> Customer adds $100 of value to their cart.
>
> __Customer checks out__
>
> - Order - Place an order with a promotion
>   - Promotions - Consume the promotion
>   - Order - Send the promotion to the store
>
>
> Customer sees the promotion on their receipt





Then, meet with the team to get estimates (and confidences)


> - Promotion - Provide a list of promotions for the user [10 50%]
>   - Promotion - Receive a list of promotions [5 90%]
>     - Administration - Build and publish discounts [30 40%]


## Confidences

https://erikbern.com/2019/04/15/why-software-projects-take-longer-than-you-think-a-statistical-model.html


https://news.ycombinator.com/item?id=26366112


Confidences+Estimates provide a much better way of estimating.


It’s a whole other thing to quantify. A “point scale”, no matter if Fibonacci or t-shirt sizes or days is only a single unit of measure. Confidence is and additional value, which can be used to give useful detail to the time estimate.
There are things that I know will take 13 points at 95% and things I think might take 2 days, but I have 20% confidence.  (edited)


The confidence doesn’t hone in over time using the same mechanisms velocity does.
Velocity is averaged over time.
Confidence is something you can optionally look to improve to shorten long polls, or completely ignore. If I have something at 2 weeks and 30% on the critical path, I’ll put more resources early on it.


## Putting it into a plan

Tool that long tails it https://jsh33hy.nyc3.digitaloceanspaces.com/task-estimation-minified.html


Space it out in the future, it will be "placed".

Now you have the time estimate.  Time to prioritize!


## Etc content







What is the has estimate list?
This is a list of initiatives whose:

high-level requirements have been scoped
work has been roughly estimated and planned
but the initiatives have not:

had their value proven or estimated
How to get an initiative to has estimate?
First, break down the work across by user requirement. Nest stories/epics that must be done prior to completing their parent story/epic.

For example, the following must be built to complete the "Customer is able to see the fanny-pack promotion on the homepage" user requirement:

- Promotion - Provide a list of promotions for the user
  - Promotion - Receive a list of promotions
   - Administration - Build and publish discounts
Next, create these stories/epics and ask the engineering teams to give their estimate of the work.

PRO TIP: Estimates should include some level of confidence.

Finally, break down the work visually in roadmapping software. This can often help you improve the timing and de-risk development.

image

How to sort the has estimate list?
This should be sorted by each initiative's expected value.
