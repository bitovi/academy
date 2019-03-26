@page angular/form-value-changes Listening to Form Value Changes
@parent angular 9

@description Listening to Form Value Changes

@body

## Overview

In this part, we will:

- Create subscription to form changes
- Use onDestroy to unsubscribe from form changes

## Listening to Form Changes

We can listen to changes to values on our form. 

## Updating Form Values


__src/app/restaurant/restaurant.component.ts__

@sourceref restaurant.component.ts
@highlight 1,3,18,36,53-55,63,65-76

When you interact with the dropdown menus, you should see their values logged to the console as you change them. 
