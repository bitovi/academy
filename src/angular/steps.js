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

// if(!checkPathExist( angularDir ) ) {
//     guide.step("Create " + angularDir + " directory", function(){
//         return fs.mkdirs(angularDir).then(() => {
//             console.log(`Congrats you created directory ${angularDir}.`);
//             return guide.executeCommand("git", ["init"], {
//                 cwd: process.cwd() + '/' + angularDir
//             });
//         }).catch((err) => {
//             console.error(err);
//         });
//     });
// }
//
//
// /**
//  * Generate an App (section from angular guide)
//  * @TODO The code from this section below needs to be exported from src/angular/2-building-first-app/step.js
//  */
// guide.step("Install angular cli", function(){
//     return guide.executeCommand("npm", ["install", "-g", "@angular/cli@7"]);
// });
//
// if(!checkPathExist( angularProjectAppDir ) ) {
//     guide.step("Create a new angular workspace", function(){
//
//         var init = guide.answerPrompts("ng", ["new", "place-my-order", "--prefix", "pmo"], {
//             cwd: process.cwd() + '/' + angularDir
//         });
//
//         //  @TODO work on CLI prompting the questions
//         var answer = init.answer;
//
//         answer(/Would you like to add Angular routing?/, "yes\n");
//         answer(/Which stylesheet format would you like to use?/, "less\n");
//
//
//         return init;
//     });
// }
//
// guide.step("Copy Files to " + angularDir + "/place-my-order", function(){
//     // if the file name has app.component then dest -> temp/angular/place-my-order/src/app
//     var workingDir = __dirname + '/2-building-first-app';
//
//     return fs.readdir(workingDir).then((files) => {
//         for(let file of files) {
//             while ((fileMatchApp.exec(file)) !== null) {
//                 fs.copySync(workingDir + '/' + file, angularDir + '/place-my-order/src/app/' + file);
//             }
//         }
//     });
// });
//
// // guide.step("Run test", function(){
// //     return guide.executeCommand("npm", ["run", "test"], {
// //         cwd: process.cwd() + '/' + angularDir + '/place-my-order'
// //     });
// // });
//
//
// /**
//  * Creating Components (section from angular guide)
//  * @TODO The code from this section below needs to be exported from src/angular/3-creating-components/step.js
//  */
//
//  if(!checkPathExist( homeComponent ) ) {
//      guide.step("Create home component", function(){
//          return guide.executeCommand("ng", ["g", "component", 'home'], {
//              cwd: process.cwd() + '/' + angularDir + '/place-my-order'
//          });
//      });
// }

 guide.step("Install place-my-order-assets in package.json", function(){
     return guide.executeCommand("npm", ["install", "place-my-order-assets", "--save"], {
         cwd: process.cwd() + '/' + angularDir + '/place-my-order'
     });
 });

if(!checkPathExist( restaurantComponent ) ) {
    guide.step("Create restaurant component", function(){
        return guide.executeCommand("ng", ["g", "component", 'restaurant'], {
         cwd: process.cwd() + '/' + angularDir + '/place-my-order'
        });
    });
}

 guide.step("Copy Files to " + angularDir + "/place-my-order for app directory", function(){
     return fs.readdir(creatingComponentsWorkingDir).then((files) => {
         for(let file of files) {

             while ((fileMatchApp.exec(file)) !== null) {
                 fs.copySync(creatingComponentsWorkingDir + '/' + file, angularDir + '/place-my-order/src/app/' + file);
             }
         }
     });
 });

 guide.step("Copy Files to " + angularDir + "/place-my-order for home directory", function(){
     return fs.readdir(creatingComponentsWorkingDir).then((files) => {
         for(let file of files) {

             while ((fileMatchHome.exec(file)) !== null) {
                 fs.copySync(creatingComponentsWorkingDir + '/' + file, angularDir + '/place-my-order/src/app/home/' + file);
             }
         }
     });
 });

 guide.step("Copy Files to " + angularDir + "/place-my-order for restaurant directory", function(){
     return fs.readdir(creatingComponentsWorkingDir).then((files) => {
         for(let file of files) {

             while ((fileMatchRestaurant.exec(file)) !== null) {
                 fs.copySync(creatingComponentsWorkingDir + '/' + file, angularDir + '/place-my-order/src/app/restaurant/' + file);
             }
         }
     });
 });

 guide.step("Copy angular.json file", function(){
     return fs.readdir(creatingComponentsWorkingDir).then((files) => {

        fs.copySync(creatingComponentsWorkingDir + '/' + 'angular.json', angularDir + '/place-my-order/' + 'angular.json');
     });
 });
// @TODO this test will fail because the questions in Step: "Create a new angular workspace" were not prompted.
//  guide.step("Run test", function(){
//      return guide.executeCommand("npm", ["run", "test"], {
//          cwd: process.cwd() + '/' + angularDir + '/place-my-order'
//      });
//  });

guide.step("Git checkout", function(){
    return guide.executeCommand("git", ["checkout", "143-git-commit-plugin"]);
});

guide.step("Git Add Changes", function(){
     return guide.executeCommand("git", ["add", "--all"]);
});

guide.step("Git Commit Changes", function(){
     return guide.executeCommand("git", ["commit", "-m", "temp angular files committed!"]);
});



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
