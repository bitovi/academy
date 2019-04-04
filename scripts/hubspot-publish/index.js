const HubSpotPublisher = require("./hubspot-publisher");
const ghpages = require('gh-pages');

ghpages.publish('academy', function(err) {
	if(err) {
		console.log("Publish failed with", err);
	} else {
    console.log("Success! Site uploaded to gh-pages")
    const hubSpotPublisher = new HubSpotPublisher();
    hubSpotPublisher.publish();
  }
});
