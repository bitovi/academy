function randomIntElem<T>(anArray: T[]): T {
  let randomIndex = Math.floor(Math.random()*anArray.length);
  return anArray[randomIndex];
}
let dinosaurs: string[] = ['trex', 'velociraptor', 'triceratops', 'pterodactyl'];
let randomDino: string = randomIntElem(dinosaurs);
