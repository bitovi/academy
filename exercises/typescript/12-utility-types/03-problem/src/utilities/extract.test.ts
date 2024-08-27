import {
  Developer
} from "./extract";
import { describe, it } from "node:test";

describe("extract tests", () => {
  it("typing works", () => {
    const newDev: Developer = {
      role: "developer",
      email: "email@developer.com",
      firstName: "Dev",
      lastName: "Eloper",
      team: "React",
      id: 4,
      // @ts-expect-error
      isVerified: true,
    };
  });
});