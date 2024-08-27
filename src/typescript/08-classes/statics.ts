class DinoCage {
  static cageInstances = 0;
  constructor() {
    DinoCage.cageInstances++;
  }
}

var paddock1 = new DinoCage();
var paddock2 = new DinoCage();
console.info(DinoCage.cageInstances);
// Logs "2"
