import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

/**
 * Executes a command in a given directory.
 *
 * @param {string} command The command to execute.
 * @param {string} directory The current working directory for the command.
 * @returns {Promise<void>} A promise that resolves or rejects based on command execution success.
 */
function executeCommand(command, directory) {
    const relativeDirectory = path.relative(import.meta.dirname, directory)

    return new Promise((resolve, reject) => {
        exec(command, { cwd: directory }, (error, stdout, stderr) => {
            if (error) {
                console.error(`\n\nError executing "${command}" in ${relativeDirectory}: ${stdout}${stderr}`);
                reject(error);
            } else {
                console.info(`Successfully executed "${command}" in ${relativeDirectory}`);
                resolve(stdout);
            }
        });
    });
}

/**
 * Process all solution folders within a page directory.
 *
 * @param {string} pageDirectory The page directory path.
 */
async function processSolutions(pageDirectory) {
    const solutionDirectories = fs.readdirSync(pageDirectory, { withFileTypes: true })
        .filter(directory => {
            return directory.isDirectory() && directory.name.endsWith('-solution');
        })
        .map(directory => {
            return path.join(pageDirectory, directory.name);
        });

    for (const solutionDirectory of solutionDirectories) {
        const relativeDirectory = path.relative(import.meta.dirname, solutionDirectory)
        const packageJsonPath = path.join(solutionDirectory, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            console.info(`Found package.json in ${relativeDirectory}`);

            const { scripts } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            const script = 'test';
            if (!scripts[script]) {
                console.info(`Script not found in ${relativeDirectory}`);
                continue;
            }

            await executeCommand('npm ci', solutionDirectory);
            await executeCommand(`npm run ${script}`, solutionDirectory);
            try {
                await executeCommand('rm -rf node_modules', solutionDirectory);
            } catch (error) {
                console.warn('Ignoring error while deleting node_modules:', error);
            }
            console.info("");
        }
    }
}

/**
 * Process all pages within a course directory.
 *
 * @param {string} courseDirectory The course directory path.
 */
async function processPages(courseDirectory) {
    const pageDirectories = fs.readdirSync(courseDirectory, { withFileTypes: true })
        .filter(directory => {
            return directory.isDirectory();
        })
        .map(directory => {
            return path.join(courseDirectory, directory.name);
        });

    for (const pageDirectory of pageDirectories) {
        await processSolutions(pageDirectory);
    }
}

/**
 * Main function to handle the workflow.
 */
async function main() {
    try {
        const basePath = path.join(import.meta.dirname, '..', 'exercises');
        const courseDirectories = fs.readdirSync(basePath, { withFileTypes: true })
            .filter(directory => {
                return directory.isDirectory();
            })
            .filter(directory => {
                return !['react-vite'].includes(directory.name);
            })
            .map(directory => {
                return path.join(basePath, directory.name);
            });

        for (const courseDirectory of courseDirectories) {
            await processPages(courseDirectory);
        }

        console.info('All tests passed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

main();
