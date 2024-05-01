class GenericCollection<T> {
  private list: T[] = [];
  pushItem(thing:T) {
    this.list.push(thing);
  }
}

const myListOfStrings = new GenericCollection<string>();
myListOfStrings.pushItem('booop');
myListOfStrings.pushItem(5);
// Error Argument type of '5' is not assignable to parameter of type 'string'

const myListOfNumbers = new GenericCollection<number>();
myListOfNumbers.pushItem(5);
myListOfNumbers.pushItem('boop');
// Error Argument type of '"boop"' is not assignable to parameter of type 'number'

interface Dinosaur {
  name: string;
  breed: string;
  teeth: number;
}

const myListOfDinosaurs = new GenericCollection<Dinosaur>();
const otherDino = {
  name: 'Blue',
  breed: 'Velociraptor',
  teeth: 100
}

myListOfDinosaurs.pushItem(otherDino);

myListOfDinosaurs.pushItem({name: 'Charlie'});
// Error Argument type '{ name: string; }' is not assignable to parameter of type 'Dinosaur'.