import {
  FrontendDeveloper
} from "./exclude";
import { describe, it } from "node:test";

describe("exclude tests", () => {
  it("typing works", () => {
    const brandNewDev: FrontendDeveloper = {
      email: "newHire@developer.com",
      team: "React",
      firstName: "June",
      lastName: "Jones",
      id: 8,
      role: "developer",
    };
    
    const incorrectDev: FrontendDeveloper = {
      email: "newHire@developer.com",
      // @ts-expect-error
      team: "backend",
      firstName: "June",
      lastName: "Jones",
      id: 8,
      role: "developer",
    };
  });
});