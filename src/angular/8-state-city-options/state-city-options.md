@page angular/state-city-options City & State Options
@parent angular 8

@description Creating city & state options for filtering restaurants

@body

## Overview

In this part, we will:

- Import ReactiveFormsModule into our root app
- Create a reactive form in our Restaurant Component
- Create a form in our markup and connect inputs to reactive form

## Importing a New Module

We need to import reactiveForms in our root app module.

__src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 5,24

## Creating Reactive Forms

We're going to use select boxes to handle our user's input. Angular's Reactive Forms API provides a clean way to get data from user input and do work based on it. We create a basic form in our `RestaurantComponent` by importing the API and creating a new form:

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 2,18,25-39,42,50-55

## Updating markup

Update the ``restaurant.component.html`` file to be:

__src/app/restaurant/restaurant.component.html__

@sourceref ./restaurant.component.html
