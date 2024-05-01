import fs from "node:fs/promises"
import path from "node:path"

const courseName = process.argv[2]
const moduleName = process.argv[3]
const projectName = process.argv[4]
if (courseName) {
  await generateCourse(courseName, moduleName, projectName)
} else {
  const courses = await getCourses()
  for (const courseName of courses) {
    await generateCourse(courseName)
  }
}

async function getCourses() {
  const courses = []

  const items = await fs.readdir(import.meta.dirname)
  for (const courseName of items) {
    const coursePath = path.join(import.meta.dirname, courseName)
    const stats = await fs.stat(coursePath)
    if (!stats.isDirectory()) {
      continue
    }

    courses.push(courseName)
  }

  return courses
}

async function generateCourse(courseName, buildModuleName, buildProjectName) {
  const sequence = await getSequence(courseName)
  console.log(`Generating ${courseName}`)

  const build = {}

  for (const { moduleName, projectName, source, target } of sequence) {
    const building =
      !buildModuleName ||
      (moduleName === buildModuleName &&
        (!buildProjectName || projectName === buildProjectName))

    console.log(
      `  ${building ? "Building" : "Processing"} ${moduleName}/${projectName}`,
    )

    await updateBuild(build, source, ".")

    if (building) {
      await generateBuild(build, target)
    }
  }
}

async function getSequence(courseName) {
  const dirname = import.meta.dirname
  const sourceBase = path.join(dirname, courseName)
  const targetBase = path.join(dirname, "..", "exercises", courseName)

  const sequence = []

  const modules = await fs.readdir(sourceBase)
  for (const moduleName of modules) {
    const modulePath = path.join(sourceBase, moduleName)
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

      sequence.push({
        moduleName,
        projectName,
        source: path.join(sourceBase, moduleName, projectName),
        target: path.join(targetBase, moduleName, projectName),
      })
    }
  }

  return sequence
}

async function updateBuild(build, source, directory) {
  const items = await fs.readdir(path.join(source, directory))
  for (const itemName of items) {
    const buildPath = path.join(directory, itemName)
    const fullPath = path.join(source, buildPath)

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
      await updateBuild(build, source, buildPath)
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
