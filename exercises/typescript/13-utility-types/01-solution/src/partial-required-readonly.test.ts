import {
  NonEditablePerson,
  UpdateablePerson,
  FullyDefinedPerson,
} from "./partial-required-readonly";
import { describe, it } from "node:test";

describe("partial-required-readonly tests", () => {
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
