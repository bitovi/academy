interface Sushi {
  cuisine: "Japanese";
  fish: string;
}

interface Taco {
  cuisine: "Mexican";
  meat: string;
}

interface Curry {
  cuisine: "Indian";
  spicy: number;
}

type Dish = Sushi | Taco | Curry;

export const sushi: Dish = {
  cuisine: "Japanese",
  fish: "Tuna",
};

export const taco: Dish = {
  cuisine: "Mexican",
  meat: "Chicken",
};

export const curry: Dish = {
  cuisine: "Indian",
  spicy: 10,
};

export const fusion: Dish = {
  cuisine: "Japanese",
  // @ts-expect-error: spicy doesn’t exist on the Sushi interface!
  spicy: 5,
};
