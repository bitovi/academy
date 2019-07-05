const automate = require("guide-automation");
const guide = automate({ spinner: true, log: true });
const globalVars = require("./env");
const step2 = require("./2-building-first-app/step");
const step3 = require("./3-creating-components/step");

/**
 * @Step 1
 */
guide.step("Remove existing dependencies", function(){

});

/**
 * @Step 2
 */
if(!globalVars.checkPathExist( globalVars.angularTempDir ) ) {
    guide.step("Create temp directory", function(){
        return globalVars.fs.mkdirs(globalVars.angularTempDir).then(() => {
            console.log(`Congrats you created directory ${globalVars.angularTempDir}.`);
            return guide.executeCommand("git", ["init"], {
                cwd: globalVars.localFilePath + globalVars.angularTempDir
            });
        }).catch((err) => {
            console.error(err);
        });
    });
}

step2(guide, globalVars);
// step3(guide);


/**
 * Run the test
 */
guide.run().then(
	function(){
		console.log("All done!");
		return 0;
	},
	function(err){
		console.error("Oh no", err.message, err.stack, err);
		return 1;
	}
).then(function(exitCode){
	console.log("Exiting", exitCode);
	process.exit(exitCode);
});
