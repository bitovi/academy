import fs from "node:fs/promises"
import path from "node:path"

import { ESLint } from "eslint"
import * as prettier from "prettier"

await crawl("../../src/react-vite")

async function crawl(directory) {
  const items = await fs.readdir(directory)

  for (const item of items) {
    const full = path.join(directory, item)
    const stats = await fs.stat(full)
    if (stats.isDirectory()) {
      await crawl(full)
      continue
    }

    const filename = full
    const [ext] = filename.match(/\.[a-z0-9]+$/)
    const contents = await fs.readFile(filename, "utf-8")

    if (ext.match(/\.(j|t)sx?$/)) {
      await validate(filename, "tsx", contents)
    }

    if (ext === ".md") {
      if (contents.includes("TODO")) console.warn(`TODO: ${filename}`)

      const codes = await extractCodeFromMarkdown(contents)
      for (const { language, code } of codes) {
        await validate(filename, language, code)
      }
    }
  }
}

async function extractCodeFromMarkdown(markdown) {
  return [...markdown.matchAll(/```(.+?)\n([^]+?)\n```/gm)]
    .map(([, language, code]) => ({ language, code }))
    .filter(
      ({ language }) => !["bash", "code", "shell", "css"].includes(language),
    )
}

async function validate(filename, language, code) {
  try {
    if (language === "html") {
      return await validateHTML(code)
    }

    if (language === "tsx") {
      return await validateTSX(code)
    }

    if (language === "tsx-error") {
      return
    }

    throw new Error(`Unknown code language: ${language}`)
  } catch (error) {
    console.error(`Error in ${filename}: ${error.message}`)
  }
}

async function validateHTML(code) {
  // TODO: implement
  // ensure two spaces
  // ensure double quotes
}

async function validateTSX(code) {
  // TODO: tsc

  // eslint
  const eslinter = new ESLint({
    overrideConfig: {
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "import/no-named-as-default": "off",
        "no-console": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
    },
  })

  const [eslintError] = await eslinter.lintText(code)

  const eslintMessages = eslintError.messages.filter(({ ruleId, message }) => {
    if (
      ruleId === "no-undef" &&
      (message === "'React' is not defined." ||
        message === "'ReactDOM' is not defined.")
    ) {
      return false
    }

    if (
      (ruleId === "no-undef" || ruleId === "react/jsx-no-undef") &&
      (false ||
        // general ignores
        message.includes("'a'") ||
        message.includes("'b'") ||
        message.includes("'it'") ||
        message.includes("'expect'") ||
        message.includes("'render'") ||
        // file-specific ignores
        message.includes("'Button'") ||
        message.includes("'SubmitButton'") ||
        message.includes("'stringifyQuery'") ||
        message.includes("'EmailInputField'") ||
        message.includes("'FormSelect'") ||
        message.includes("'newOrder'") ||
        message.includes("'setSelectedOrders'") ||
        message.includes("'setUpdatedRestaurant'") ||
        message.includes("'updatedRestaurant'") ||
        false)
    ) {
      return false
    }

    return true
  })

  if (eslintMessages.length > 0) {
    // console.log(eslintMessages)
    // console.log(code)

    throw new Error(
      eslintMessages
        .map(({ ruleId, message }) => `${ruleId}: ${message}`)
        .join(" "),
    )
  }

  // prettier
  const prettierError = await prettier.check(code.trimEnd() + "\n", {
    parser: "typescript",
    semi: false,
    trailingComma: "all",
  })

  if (!prettierError) {
    // const codePrettiered = await prettier.format(code, {
    //   parser: "typescript",
    //   semi: false,
    //   trailingComma: "all",
    // })

    // console.log(code)
    // console.log(codePrettiered)
    // console.log("")

    throw new Error("Prettier error.")
  }
}
