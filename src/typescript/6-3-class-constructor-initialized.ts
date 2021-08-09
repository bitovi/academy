class Dinosaur {
  name: string;
  age = 0; // type number is inferred
  constructor(name: string) {
    this.name = name;
  }
}

let dino = new Dinosaur('Billy');
console.log(dino.age);
//Logs "0"
