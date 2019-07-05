module.exports = function( guide, globalVars ) {
    /**
     * @Step 3
     */
    if(!globalVars.isInstalled.sync('@angular/cli')) {
        guide.step("Install angular cli", function(){
            return guide.executeCommand("npm", ["install", "-g", "@angular/cli@7"]);
        });
    }

    /**
     * @Step 4
     * @TODO work on CLI prompting the questions
     */
    if(!globalVars.checkPathExist( globalVars.angularTempProjectDir ) ) {
        guide.step("Create a new angular workspace", function(){

            var init = guide.answerPrompts("ng", ["new", "place-my-order", "--prefix", "pmo"], {
                cwd: globalVars.localFilePath + globalVars.angularTempDir
            });

            var answer = init.answer;

            answer(/Would you like to add Angular routing/, "yes\n");
            answer(/Which stylesheet format would you like to use/, "less\n");

            return init.promise;
        });
    }

    /**
     * @Step 5
     */
    guide.step("Copy Files from /2-building-first-app to /place-my-order", function(){

        return globalVars.fs.readdir(globalVars.angularSection2Dir).then((files) => {
            for(let file of files) {
                while ((globalVars.appFiles.exec(file)) !== null) {
                    globalVars.fs.copySync(globalVars.angularSection2Dir + '/' + file, globalVars.angularTempProjectDir + '/place-my-order/src/app/' + file);
                }
            }
        });
    });

    /**
     * @Step 6
     * @TODO figure out way to launch browser and move to the next guide steps with pausing the terminal: http://recordit.co/cVX5i4VlX5
     */
    // guide.step("Start Local Server", function(){
    // 	return guide.executeCommand("npm", ["run", "start"], {
    //         cwd: globalVars.angularTempProjectDir
    //     });
    // });
    //
    //
    // guide.step("Launch Browser", function(){
    //     return guide.launchBrowser("http://localhost:4200");
    // });


    /**
     * @Step 7
     * @TODO Get test to pass
     */
    // guide.step("Run test", function(){
    //     return guide.executeCommand("npm", ["run", "test"], {
    //         cwd: process.cwd() + '/' + angularDir + '/place-my-order'
    //     });
    // });


    /**
     * @Step 8
     */
    guide.step("Git Checkout - Step #2", function(){
        return guide.executeCommand("git", ["checkout", "-b", "143-git-commit-plugin-step2"]);
    });

    guide.step("Git Add Changes - Step #2", function(){
         return guide.executeCommand("git", ["add", "--all"]);
    });

    guide.step("Git Commit - Changes Step #2", function(){
         return guide.executeCommand("git", ["commit", "-m", "Changes committed for /2-building-first-app!"]);
    });
}
