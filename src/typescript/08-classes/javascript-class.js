class ParkEmployee {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log("Hi, my name is " + this.name);
  }
}

let raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
