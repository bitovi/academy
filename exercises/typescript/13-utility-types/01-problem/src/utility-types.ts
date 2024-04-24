interface Dinosaur {
  species: string;
  diet: Diet;
  age?: number;
}

enum Diet {
  'Carnivore',
  'Herbivore',
  'Omnivore',
}

type Tyrannosaurus = Dinosaur;

export { Diet, Tyrannosaurus };