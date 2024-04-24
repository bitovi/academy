class Dinosaur {
  public name: string;
  private dna: string;
  protected teethCount: number;
}

// EFFECT ON INSTANCES
var indominusRex = new Dinosaur();
indominusRex.name; // okay
indominusRex.dna; // ERROR : private
indominusRex.teethCount; // ERROR : protected

// EFFECT ON CHILD CLASSES
class GeneticallyModifiedDinosaur extends Dinosaur {
  constructor() {
    super();
    this.name; // okay
    this.dna; // ERROR: private
    this.teethCount; // okay
  }
}
