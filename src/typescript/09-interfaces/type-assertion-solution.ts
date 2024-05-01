interface Dinosaur {
  name: string;
  height: number;
}

const myObj = {} as Dinosaur;
myObj.name = 'Blue'; // Okay now
myObj.height = 6;// Okay now