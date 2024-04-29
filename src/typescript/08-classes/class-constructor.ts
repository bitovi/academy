class Dinosaur {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

let dino = new Dinosaur('Billy');
console.info(dino.name);
// Logs "Billy"
