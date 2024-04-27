import {
  NonEditablePerson,
  UpdateablePerson,
  FullyDefinedPerson,
} from "./property-existence";
import { describe, it } from "node:test";

describe("property-existence tests", () => {
  it("partial typing works", () => {
    const personToUpdate1: UpdateablePerson = {
      team: "React",
    };
  });
  it("required typing works", () => {
    // @ts-expect-error
    const fullyDefinedPerson: FullyDefinedPerson = {
      role: "developer",
      id: 5,
      firstName: "string",
      lastName: "string",
      team: "React",
    };
  });
  it("readonly typing works", () => {
    const nonEditablePerson: NonEditablePerson = {
      role: "developer",
      email: "string",
      id: 5,
      firstName: "string",
      lastName: "string",
      team: "React",
    };

    // @ts-expect-error
    nonEditablePerson.firstName = "somethingelse";
  });
});