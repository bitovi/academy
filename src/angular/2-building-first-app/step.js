const fs = require('fs-extra');
const tempDirBasePath = 'temp/';

const checkPathExist = function( path ) {
    return fs.existsSync(path);
};
const angularDir = tempDirBasePath + 'angular';
const angularProjectAppDir = process.cwd() + '/' + angularDir + '/place-my-order';
const fileMatchApp = /(app)[.](component)/g;

module.exports = function( guide ) {
    // @TODO Figure way to skip this command from running if package is already installed 
    guide.step("Install angular cli", function(){
        return guide.executeCommand("npm", ["install", "-g", "@angular/cli@7"]);
    });

    if(!checkPathExist( angularProjectAppDir ) ) {
        guide.step("Create a new angular workspace", function(){

            var init = guide.answerPrompts("ng", ["new", "place-my-order", "--prefix", "pmo"], {
                cwd: process.cwd() + '/' + angularDir
            });

            //  @TODO work on CLI prompting the questions
            var answer = init.answer;

            answer(/Would you like to add Angular routing?/, "yes\n");
            answer(/Which stylesheet format would you like to use?/, "less\n");

            return init.promise;
        });
    }

    guide.step("Copy Files to " + angularDir + "/place-my-order", function(){
        // if the file name has app.component then dest -> temp/angular/place-my-order/src/app
        var workingDir = __dirname + '/2-building-first-app';

        return fs.readdir(workingDir).then((files) => {
            for(let file of files) {
                while ((fileMatchApp.exec(file)) !== null) {
                    fs.copySync(workingDir + '/' + file, angularDir + '/place-my-order/src/app/' + file);
                }
            }
        });
    });

    // guide.step("Run test", function(){
    //     return guide.executeCommand("npm", ["run", "test"], {
    //         cwd: process.cwd() + '/' + angularDir + '/place-my-order'
    //     });
    // });
}
