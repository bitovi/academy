function buildDinosaur(breed: string, ...dna: string[]): void {
  console.info(`The ${breed} has dna from ${dna.join(", ")}`);
}

buildDinosaur(
  "Indominous Rex",
  "Velociraptor",
  "Tyrannosaurus rex",
  "Therizinosaurus",
  "cuttlefish",
);
// Logs "The Indominous Rex has dna from Velociraptor,
//      Tyrannosaurus rex, Therizinosaurus, cuttlefish"
