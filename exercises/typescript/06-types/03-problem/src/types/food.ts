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

type Dish = never;

const sushi: Dish = {
  cuisine: "Japanese",
  fish: "Tuna",
};

const taco: Dish = {
  cuisine: "Mexican",
  meat: "Chicken",
};

const curry: Dish = {
  cuisine: "Indian",
  spicy: 10,
};

// This should be an error, spicy doesn't exist on the Sushi interface!
const fusion: Dish = {
  cuisine: "Japanese",
  // @ts-expect-error
  spicy: 5,
};

export { sushi, taco, curry, fusion };
