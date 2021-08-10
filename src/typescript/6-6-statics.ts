class DinoCage {
  static cageInstances: number = 0;
  constructor() {
    DinoCage.cageInstances++;
  }
}

var paddock1 = new DinoCage();
var paddock2 = new DinoCage();
console.log(DinoCage.cageInstances);
//Logs "2"
