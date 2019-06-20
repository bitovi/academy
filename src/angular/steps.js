const automate = require("guide-automation");
const guide = automate({ spinner: true, log: true });
const fs = require('fs-extra');
const tempDirBasePath = 'temp/';

const checkPathExist = function( path ) {
    return fs.existsSync(path);
};

// Angular project specific
const angularDir = tempDirBasePath + 'angular';
const angularProjectAppDir = process.cwd() + '/' + angularDir + '/place-my-order';

const fileMatchApp = /(app)[.](component)/g;
const fileMatchHome = /(home)[.](component)/g;
const fileMatchRestaurant = /(restaurant)[.](component)/g;


/**
 * Create Temporary Directory
 */



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





/**
 * Generate an App (section from angular guide)
 * @TODO The code from this section below needs to be exported from src/angular/2-building-first-app/step.js
 */
// guide.step("Install angular cli", function(){
//     return guide.executeCommand("npm", ["install", "-g", "@angular/cli@7"]);
// });

// console.log(example( process.cwd() + '/' + angularDir + '/place-my-order'), 'done');


// guide.step("Create a new angular workspace", function(){
//     var init = guide.answerPrompts("ng", ["new", "place-my-order-2", "--prefix pmo", "yes", "less"], {
//         cwd: process.cwd() + '/' + angularDir
//     });
//
//     return init.promise;
// });
//
// guide.step("Copy Files to " + angularDir + "/place-my-order", function(){
//     // if the file name has app.component then dest -> temp/angular/place-my-order/src/app
//     var workingDir = __dirname + '/2-building-first-app';
//
//     return fs.readdir(workingDir).then((files) => {
//         for(let file of files) {
//             while ((fileMatch.exec(file)) !== null) {
//                 fs.copySync(workingDir + '/' + file, angularDir + '/place-my-order/src/app/' + file);
//             }
//         }
//     });
// });
//
// guide.step("Run test", function(){
//     return guide.executeCommand("npm", ["run", "test"], {
//         cwd: process.cwd() + '/' + angularDir + '/place-my-order'
//     });
// });
//


// /**
//  * Creating Components (section from angular guide)
//  * @TODO The code from this section below needs to be exported from src/angular/3-creating-components/step.js
//  */
//  guide.step("Create home component", function(){
//      return guide.executeCommand("ng", ["g", "component", 'home'], {
//          cwd: process.cwd() + '/' + angularDir + '/place-my-order'
//      });
//  });
//
//  guide.step("Install place-my-order-assets in package.json", function(){
//      return guide.executeCommand("npm", ["install", "place-my-order-assets", "--save"], {
//          cwd: process.cwd() + '/' + angularDir + '/place-my-order'
//      });
//  });
//
//  guide.step("Create restaurant component", function(){
//      return guide.executeCommand("ng", ["g", "component", 'restaurant'], {
//          cwd: process.cwd() + '/' + angularDir + '/place-my-order'
//      });
//  });
//
//  guide.step("Copy Files to " + angularDir + "/place-my-order", function(){
//      // if the file name has app.component then dest -> temp/angular/place-my-order/src/app
//      var workingDir = __dirname + '/3-creating-components';
//
//      return fs.readdir(workingDir).then((files) => {
//          for(let file of files) {
//
//              while ((fileMatchApp.exec(file)) !== null) {
//                  fs.copySync(workingDir + '/' + file, angularDir + '/place-my-order/src/app/' + file);
//              }
//
//              while ((fileMatchHome.exec(file)) !== null) {
//                  fs.copySync(workingDir + '/' + file, angularDir + '/place-my-order/src/app/home/' + file);
//              }
//
//              while ((fileMatchRestaurant.exec(file)) !== null) {
//                  fs.copySync(workingDir + '/' + file, angularDir + '/place-my-order/src/app/restaurant/' + file);
//              }
//
//              fs.copySync(workingDir + '/' + 'angular.json', angularDir + '/place-my-order/' + 'angular.json');
//          }
//      });
//  });
//
//  guide.step("Run test", function(){
//      return guide.executeCommand("npm", ["run", "test"], {
//          cwd: process.cwd() + '/' + angularDir + '/place-my-order'
//      });
//  });




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
