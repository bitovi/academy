#!/usr/bin/env node
const { resolve } = require("path");
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { program } = require("commander");
const { createLinks, formatLinkData } = require("./codesandbox-link-helpers");
const logger = console;

program
  .description("Create Sandbox Links for Exercise Files")
  .option(
    "-s, --source <string>",
    "A path to the folder to create the links for (glob supported)",
    "../**/ex-*.ts"
  )
  .option(
    "-o, --output <string>",
    "A folder path to output the results too. If no value is provided the links will be logged in the console",
    ""
  );

program.parse();

const main = async () => {
  const { source, output } = program.opts();

  const linkData = await createLinks(resolve(source));
  const formatted = formatLinkData(linkData);

  if (output) {
    if (!existsSync(output)) {
      mkdirSync(output);
    }

    const filePath = resolve(output, "generated.codesandbox-links.json");

    writeFileSync(filePath, JSON.stringify(formatted));

    logger.log("Successfully Created Links: ");
    logger.log("\t", Object.keys(formatted).length, "links created");
    logger.log("\t", "Outputted results to ", filePath);
  } else {
    logger.log(JSON.stringify(formatted, null, 2));
    logger.log(Object.keys(formatted).length, "links created");
  }
};

main();
