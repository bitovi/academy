/**
 * EX 1: Update the `DinosaurFactObject` and `Dinosaur` type to gain type safety on the `getDinoFact`
 * function. The function should, given a dinosaurs name (`velociraptor` or `t-rex`) and the `dinosaurFacts` object
 * return the correct facts about the dinosaur.
 */
export const dinosaurFacts = {
  "t-rex": {
    latinName: "Tyrannosaurus rex",
    nickName: "T-rex",
    habitat: "forest",
    attributes: {
      weight: { amount: 15_500, units: "lbs" },
      height: { amount: 12, units: "ft" },
      length: { amount: 40, units: "ft" },
    },
  },
  velociraptor: {
    latinName: "velociraptor",
    nickName: "raptor",
    habitat: "desert",
    attributes: {
      weight: { amount: 100, units: "lbs" },
      height: { amount: 1.6, units: "ft" },
      length: { amount: 6, units: "ft" },
    },
  },
};

/**
 * Replace `any` with a type that represents the `dinosaurFacts` object above
 */
type DinosaurFactObject = any;

/**
 * Replace `any` with a type that allows for any of the keys in the dinosaur fact object
 */
type Dinosaur = any;

/**
 * This function should, given a facts object and dinosaur name, return the facts for that creature.
 *
 * >NOTE: Don't worry about the `DinosaurFactObject[Dinosaur]` type in the return of the function signature. That's called
 * and index-signature which we will get into later on.
 */
export const getDinoFact = (
  facts: DinosaurFactObject,
  dino: Dinosaur
): DinosaurFactObject[Dinosaur] => {
  return facts[dino];
};
