interface Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
}

class DinoWithRoar implements Dinosaur {
  name: string;
  breed: string;
  height?: number;
  location: string;
  roar(): void {
    console.info('roar');
  };
}