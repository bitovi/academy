function buildDinosaur(name: string, breed: string, teeth?: number): void {
  if (teeth) {
    console.info(`${name} is a ${breed} and has ${teeth} teeth.`);
  }
  else {
    console.info(`${name} is a ${breed}.`);
  }
}

let newDino = buildDinosaur('Blue', 'Velociraptor', 80);
//works
let otherDino = buildDinosaur('Delta', 'Velociraptor');
//also works
let otherOtherDino = buildDinosaur('Charlie');
//error an argument for 'breed' was not provided