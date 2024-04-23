//interface describing object
interface Dinosaur {
  name: string;
  breed: string;
  height: number;
  location: string;
}

//function with interface describing parameter
function trackDino(dino: Dinosaur) {
  console.info(dino.location);
}

const blue = {
  name: 'blue',
  breed: 'Velociraptor',
  height: 7,
  location: 'Section B'
};
trackDino(blue);
//Logs "Section B"