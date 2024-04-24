function DinoKeeper(name) {
  this.name = name;
}

DinoKeeper.prototype.sayHi = function () {
  return this.name + ' says "hi"';
};

let employee1 = new DinoKeeper("Joe");
employee1.sayHi();
//Joe says "hi"
