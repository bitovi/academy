import assert from "node:assert";
import "mocha";
import date from "./date-exports";

import { readFileSync } from "fs";
import { join } from "path";

describe("types tests", () => {
  it("exports a date", function () {
    assert.ok(date instanceof Date, "date instance");
  });

  it("labels variable as Date", function () {
    var source = "" + readFileSync(join(__dirname, "2b-date-export.ts"));
    assert.ok(/\:\s*Date/.test(source), "defines something as a date");
  });
});
