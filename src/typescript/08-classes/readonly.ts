class Leoplurodon {
  readonly location: string;
  readonly numberOfFlippers = 4;
  readonly magic = true;
  constructor(theLocation: string) {
    this.location = theLocation;
  }

  updateLocation(location: string): void {
    this.location = location; // Error: Cannot assign to 'location' because it is a read-only property.ts(2540)
  }
}
let firstStop = new Leoplurodon("On the way to Candy Mountain");
firstStop.location = "On a bridge"; // Error: Cannot assign to 'location' because it is a read-only property.ts(2540)
