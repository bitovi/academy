var packages = require("./packages");
require("./styles/styles.less!");
window.PACKAGES = packages;

(function () {
  var all_links = document.querySelectorAll("a");
  for (var i = 0; i < all_links.length; i++) {
    var a = all_links[i];
    if (a.hostname != location.hostname) {
      a.rel = "noopener";
      a.target = "_blank";
    }
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
		console.log("You're deleting the Subscription Modal, aren't you?")
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

	if (document.querySelector && document.querySelector(".sidebar-left > ul > li.expanded > ul > li.current")) {
		// ^ if we're on an internal page of the current academy lesson
		if (!(/(^|;)\s*academyemailprovided=true(;|$)/g.test(decodeURIComponent(document.cookie)))
			&& (location.hostname !== "localhost" && location.hostname !== "127.0.0.1")) {
			// ^ if the email-already-entered cookie doesn't exist
			setTimeout(openModal, 2 * 1000) // after 2 sec, open the modal 
		}
	}
})();
