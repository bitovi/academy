class Dinosaur {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  public walk(distanceInFeet: number): void {
    console.info(`${this.name} walked ${distanceInFeet} feet.`);
  }
}

const myDino = new Dinosaur("Mildred");
console.info(myDino.name);
myDino.walk(7);
