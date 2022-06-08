/**
 * EX 1: Update the `Creature` and `Keys` type to gain type safety on the `getCreatureProperty`
 * function. The function should, given a create and property key, return the property of that creature.
 */
const dinosaur = {
  latinName: "Tyrannosaurus rex",
  nickName: "T-rex",
  habitat: "forest",
  attributes: {
    weight: { amount: 15_500, units: "lbs" },
    height: { amount: 12, units: "ft" },
    length: { amount: 40, units: "ft" },
  },
};

/**
 * Replace `any` with a type that represents the `dinosaur` object above
 */
export type Creature = typeof dinosaur;

/**
 * Replace `any` with a type that allows for any of the keys in the dinosaur object
 */
export type Keys = keyof Creature;

/**
 * This function should, given a create and property key, return the property of that creature.
 */
export const getCreatureProperty = (
  creature: Creature,
  key: Keys
): Creature[Keys] => {
  return creature[key];
};
