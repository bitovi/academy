const readline = require('readline');
var colors = require('colors');

const question = (q) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    let response;
    rl.setPrompt(q);
    rl.prompt();
    return new Promise(( resolve , reject) => {
        rl.on('line', (userInput) => {
            response = userInput;
            rl.close();
        });
        rl.on('close', () => {
            resolve(response);
        });
    });
};

const promptUser = async (prompt, yesCallback=()=>{}, noCallback=()=>{}) => {
  const YES_ANSWER = 'y'
  const response = await question(`${prompt} ${YES_ANSWER}/n: `);
  if(response === YES_ANSWER){
    yesCallback();
  } else {
    noCallback();
  }
}

const promptDeleteFiles = async (filesToBeDeleted, deleteAllCallback, chooseCallback) => {
  if(filesToBeDeleted.length > 0){
    const numFiles = filesToBeDeleted.length.toString().cyan
    const prompt = `\n${numFiles} pages exist on Bitovi.com that are not in the local project. Select an option below to continue:
      1. Keep all files not in local project
      2. Individually choose for each file
      3. Delete all files not in local project\n\n`;
    const response = await question(prompt);

    if(response == 2) {
      chooseCallback();
    } else if(response == 3) {
      promptUser(`Are you sure you want to delete all ${numFiles} remotely`, deleteAllCallback);
    }
  }
}

const confirmDeleteFile = async (fileSlug, yesCallback) => {
  const deleteFilePrompt = `Delete '${fileSlug.cyan}' remotely?`
  return await promptUser(deleteFilePrompt, yesCallback);
}

module.exports = {
  confirmDeleteFile,
  promptDeleteFiles
}

