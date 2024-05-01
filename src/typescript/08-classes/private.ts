class Dinosaur {
  public name: string;
  private dna: string;
  constructor(name: string, dna: string) {
    this.name = name;
    this.dna = dna;
  }
  public walk(distanceInFeet: number): void {
    console.info(`${this.name} walked ${distanceInFeet} feet.`);
  }
}

let scaryDino = new Dinosaur('Indominous', 'cuttlefish');
scaryDino.dna; // Error: Property 'dna' is private and only accessible within class 'Dinosaur'.ts(2341)