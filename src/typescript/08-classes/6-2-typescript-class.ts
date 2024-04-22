//class way
class ParkEmployee {
  name: string;
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, my name is ${this.name}`);
  }

}

let raptorGuy = new ParkEmployee('Owen');
raptorGuy.sayHi();
//Logs "Hi, my name is Owen"
