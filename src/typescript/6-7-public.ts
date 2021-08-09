class Dinosaur {
  //will be public by default
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  public walk(distanceInFeet: number) {
    console.log(`${this.name} walked ${distanceInFeet} feet.`);
  }
}

let myDino = new Dinosaur('Mildred');
console.log(myDino.name)
//Logs "Mildred"
myDino.walk(7)
//Logs "Mildred walked 7 feet."
