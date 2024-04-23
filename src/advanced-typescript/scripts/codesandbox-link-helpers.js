const { promisify } = require("util");
const glob = promisify(require("glob"));

const LZString = require("lz-string");

const { readFileSync } = require("fs");

// From on codesandbox https://github.com/codesandbox/codesandbox-importers/blob/e68dcdd289c32045293db862b1897130a0825e0a/packages/import-utils/src/api/define.ts#L11
const compress = (string) => {
  return LZString.compressToBase64(string)
    .replace(/\+/g, `-`) // Convert '+' to '-'
    .replace(/\//g, `_`) // Convert '/' to '_'
    .replace(/=+$/, ``); // Remove ending '='
};

/**
 * Takes an array of globs/files and creates an object containing the files names and the file
 * content.
 *
 * @param {string[]} source The file paths to get
 * @returns {fileName: string, contents: string}
 */
const getFiles = (source) =>
  glob(source).then((files) =>
    files.map((filePath) => ({
      filePath,
      contents: readFileSync(filePath, "utf8"),
    }))
  );

/**
 * Creates the parameters for the codesandbox link
 *
 * @param {fileName: string, contents: string} fileInformation
 * @returns {fileName: string, contents: string, parameters: string, codeSandboxFileName: string}
 */
const createParameters = (fileInformation) => {
  const { filePath, contents } = fileInformation;

  /**
   * This part takes advantage of the advanced ts courses file structure.
   * It takes splits the file path at advanced-typescript and grabs the section (02-generics-with-constraints)
   * and uses the section name as the codesandbox file name. If it can’t split the path, the codesandbox file name
   * defaults to the file name
   */
  const advancedTypeScriptSectionInfo = filePath.split(
    "/advanced-typescript/"
  )?.[1];

  const splitFilePath = filePath.split("/");
  let codesandboxFileName = splitFilePath[splitFilePath.length - 1];

  if (advancedTypeScriptSectionInfo) {
    const splitSection = advancedTypeScriptSectionInfo.split("/");

    // section-filename
    codesandboxFileName = `${splitSection[0]}-${
      splitSection[splitSection.length - 1]
    }`;
  }

  const parameters = {
    files: {
      "package.json": {
        content: {
          dependencies: {
            typescript: "latest",
          },
        },
      },
      [codesandboxFileName]: {
        content: contents,
      },
    },
  };

  return {
    ...fileInformation,
    codesandboxFileName,
    parameters: JSON.stringify(parameters),
  };
};

/**
 * Compresses the parameters using LZString
 *
 * @param {fileName: string, contents: string, parameters: string, codeSandboxFileName: string} fileInformation
 * @returns {fileName: string, contents: string, parameters: string, codeSandboxFileName: string}
 */
const compressParameters = (fileInformation) => {
  const { parameters } = fileInformation;

  return {
    ...fileInformation,
    parameters: compress(parameters),
  };
};

/**
 * Creates the sandbox url
 *
 * @param {fileName: string, contents: string, parameters: string, codeSandboxFileName: string} fileInformation
 * @returns {fileName: string, contents: string, parameters: string, codeSandboxFileName: string, url: string}
 */
const createURL = (fileInformation) => ({
  ...fileInformation,
  url: `https://codesandbox.io/api/v1/sandboxes/define?parameters=${fileInformation.parameters}`,
});

/**
 * Given a glob path, creates the codesandbox link data
 *
 * @param {string} fileSources
 * @returns {fileName: string, contents: string, parameters: string, codeSandboxFileName: string}
 */
const createLinks = async (fileSources) => {
  const files = await getFiles(fileSources);

  return files.map(createParameters).map(compressParameters).map(createURL);
};

/**
 * Takes the link data and formats it to be an easily readable object
 *
 * @param {fileName: string, contents: string, parameters: string, codeSandboxFileName: string} linkData
 * @returns {object} {[filePath]: url}
 */
const formatLinkData = (linkData) => {
  return linkData.reduce((prev, curr) => {
    const reducedFilePath = curr.filePath.split("/advanced-typescript/")?.[1];
    const dataKey = reducedFilePath || curr.filePath;

    return {
      ...prev,
      [dataKey]: curr.url,
    };
  }, {});
};

module.exports = { createLinks, formatLinkData };
