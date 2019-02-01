@page angular/creating-navigation Creating Navigation
@parent angular 5

@description Creating Navigation

@body

## Overview

In this part, we will:

- Use routerlink to create navigation links

### Adding Navigation

Open the app.component.html and change it to:

__src/index.html__
```html
<header>
  <nav>
   <h1>place-my-order.com</h1>
   <ul>
        <li>
            <a routerLink="/home" routerLinkActive="active">Home</a>
        </li>
        <li>
            <a routerLink="/restaurants" routerLinkActive="active">Restaurants</a>
        </li>
   </ul>
  </nav>
</header>
<router-outlet></router-outlet>
```

We now have a nice navigation for our users to change between views!