interface Dinosaur {
  name: string;
  breed: string;
  location: string;
}

const dinoA = {
  name: 'Blue',
  breed: 'Velociraptor',
  location: 'Section B'
};

const dinoB = {
  name: 'Sally',
  location: 'Section C'
};

function dinoCatcher(dinosaur: Dinosaur) {
  console.info(`Caught ${dinosaur.name} at ${dinosaur.location}`);
}

dinoCatcher(dinoA);
// Works!

dinoCatcher(dinoB);
// Error: Argument of type '{ name: string; location: string; }' is not assignable to parameter of type 'Dinosaur'.
// Property 'breed' is missing in type '{ name: string; location: string; }'.