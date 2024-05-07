const dog = {
  name: "fido",
  bark: function (this: { name: string }) {
    console.info(this.name, "says woof");
  },
};
const address = { street: "2 State St" };

dog.bark.call(dog);
dog.bark.call(address);
