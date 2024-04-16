import fs from "node:fs/promises"
import path from "node:path"

await crawl(".")

async function crawl(directory) {
  const source = path.join(
    directory,
    "02-setting-up-your-environment",
    "04-solution",
  )
  const packageSource = JSON.parse(
    await fs.readFile(path.join(source, "package.json"), "utf-8"),
  )

  const modules = await fs.readdir(directory)
  for (const module of modules) {
    const stats = await fs.stat(path.join(directory, module))
    if (!stats.isDirectory() || module === "node_modules") {
      continue
    }

    const projects = await fs.readdir(path.join(directory, module))
    for (const project of projects) {
      const stats = await fs.stat(path.join(directory, module, project))
      if (!stats.isDirectory()) {
        continue
      }

      await silence(() =>
        fs.rm(path.join(directory, module, project, "package-lock.json")),
      )
      await silence(() =>
        fs.rm(path.join(directory, module, project, "tsconfig.tsbuildinfo")),
      )
      await silence(() =>
        fs.rm(path.join(directory, module, project, "src/assets/react.svg")),
      )
      await silence(() =>
        fs.rmdir(path.join(directory, module, project, "src/assets")),
      )
      await silence(() =>
        fs.rm(path.join(directory, module, project, "src/App.css")),
      )
      await silence(() =>
        fs.rm(path.join(directory, module, project, "tsconfig.node.json")),
      )
      await silence(() =>
        fs.rm(path.join(directory, module, project, ".eslintrc.cjs")),
      )

      await silence(() =>
        fs.cp(
          path.join(source, "tsconfig.json"),
          path.join(directory, module, project, "tsconfig.json"),
        ),
      )

      await silence(() =>
        fs.cp(
          path.join(source, ".gitignore"),
          path.join(directory, module, project, ".gitignore"),
        ),
      )

      const packageName = path.join(directory, module, project, "package.json")
      let packageFile = JSON.parse(await fs.readFile(packageName, "utf-8"))

      packageFile.scripts = packageSource.scripts
      packageFile.eslintConfig = packageSource.eslintConfig
      packageFile.prettier = packageSource.prettier

      delete packageFile.devDependencies["@typescript-eslint/eslint-plugin"]
      delete packageFile.devDependencies["@typescript-eslint/parser"]
      delete packageFile.devDependencies["eslint-plugin-react-hooks"]
      delete packageFile.devDependencies["eslint-plugin-react-refresh"]

      packageFile.devDependencies["@bitovi/eslint-config"] =
        packageSource.devDependencies["@bitovi/eslint-config"]
      packageFile.devDependencies["prettier"] =
        packageSource.devDependencies["prettier"]

      packageFile.devDependencies = sortObject(packageFile.devDependencies)

      packageFile = sortObject(packageFile, Object.keys(packageSource))

      await fs.writeFile(
        packageName,
        JSON.stringify(packageFile, null, 2) + "\n",
      )
    }
  }
}

async function silence(fn) {
  try {
    await fn()
  } catch (e) {
    //
  }
}

function sortObject(input, keys = Object.keys(input).sort()) {
  const output = {}

  for (const key of keys) {
    output[key] = input[key]
  }

  for (const key of Object.keys(input)) {
    if (keys.includes(key)) continue

    console.log(key)
    output[key] = input[key]
  }

  return output
}
