import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import os from 'os';

// Parse command line arguments
const args = process.argv.slice(2);
const runBenchmark = args.includes('--benchmark');
if (runBenchmark) {
    console.info('Running benchmark…')
}

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
 * Process a single solution folder.
 *
 * @param {string} solutionDirectory The solution directory path.
 */
async function processSolution(solutionDirectory) {
    const relativeDirectory = path.relative(import.meta.dirname, solutionDirectory);
    const packageJsonPath = path.join(solutionDirectory, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        console.info(`Found package.json in ${relativeDirectory}`);

        const { scripts } = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        if (!scripts.test) {
            console.info(`Tests not found in ${relativeDirectory}`);
            return;
        }

        await executeCommand('npm ci', solutionDirectory);
        if (scripts.typecheck) {
            await executeCommand('npm run typecheck', solutionDirectory);
        }
        await executeCommand('npm run test', solutionDirectory);

        try {
            await executeCommand('rm -rf node_modules', solutionDirectory);
        } catch (error) {
            console.warn('Ignoring error while deleting node_modules:', error);
        }
    }
}

/**
 * Collect all solution folders within a directory.
 *
 * @param {string} directory The directory path.
 * @returns {string[]} Array of solution folder paths.
 */
function collectSolutionFolders(directory) {
    const solutionFolders = [];

    const collect = (currentPath) => {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const entryPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                if (entry.name.endsWith('-solution')) {
                    solutionFolders.push(entryPath);
                } else {
                    collect(entryPath);
                }
            }
        }
    };

    collect(directory);

    return solutionFolders;
}

/**
 * Process solution folders with a specified parallel limit.
 *
 * @param {string[]} solutionFolders The array of solution folder paths.
 * @param {number} parallelLimit The number of parallel processes to use.
 */
async function processSolutionsWithLimit(solutionFolders, parallelLimit) {
    const chunks = [];
    for (let i = 0; i < solutionFolders.length; i += parallelLimit) {
        chunks.push(solutionFolders.slice(i, i + parallelLimit));
    }

    for (const chunk of chunks) {
        await Promise.all(chunk.map(processSolution));
    }
}

/**
 * Main function to handle the workflow.
 */
async function main() {
    console.time('Test run time');
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

        let allSolutionFolders = [];

        for (const courseDirectory of courseDirectories) {
            allSolutionFolders = allSolutionFolders.concat(collectSolutionFolders(courseDirectory));
        }

        // The default amount of parallelism a program should use:
        const availableParallelism = os.availableParallelism();

        if (runBenchmark) {
            // For benchmarking, allow the parallelism to exceed the max so the max can be properly tested.
            // Clamp the parallelism to between 1–8 because the tests are flakey with any more parallelism.
            const parallelLimit = Math.min(8, Math.max(1, availableParallelism + 1));

            const times = [];

            for (let limit = parallelLimit; limit >= 1; limit--) {
                console.info(`Starting with parallel limit: ${limit}`);
                const label = `Time for parallel limit ${limit}`;
                console.time(label);
                const startTime = process.hrtime();
                await processSolutionsWithLimit(allSolutionFolders, limit);
                const endTime = process.hrtime(startTime);
                console.timeEnd(label);
                const timeTaken = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to milliseconds
                times.push({ limit, time: timeTaken, formatted: formatMilliseconds(timeTaken) });
                console.info(`Finished with parallel limit: ${limit}`);
            }
            console.info('Benchmark results:');
            times.forEach(({ limit, time }) => {
                console.info(`Parallel limit ${limit}: ${time}`);
            });
            console.table(times);

        } else {
            // No benchmarking, normal test run.

            // Clamp the parallelism to between 1–3:
            const parallelLimit = Math.min(3, Math.max(1, availableParallelism));
            await processSolutionsWithLimit(allSolutionFolders, parallelLimit);
        }

        console.timeEnd('Test run time');
        console.info('All tests passed successfully!');
        process.exit(0);
    } catch (error) {
        console.timeEnd('Test run time');
        console.error('Test failed:', error);
        process.exit(1);
    }
}

function formatMilliseconds(ms) {
    const minutes = Math.floor(ms / (60 * 1000));
    ms %= 60 * 1000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor(ms % 1000); // Drop the fractional part

    // Pad seconds and milliseconds with leading zeros if necessary
    const paddedSeconds = seconds.toString().padStart(2, '0');
    const paddedMilliseconds = milliseconds.toString().padStart(3, '0');

    return `${minutes}:${paddedSeconds}.${paddedMilliseconds}`;
}

main();
