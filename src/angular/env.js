module.exports = (function Env() {
        const varsObj = {};

        varsObj.localFilePath = process.cwd() + '/';
        varsObj.angularTempDir = 'temp/angular';
        varsObj.fs = require('fs-extra');
        varsObj.isInstalled = require('is-installed');

        varsObj.checkPathExist = ( path ) => {
            return varsObj.fs.existsSync(path);
        };

        // guide directory
        varsObj.angularSection2Dir = __dirname + '/2-building-first-app';
        varsObj.angularSection3Dir = __dirname + '/3-creating-components';

        // temp directory
        varsObj.angularTempProjectDir = varsObj.localFilePath + varsObj.angularTempDir + '/place-my-order';
        varsObj.angularTempHomeComponentDir = varsObj.localFilePath + varsObj.angularTempDir + '/place-my-order/src/app/home';
        varsObj.angularTempRestaurantComponentDir = varsObj.localFilePath + varsObj.angularTempDir + '/place-my-order/src/app/restaurant';

        // regex for matching angular component files
        varsObj.appFiles = /(app)[.](component)/g;
        varsObj.homeFiles = /(home)[.](component)/g;
        varsObj.restaurantFiles = /(restaurant)[.](component)/g;

        return varsObj;

})();
