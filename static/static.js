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
  /* Set --nav-header-height CSS variable based on actual header height */
  // Note: If the HubSpot template is updated to no longer use a header module above the Academy-repo content, this should also be updated/removed
 
 var setNavHeaderHeight = function () {
   var bodyWrapper = document.querySelector('.body-wrapper.hs-site-page'); // target the hubspot-generated wrapper
   var header = bodyWrapper ? bodyWrapper.firstElementChild : null;
    
    if (header) {
      var height = header.offsetHeight;
      document.documentElement.style.setProperty('--nav-header-height', height + 'px');
    }
  };

  // Set on initial load
  setNavHeaderHeight();

  // Update on window resize (header height may change at different breakpoints)
  var resizeDebounced = debounce(setNavHeaderHeight, 100);
  window.addEventListener('resize', resizeDebounced);

  // Re-check after all resources load (images/fonts can affect header height)
  window.addEventListener('load', setNavHeaderHeight);
})();

(function () {
  document.body.addEventListener("click", function (event) {
    if (event.target.matches(".bit-academy-fullscreen")) {
      document.body.classList.toggle("bit-academy-show-fullscreen");
    }
  });
})();

(function () {
  /*
    The bit-docs-html-toc package will listen for scrolls to the element
    specified by heading-container-selector, but with our CSS, this will
    only work when the document scroll events are listened to.
  */
  var highlight = debounce((function () {
    document.querySelector("bit-toc").highlight();

    var elementToScroll = document.querySelector(".list-items");
    var article = document.querySelector(".main");
    var distance = (window.scrollY + article.offsetHeight / 2) / document.body.scrollHeight;
    elementToScroll.scrollTop = (elementToScroll.scrollHeight * distance) - (elementToScroll.offsetHeight / 2);
  }).bind(this), 1);

  // Listen for scroll events
  document.addEventListener("scroll", highlight);

  // Update the highlighting immediately on page load
  highlight();
})();

(function () {
  /* Bitovi Academy Soft Lock - Join Mailing List to Continue */

  var academyContactEmailSubmitted = function () {
    var cname = "academyemailprovided";
    var cvalue = "true";
    var exdays = 730;

    document.getElementById("email-modal").style.display = "none";

    // set cookie to not prompt again
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  var openModal = function () {
    console.log("You’re deleting the Subscription Modal, aren’t you?");
    console.log(
      "That’s okay; looking for a job? Once you finish the course, head over to https://www.bitovi.com/jobs"
    );

    const modal = document.getElementById("email-modal");
    modal.style.display = "block";
    // Close modal when clicking backdrop
    Array.from(modal.querySelectorAll('.email-modal-backdrop')).forEach(element => {
      element.addEventListener("click", academyContactEmailSubmitted);
    });
    // Close modal when clicking close icon in upper right
    document.getElementById("email-modal-close").addEventListener("click", academyContactEmailSubmitted);
    modal.focus();

    hbspt.forms.create({
      region: "na1",
      portalId: "2171535",
      formId: "822ba57d-1707-4eb0-9b1b-ef5815f33506",
      target: "#academy-hubspot-form-embed",
      onFormSubmitted: academyContactEmailSubmitted,
    });
  };

  if (
    document.querySelector &&
    document.querySelector(".sidebar-left > ul > li.expanded > ul > li.current")
  ) {
    // ^ if we’re on an internal page of the current academy lesson
    if (
      !/(^|;)\s*academyemailprovided=true(;|$)/g.test(
        decodeURIComponent(document.cookie)
      ) &&
      location.hostname !== "localhost" &&
      location.hostname !== "127.0.0.1"
    ) {
      // ^ if the email-already-entered cookie doesn’t exist
      setTimeout(openModal, 2 * 1000); // after 2 sec, open the modal
    }
  }
})();

function debounce(func, wait) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      func.apply(context, args);
    };

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (!timeout) {
      func.apply(context, args);
    }
  };
}