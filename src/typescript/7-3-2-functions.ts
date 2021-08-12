interface Dinosaur {
  name: string;
  breed: string;
  location: string;
}

let dinoA = {
  name: 'Blue',
  breed: 'Velociraptor',
  location: 'Section B'
};

let dinoB = {
  name: 'Sally',
  location: 'Section C'
};

function dinoCatcher(dinosaur: Dinosaur) {
  console.log(`Caught ${dinosaur.name} at ${dinosaur.location}`);
}

dinoCatcher(dinoA);
//works!
dinoCatcher(dinoB);
//Argument of type '{ name: string; location: string; }' is not assignable to parameter of type 'Dinosaur'.
//Property 'breed' is missing in type '{ name: string; location: string; }'.
