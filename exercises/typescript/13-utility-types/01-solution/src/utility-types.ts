interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

enum Diet {
  "Carnivore",
  "Herbivore",
  "Omnivore",
}

type Tyrannosaurus = Required<Dinosaur & { diet: Diet.Carnivore }>;

export { Diet, Tyrannosaurus };