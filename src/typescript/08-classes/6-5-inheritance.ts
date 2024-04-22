class Dinosaur {
  constructor(public name: string) {}

  move(distanceInFeet: number = 0): void {
    console.log(`${this.name} moved ${distanceInFeet} feet.`);
  }
}

class Velociraptor extends Dinosaur {
  constructor(name: string, public speed: number) {
    super(name);
  }
  run(): void {
    console.log(`${this.name} runs at ${this.speed}mph.`);
  }
  talk(): void {
    console.log(`${this.name} screeches.`);
  }
}

let blue = new Velociraptor('Blue', 55);
blue.move(10);
//Logs "Blue moved 10 feet."
blue.talk();
//Logs "Blue screeches."
blue.run();
//Logs "Blue runs at 55mph."
