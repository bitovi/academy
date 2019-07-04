const fs = require('fs-extra');
const tempDirBasePath = 'temp/';

const checkPathExist = function( path ) {
    return fs.existsSync(path);
};
const angularDir = tempDirBasePath + 'angular';
const fileMatchApp = /(app)[.](component)/g;

const homeComponent = process.cwd() + '/' + angularDir + '/place-my-order/src/app/home';
const restaurantComponent = process.cwd() + '/' + angularDir + '/place-my-order/src/app/restaurant';
const creatingComponentsWorkingDir = __dirname + '/3-creating-components';

const fileMatchHome = /(home)[.](component)/g;
const fileMatchRestaurant = /(restaurant)[.](component)/g;


module.exports = function( guide ) {
    if(!checkPathExist( homeComponent ) ) {
        guide.step("Create home component", function(){
            return guide.executeCommand("ng", ["g", "component", 'home'], {
                cwd: process.cwd() + '/' + angularDir + '/place-my-order'
            });
        });
   }

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
   // @TODO make test work...
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
}
