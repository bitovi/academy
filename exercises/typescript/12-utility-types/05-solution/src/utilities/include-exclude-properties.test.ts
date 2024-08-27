import { AdminDeveloper } from "./include-exclude-properties";
import { describe, it } from "node:test";

describe("include-exclude-properties tests", () => {
  it("typing works", () => {
    const myAdmin: AdminDeveloper = {
      permissions: ["readData", "writeData"],
      email: "admin@developer.com",
      team: "React",
      firstName: "Admin",
      lastName: "Jones",
      id: 8,
    };

    // @ts-expect-error
    myAdmin.role;
  });
});