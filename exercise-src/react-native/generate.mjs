import fs from "node:fs/promises"
import path from "node:path"

const sequence = await getSequence()

const build = {}
for (const { source, target } of sequence) {
  console.log(`Generating ${source}`)
  await updateBuild(build, source, ".")
  await generateBuild(build, target)
}

async function getSequence() {
  const sequence = []

  const modules = await fs.readdir(".")
  for (const moduleName of modules) {
    const modulePath = path.join(".", moduleName)
    const stats = await fs.stat(modulePath)
    if (!stats.isDirectory()) {
      continue
    }

    const projects = await fs.readdir(modulePath)
    for (const projectName of projects) {
      const projectPath = path.join(modulePath, projectName)
      const stats = await fs.stat(projectPath)
      if (!stats.isDirectory()) {
        continue
      }

      const contents = (await fs.readdir(projectPath)).filter(
        (item) => ![".DS_Store"].includes(item),
      )
      if (contents.length === 0) {
        continue
      }

      sequence.push({
        source: projectPath,
        target: path.join("../../exercises/react-native", projectPath),
      })
    }
  }

  return sequence
}

async function updateBuild(build, target, directory) {
  const items = await fs.readdir(path.join(target, directory))
  for (const itemName of items) {
    const buildPath = path.join(directory, itemName)
    const fullPath = path.join(target, buildPath)

    if (itemName === ".delete") {
      const toDelete = (await fs.readFile(fullPath, "utf-8")).trim().split("\n")

      for (const deleteName of toDelete) {
        const deleteFile = path.join(directory, deleteName)
        delete build[deleteFile]

        const deleteDirectory = path.join(deleteFile, "#").slice(0, -1)
        for (const buildFile in build) {
          if (buildFile.startsWith(deleteDirectory)) {
            delete build[buildFile]
          }
        }
      }

      continue
    }

    const stats = await fs.stat(fullPath)
    if (stats.isDirectory()) {
      await updateBuild(build, target, buildPath)
    } else {
      build[buildPath] = fullPath
    }
  }
}

async function generateBuild(build, target) {
  for (const [buildFile, sourceFile] of Object.entries(build)) {
    const destFile = path.join(target, buildFile)

    await fs.mkdir(path.dirname(destFile), { recursive: true })
    await fs.copyFile(sourceFile, destFile)
  }
}
