// Create Definitions
interface Ikariam {
	controller: IkariamController
	destroyCurrentView(): void
}
interface IkariamController {
	resetSliders(): void
}
declare const ikariam: Ikariam;

// Execute Application
console.log("Ikariam application running...")

// Hide Event Promotion
document.getElementById("eventDiv").style.display = "none"
// NOTE: could remove this if event that does the timer is also removed

// City View
if(window.location.href.indexOf("view=city") > -1) {

	// Remove Left Menu
	document.getElementById("js_viewCityMenu").remove()

	// Remove Footer Controls
	document.getElementById("mapControls").remove()
	document.getElementById("js_toggleControlsOn").style.cursor = "default"
}

// Create Callout
document.body.appendChild(Factory.div((it) => {

	// Element Properties
	it.className = "templateView focusable focus"
	it.setAttribute("style", "bottom: 25px; left: 25px; position: absolute; right: auto;")
	// NOTE: need to add click, focusElement and mouseup events

	// Element Content
	it.appendChild(Factory.div((callout) => {

		// Element Properties
		callout.className = "mainContentBox contentBox01h toggleMenu"

		// Create Header
		callout.appendChild(Factory.div((it) => {
			it.className = "hd header mainHeader draggable"
			it.appendChild(Factory.h(3, "Ikariam Extension"))
			it.appendChild(Factory.div((it) => {
				it.className = "close"
				it.addEventListener("click", () => {
					callout.remove()
					//ikariam.destroyCurrentView();
					//ikariam.controller.resetSliders();
				})
			}))
		}))

		// Create Content
		callout.appendChild(Factory.div((it) => {
			it.className = "bd mainContentScroll"
			it.setAttribute("style", "height: 120px;")
			it.appendChild(Factory.div((it) => {
				it.className = "scroll_area"
				// NOTE: need to add the mousedown and mouseup events
				it.appendChild(Factory.div((it) => {
					it.className = "scroll_arrow_top"
					// NOTE: need to add the mousedown and mouseup events
				}))
				it.appendChild(Factory.div((it) => {
					it.className = "scroller"
					it.setAttribute("style", "height: 183px; left: 0px; top: 0px; width: 16px;")
					// NOTE: need to add the mousedown event
				}))
				it.appendChild(Factory.div((it) => {
					it.className = "scroll_arrow_bottom"
					it.setAttribute("style", "top: 221px;")
					// NOTE: need to add the mousedown and mouseup events
				}))
			}))
			it.appendChild(Factory.div((it) => {
				it.className = "mainContent minimizableContent"
				// NOTE: need to add the mousescroll and mousewheel events
				it.appendChild(Factory.div((it) => {
					it.className = "contentBox01h"
					it.appendChild(Factory.h(3, "", () => {
						it.className = "header"
						// NOTE: need <a> and <span> elements here
					}))
					it.appendChild(Factory.div((it) => {
						it.className = "content"
						it.innerHTML = "TEMP CONTENT"
					}))
					it.appendChild(Factory.div((it) => {
						it.className = "footer"
					}))
				}))
			}))
		}))

		// Create Footer
		callout.appendChild(Factory.div((it) => {
			it.className = "ft footer"
		}))
	}))
}))