var packages = require("./packages");
require("./styles/styles.less!");
window.PACKAGES = packages;

(function(){
	document.body.addEventListener("click", function(event){
		if(event.target.matches(".bit-academy-fullscreen")) {
			document.body.classList.toggle("bit-academy-show-fullscreen")
		}
	});

})();


(function(){

	var articleContainer = document.querySelector("article.main");

	if(articleContainer && window.history) {
		var windowLoaded = false;
		var pageScrollTimer;

		// the page can change its layout up until load
		window.addEventListener("load", function(){
			windowLoaded = true;
		});
		// only wait 1 second at most
		setTimeout(function(){
			windowLoaded = true;
		},1000);

		function setArticleScroll(){
			var articleScroll = window.history.state && window.history.state.articleScroll;
			if(articleScroll) {
				articleContainer.scrollTop = articleScroll;
			} else if (window.location.hash) {
				//if there's no state before and the URL has a hash eg. #collecting-data
				//then let's scroll to #collecting-data element
				var element = document.querySelector(window.location.hash);
				articleContainer.scrollTop  = element.offsetTop - 60; // ~60px for the navigation height
			}
		}
		setArticleScroll();

		// If there's a scroll before page load, we ignore saving the spot
		// and instead try to force the original position
		articleContainer.addEventListener("scroll", function(){
			if(windowLoaded) {
				clearTimeout(pageScrollTimer);
				pageScrollTimer = setTimeout(function(){
					window.history.replaceState({ articleScroll: articleContainer.scrollTop }, null, window.location.href);
				},50);
			} else {
				setArticleScroll();
			}
		});
	}
})();
