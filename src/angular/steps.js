const step2 = require("./2-building-first-app/step");
const step3 = require("./3-creating-components/step");

const automate = require("guide-automation");
const guide = automate({ spinner: true, log: true });

// @TODO Figure way to make variables below global so multiple files can use them
const fs = require('fs-extra');
const tempDirBasePath = 'temp/';

const checkPathExist = function( path ) {
    return fs.existsSync(path);
};
const angularDir = tempDirBasePath + 'angular';

const angularProjectAppDir = process.cwd() + '/' + angularDir + '/place-my-order';
const homeComponent = process.cwd() + '/' + angularDir + '/place-my-order/src/app/home';
const restaurantComponent = process.cwd() + '/' + angularDir + '/place-my-order/src/app/restaurant';
const creatingComponentsWorkingDir = __dirname + '/3-creating-components';

const fileMatchApp = /(app)[.](component)/g;
const fileMatchHome = /(home)[.](component)/g;
const fileMatchRestaurant = /(restaurant)[.](component)/g;


/**
 * Set up the project
 */
guide.step("Remove existing dependencies", function(){

});

if(!checkPathExist( angularDir ) ) {
    guide.step("Create " + angularDir + " directory", function(){
        return fs.mkdirs(angularDir).then(() => {
            console.log(`Congrats you created directory ${angularDir}.`);
            return guide.executeCommand("git", ["init"], {
                cwd: process.cwd() + '/' + angularDir
            });
        }).catch((err) => {
            console.error(err);
        });
    });
}

step2(guide);
step3(guide);



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
