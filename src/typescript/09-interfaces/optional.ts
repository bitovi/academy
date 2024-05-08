interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}

function trackDino(dino: Dinosaur) {
  console.info(dino.location);
}

const blue = {
  name: "blue",
  breed: "Velociraptor",
  location: "Section B",
};
// Works
trackDino(blue);
// Logs "Section B"
