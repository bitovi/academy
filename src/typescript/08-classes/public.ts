class Dinosaur {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  public walk(distanceInFeet: number): void {
    console.log(`${this.name} walked ${distanceInFeet} feet.`);
  }
}

let myDino = new Dinosaur("Mildred");
console.log(myDino.name);
myDino.walk(7);
