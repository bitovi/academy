interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}


class ClonedDino implements Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
  roar() {
    console.log('roar');
  };
}
