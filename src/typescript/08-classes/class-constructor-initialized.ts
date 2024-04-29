class Dinosaur {
  name: string;
  age = 0;
  constructor(name: string) {
    this.name = name;
  }
}

let dino = new Dinosaur('Billy');
console.info(dino.age);
// Logs "0"
