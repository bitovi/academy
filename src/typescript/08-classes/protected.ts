class Dinosaur {
  public name: string;
  private dna: string;
  protected teethCount: number;
}

// EFFECT ON INSTANCES
var indominusRex = new Dinosaur();
indominusRex.name; // Okay
indominusRex.dna; // Error: Property 'dna' is private and only accessible within class 'Dinosaur'.ts(2341)
indominusRex.teethCount; // Error: Property 'teethCount' does not exist on type 'Dinosaur'.ts(2339)

// EFFECT ON CHILD CLASSES
class GeneticallyModifiedDinosaur extends Dinosaur {
  constructor() {
    super();
    this.name; // Okay
    this.dna; // Error: Property 'dna' is private and only accessible within class 'Dinosaur'.ts(2341)
    this.teethCount; // Okay
  }
}
