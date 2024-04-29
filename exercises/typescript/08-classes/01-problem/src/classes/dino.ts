function DinoKeeper(name) {
  this.name = name;
}

DinoKeeper.prototype.sayHi = function () {
  return this.name + ' says “hi”';
};

const employee1 = new DinoKeeper("Joe");
employee1.sayHi();
// Joe says “hi”
