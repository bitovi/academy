class DinoKeeper {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHi(): string {
    return `${this.name} says "hi"`;
  }
}
let employee1 = new DinoKeeper("Joe");
employee1.sayHi();

class Specialist extends DinoKeeper {
  constructor(name: string, public experience: number) {
    super(name);
  }

  safetyQuote() {
    return `Never turn your back to the cage.
    Trust me, I have ${this.experience} years of experience`;
  }
}
export default Specialist;
