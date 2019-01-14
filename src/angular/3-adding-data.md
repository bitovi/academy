@page angular/adding-data Adding Data
@parent angular 2

@description Adding Data

@body 


## Building our Restaurants List

Let's start by creating an interface to tell Typescript what we expect a restaurant object to look like

```bash
touch src/app/restaurant/restaurant.ts
```

```typescript
interface Item {
    name: string;
    price: number;
}

interface Menu {
  lunch: Array<Item>;
  dinner: Array<Item>;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Images {
  thumbnail: string;
  owner: string;
  banner: string;
}

export class Restaurant {
  name: string;
  slug: string;
  images: Images;
  menu: Menu;
  address: Address;
  _id: string;
}
```

