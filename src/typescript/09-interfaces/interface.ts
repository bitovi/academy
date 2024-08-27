// Interface describing object
interface Dinosaur {
  name: string;
  breed: string;
  height: number;
  location: string;
}

// Function with interface describing parameter
function trackDino(dino: Dinosaur) {
  console.info(dino.location);
}

const blue = {
  name: "blue",
  breed: "Velociraptor",
  height: 7,
  location: "Section B",
};
trackDino(blue);
// Logs "Section B"
