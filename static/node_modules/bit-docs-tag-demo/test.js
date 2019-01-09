var assert = require("assert");
var express = require("express");
var puppeteer = require("puppeteer");

describe("bit-docs-tag-demo", function() {
	var ctx = this;
	var server = express();

	before(function() {
		var serverPromise = new Promise(function(resolve, reject) {
			server = server.use("/", express.static(__dirname)).listen(8081, resolve);
			server.on("error", reject);
		});

		var puppeteerPromise = puppeteer
			.launch({ args: ["--no-sandbox"] })
			.then(function(b) {
				ctx.browser = b;
			});

		return Promise.all([serverPromise, puppeteerPromise]);
	});

	after(function() {
		ctx.browser.close();
		server.close();
	});

	describe("demo widget", function() {
		function basicsWork() {
			it("exists on page", function() {
				return ctx.page
					.waitForFunction(function() {
						return !!window.PACKAGES;
					})
					.then(function() {
						return ctx.page.evaluate(function() {
							return {
								hasPackages: !!window.PACKAGES,
								hasWrapper: !!document.querySelectorAll(".demo_wrapper").length,
								wasInjected: !!document.querySelectorAll(".demo_wrapper .demo")
									.length
							};
						});
					})
					.then(function(r) {
						assert(r.hasPackages, "has global PACKAGES");
						assert(r.hasWrapper, "wrapper exists");
						assert(r.wasInjected, "injected into wrapper");
					});
			});

			describe("tabs and contents", function() {
				it("has three", function() {
					return ctx.page
						.evaluate(function() {
							return {
								tabs: document.querySelectorAll(".tab").length,
								tabContent: document.querySelectorAll(".tab-content").length
							};
						})
						.then(function(r) {
							assert.equal(r.tabs, 3, "there are three tabs");
							assert.equal(r.tabContent, 3, "there are three tab contents");
						});
				});

				it("only one active", function() {
					return ctx.page
						.evaluate(function() {
							return {
								activeTabs: document.querySelectorAll(".tab.active").length,
								activeTabContent: document.querySelectorAll(
									'.tab-content:not([style*="none"])'
								).length
							};
						})
						.then(function(r) {
							assert.equal(r.activeTabs, 1, "only one tab is active");
							assert.equal(r.activeTabContent, 1, "only one tab is active");
						});
				});

				it("defaults to demo", function() {
					return ctx.page
						.evaluate(function() {
							var tab = document.querySelector(".tab.active");
							return {
								tabText: tab.textContent,
								tabData: tab.dataset.tab,
								isVisible:
									document.querySelector('[data-for="demo"]').style.display ===
									""
							};
						})
						.then(function(r) {
							assert.equal(r.tabText, "Demo", "'Demo' is active tab text");
							assert.equal(r.tabData, "demo", "demo is active data-tab");
							assert(r.isVisible, "demo tab content is visible");
						});
				});
			});

			describe("clicking HTML tab", function() {
				before(function() {
					return ctx.page.click('[data-tab="html"]');
				});

				it("changes tab and content", function() {
					return ctx.page
						.evaluate(function() {
							return {
								activeTab: document.querySelector(".tab.active").dataset.tab,
								isVisible:
									document.querySelector('[data-for="html"]').style.display ===
									""
							};
						})
						.then(function(r) {
							assert.equal(r.activeTab, "html", "html is active data-tab");
							assert(r.isVisible, "html tab content is visible");
						});
				});
			});
		}

		function iframeAssert(path, regex) {
			describe("iframe (" + path + ".html)", function() {
				it("has correct url and content", function() {
					return ctx.page
						.waitForFunction(function() {
							var iframe = document.querySelector("iframe");
							var iframeDocument = iframe.contentWindow.document;

							return /Hello world/.test(iframeDocument.body.innerHTML);
						})
						.then(function() {
							return ctx.page.evaluate(function() {
								var iframe = document.querySelector("iframe");
								var iframeDocument = iframe.contentWindow.document;

								return {
									src: iframe.src,
									url: iframe.contentWindow.document.URL,
									html: iframeDocument.body.innerHTML
								};
							});
						})
						.then(function(r) {
							assert.equal(
								r.src,
								"http://127.0.0.1:8081/test/demos/" + path + ".html"
							);
							assert.equal(
								r.url,
								"http://127.0.0.1:8081/test/demos/" + path + ".html"
							);

							if (regex instanceof RegExp) {
								assert(regex.test(r.html));
							}
						});
				});
			});
		}

		function dataForHtml(strings) {
			describe("data-for=html", function() {
				it("has correct content", function() {
					return ctx.page
						.evaluate(function() {
							return document.querySelector("[data-for=html] pre").textContent;
						})
						.then(function(text) {
							var content =
								strings instanceof Array ? strings.join("") : strings;
							assert.equal(
								text
									.replace("\n", "")
									.replace(/;\s+/gm, ";")
									.trim(),
								content
							);
						});
				});
			});
		}

		function dataForJs(strings) {
			describe("data-for=js", function() {
				it("has correct content", function() {
					return ctx.page
						.evaluate(function() {
							return document.querySelector("[data-for=js] pre").textContent;
						})
						.then(function(text) {
							var content =
								strings instanceof Array ? strings.join("") : strings;
							assert.equal(
								text
									.replace("\n", "")
									.replace(/;\s+/gm, ";")
									.trim(),
								content
							);
						});
				});
			});
		}

		describe("with ids", function() {
			before(function() {
				return ctx.browser.newPage().then(function(p) {
					ctx.page = p;
					return ctx.page.goto("http://127.0.0.1:8081/test/temp/withIds.html");
				});
			});

			after(function() {
				return ctx.page.close().then(function() {
					ctx.page = null;
				});
			});

			describe("basics", function() {
				basicsWork();
			});

			describe("Demo", function() {
				iframeAssert("demo-with-ids", /it worked/);
			});

			describe("HTML", function() {
				dataForHtml("<b>Hello world!</b>");
			});

			describe("JS", function() {
				dataForJs([
					'var div = document.createElement("div");',
					'div.textContent = "it worked!";',
					"document.body.appendChild(div);"
				]);
			});
		});

		describe("without ids", function() {
			before(function() {
				return ctx.browser.newPage().then(function(p) {
					ctx.page = p;
					return ctx.page.goto(
						"http://127.0.0.1:8081/test/temp/withoutIds.html"
					);
				});
			});

			after(function() {
				return ctx.page.close().then(function() {
					ctx.page = null;
				});
			});

			basicsWork();

			describe("Demo", function() {
				iframeAssert("demo-without-ids", /it worked/);
			});

			describe("HTML", function() {
				dataForHtml([
					"<div><b>Hello world!</b></div>",
					"<div>it worked!</div>"
				]);
			});

			describe("JS", function() {
				dataForJs([
					'var div = document.createElement("div");',
					'div.textContent = "it worked!";',
					"document.body.appendChild(div);"
				]);
			});
		});

		describe("without html", function() {
			before(function() {
				return ctx.browser.newPage().then(function(p) {
					ctx.page = p;
					return ctx.page.goto(
						"http://127.0.0.1:8081/test/temp/withoutHtml.html"
					);
				});
			});

			after(function() {
				return ctx.page.close().then(function() {
					ctx.page = null;
				});
			});

			describe("HTML", function() {
				it("exists on page", function() {
					return ctx.page
						.waitForFunction(function() {
							return !!window.PACKAGES;
						})
						.then(function() {
							return ctx.page.evaluate(function() {
								return {
									hasPackages: !!window.PACKAGES,
									hasWrapper: !!document.querySelectorAll(".demo_wrapper").length,
									wasInjected: !!document.querySelectorAll(".demo_wrapper .demo")
										.length
								};
							});
						})
						.then(function(r) {
							assert(r.hasPackages, "has global PACKAGES");
							assert(r.hasWrapper, "wrapper exists");
							assert(r.wasInjected, "injected into wrapper");
						});
				});

				// expect no content
				dataForHtml("");

				it("tab is hidden", function() {
					return ctx.page
						.evaluate(function() {
							return document.querySelector('[data-tab="html"]').style.display;
						})
						.then(function(display) {
							assert.equal(display, "none", "html tab is hidden");
						});
				});
			});
		});

		describe("without js", function() {
			before(function() {
				return ctx.browser.newPage().then(function(p) {
					ctx.page = p;
					return ctx.page.goto(
						"http://127.0.0.1:8081/test/temp/withoutJs.html"
					);
				});
			});

			after(function() {
				return ctx.page.close().then(function() {
					ctx.page = null;
				});
			});

			basicsWork();

			describe("Demo", function() {
				iframeAssert("demo-without-js");
			});

			describe("HTML", function() {
				dataForHtml("<b>Hello world!</b>");
			});

			describe("JS", function() {
				// expect no content
				dataForJs("");

				it("tab is hidden", function() {
					return ctx.page
						.evaluate(function() {
							return document.querySelector('[data-tab="js"]').style.display;
						})
						.then(function(display) {
							assert.equal(display, "none", "js tab is hidden");
						});
				});
			});
		});

		describe("complex", function() {
			this.timeout(8000);

			before(function() {
				return ctx.browser
					.newPage()
					.then(function(p) {
						ctx.page = p;
						return ctx.page.goto(
							"http://127.0.0.1:8081/test/temp/complex.html"
						);
					})
					.then(function() {
						return ctx.page.waitForFunction(function() {
							return !!document.querySelector(".tab.active");
						});
					});
			});

			after(function() {
				return ctx.page.close().then(function() {
					ctx.page = null;
				});
			});

			basicsWork();

			describe("Demo", function() {
				iframeAssert("demo-complex");
			});

			describe("HTML", function() {
				dataForHtml(
					"<em>StealJS should load can-stache, which should appendChild here:</em>"
				);
			});
		});

		describe("resize iframe to fit content up to 600px", function() {
			before(function() {
				return ctx.browser
					.newPage()
					.then(function(p) {
						ctx.page = p;
						return ctx.page.goto("http://127.0.0.1:8081/test/temp/height.html");
					})
					.then(function() {
						return ctx.page.waitForFunction(function() {
							var iframe = document.querySelector("iframe");
							return iframe && iframe.style.height === "600px";
						});
					});
			});

			it("resizes height up to 600px", function() {
				ctx.page
					.evaluate(function() {
						return document.querySelector("iframe").style.height;
					})
					.then(function(height) {
						assert.equal(height, "600px");
					});
			});
		});

		describe("resize iframe logic adds up border/padding/margin", function() {
			before(function() {
				return ctx.browser
					.newPage()
					.then(function(p) {
						ctx.page = p;
						return ctx.page.goto("http://127.0.0.1:8081/test/temp/heightBoxModel.html");
					})
					.then(function() {
						return ctx.page.waitForFunction(function() {
							var iframe = document.querySelector("iframe");
							return iframe && iframe.style.height === "600px";
						});
					});
			});

			it("resizes height up to 600px", function() {
				ctx.page
					.evaluate(function() {
						return document.querySelector("iframe").style.height;
					})
					.then(function(height) {
						assert.equal(height, "600px");
					});
			});
		});


		describe("multiple instances", function() {
			this.timeout(8000);

			before(function() {
				return ctx.browser
					.newPage()
					.then(function(p) {
						ctx.page = p;
						return ctx.page.goto("http://127.0.0.1:8081/test/temp/index.html");
					})
					.then(function() {
						return ctx.page.waitForFunction(function() {
							return !!document.querySelector(".tab.active");
						});
					});
			});

			after(function() {
				return ctx.page.close().then(function() {
					ctx.page = null;
				});
			});

			it("exist on page", function() {
				return ctx.page
					.evaluate(function() {
						return {
							wrappers: document.querySelectorAll(".demo_wrapper").length,
							injected: document.querySelectorAll(".demo_wrapper .demo").length
						};
					})
					.then(function(r) {
						assert.equal(r.wrappers, 7, "demo wrappers exist");
						assert.equal(r.injected, 7, "demos injected into wrappers");
					});
			});
		});
	});
});
