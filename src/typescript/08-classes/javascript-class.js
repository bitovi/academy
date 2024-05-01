class ParkEmployee {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.info("Hi, my name is " + this.name);
  }
}

const raptorGuy = new ParkEmployee("Owen");
raptorGuy.sayHi();
