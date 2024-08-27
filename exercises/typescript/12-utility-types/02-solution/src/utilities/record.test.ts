import type { Person, PersonMap } from "./record";
import { describe, it } from "node:test";

describe("record tests", () => {
  it("typing works", () => {
    const people: Person[] = [
      {
        role: "developer",
        email: "email@developer.com",
        firstName: "Dev",
        lastName: "Eloper",
        team: "React",
        id: 1,
      },
      {
        role: "developer",
        email: "jane@developer.com",
        firstName: "Dev",
        lastName: "Eloper",
        team: "React",
        id: 2,
      },
      {
        role: "user",
        email: "user1@developer.com",
        firstName: "Great",
        lastName: "User",
        isVerified: false,
        id: 3,
      },
      {
        role: "user",
        email: "user2@developer.com",
        firstName: "Super",
        lastName: "User",
        isVerified: false,
        id: 4,
      },
    ];

    const userMap = people.reduce((acc, person) => {
      acc[person.id] = { ...person };
      return acc;
    }, {} as PersonMap);
  });
});