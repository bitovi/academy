import { Diet, Tyrannosaurus } from "./required";
import { describe, it } from "node:test";

type TyrannosaurusMock = {
  species: string;
  diet: Diet.Carnivore;
  age: number;
};

describe("Utility Types", () => {
  it("typing works", () => {
    const trex: TyrannosaurusMock = {
      species: "Tyrannosaurus rex",
      diet: Diet.Carnivore,
      age: 10,
    } as Tyrannosaurus;
  });
});
