class Leoplurodon {
  readonly location: string;
  readonly numberOfFlippers: number = 4;
  readonly magic:boolean = true;
  constructor (theLocation: string) {
    this.location = theLocation;
  }

  updateLocation(location: string) {
    this.location = location // Cannot assign to 'location' because it is a read-only property.ts(2540)
  }
}
let firstStop = new Leoplurodon("On the way to Candy Mountain");
firstStop.location = "On a bridge"; // error! location is readonly.
