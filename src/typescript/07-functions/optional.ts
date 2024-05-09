function buildDinosaur(name: string, breed: string, teeth?: number): void {
  if (teeth) {
    console.info(`${name} is a ${breed} and has ${teeth} teeth.`);
  } else {
    console.info(`${name} is a ${breed}.`);
  }
}

let newDino = buildDinosaur("Blue", "Velociraptor", 80);
// Works
let otherDino = buildDinosaur("Delta", "Velociraptor");
// Also works
let otherOtherDino = buildDinosaur("Charlie");
// Expected 2-3 arguments, but got 1.ts(2554)
// Error: An argument for 'breed' was not provided.
