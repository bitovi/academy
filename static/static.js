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
				if (element) {
					articleContainer.scrollTop  = element.offsetTop - 60; // ~60px for the navigation height
				}
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

(function () {
	/* Bitovi Academy Soft Lock - Join Mailing List to Continue */

	var academyContactEmailSubmitted = function () {
		var cname = "academyemailprovided"
		var cvalue = "true"
		var exdays = 730

		document.getElementById("email-modal").style.display = "none"

		// set cookie to not prompt again
		const d = new Date()
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
		let expires = "expires="+ d.toUTCString()
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
	}

	var openModal = function () {
		console.log("You're deleing the Subscription Modal, aren't you?")
		console.log("That's okay; Looking for a job? Once you finish the course, head over to https://www.bitovi.com/jobs")

		document.getElementById("email-modal").style.display = "block"

		hbspt.forms.create({
			region: "na1",
			portalId: "2171535",
			formId: "822ba57d-1707-4eb0-9b1b-ef5815f33506",
			target: "#academy-hubspot-form-embed",
			onFormSubmitted: academyContactEmailSubmitted
		})
	}

	var checkScrollDepth = function () {
		var main = document.querySelector(".content > .main")

		function amountScrolled () {
			var mainHeight = Math.max(main.scrollHeight, main.offsetHeight, main.clientHeight)
			var trackLength = mainHeight - (
				window.innerHeight || (document.documentElement || document.body).clientHeight
			)
			var pageScrolled = Math.floor(main.scrollTop / trackLength * 100)

			if (pageScrolled >= 20) {
				main.removeEventListener("scroll", amountScrolled)
				openModal()
			}
		}

		main.addEventListener("scroll", amountScrolled)
	}

	if (document.querySelector && document.querySelector(".sidebar-left > ul > li.expanded > ul > li.current")) {
		// ^ if we're on an internal page of the current academy lesson
		if (!(/(^|;)\s*academyemailprovided=true(;|$)/g.test(decodeURIComponent(document.cookie)))) {
			// ^ if the email-already-entered cookie doesn't exist
			setTimeout(checkScrollDepth, 30 * 1000) // after 30 sec, if/as soon as scrolled 20% of page, open the modal 
		}
	}
})();
