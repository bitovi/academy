var ghpages = require('gh-pages');

ghpages.publish('doc', function(err) {
	if(err) {
		console.log("Publish failed with", err);
	}
});
