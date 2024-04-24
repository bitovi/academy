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
//Logs "Joe says "hi""

export default DinoKeeper;
