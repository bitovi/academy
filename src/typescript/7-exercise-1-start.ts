function randomIntElem(theArray: number[]): number {
  let randomIndex = Math.floor(Math.random()*theArray.length);
  return theArray[randomIndex];
}

let numbers: number[] = [103, 458, 472, 458];
let randomNumber: number = randomIntElem(positions);
