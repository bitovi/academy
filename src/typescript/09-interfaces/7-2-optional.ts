interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}

function trackDino(dino: Dinosaur) {
  console.log(dino.location);
}

let blue = {name: 'blue', breed: 'Velociraptor', location: 'Section B'};
//works
trackDino(blue);
//Logs "Section B"
