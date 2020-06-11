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

// City View
if(window.location.href.indexOf("view=city") > -1) {

	// Remove Left Menu
	document.getElementById("js_viewCityMenu").remove()

	// Remove Footer Controls
	document.getElementById("mapControls").remove()
}

// Test Callout
document.body.appendChild((() => {

	// Create View
	const view = document.createElement("div")
	view.className = "templateView focusable focus"
	view.setAttribute("style", "bottom: 25px; left: 25px; position: absolute; right: auto;")
	// NOTE: need to add click, focusElement and mouseup events
	view.appendChild((() => {

		// Create Element
		const callout = document.createElement("div")
		callout.className = "mainContentBox contentBox01h toggleMenu"

		// Append Header
		callout.appendChild((() => {
			const header = document.createElement("div")
			header.className = "hd header mainHeader draggable"
			header.appendChild((() => {
				const result = document.createElement("h3")
				result.innerHTML = "Ikariam Extension"
				return result
			})())
			header.appendChild((() => {
				const result = document.createElement("div")
				result.className = "close"
				result.addEventListener("click", () => {
					callout.remove()
					//ikariam.destroyCurrentView();
					//ikariam.controller.resetSliders();
				})
				return result
			})())
			// NOTE: this close button is not appearing atm
			return header
		})())

		// Append Content
		callout.appendChild((() => {
			const content = document.createElement("div")
			content.className = "bd mainContentScroll"
			content.setAttribute("style", "height: 120px;")
			content.appendChild((() => {
				const result = document.createElement("div")
				result.className = "scroll_area"
				// NOTE: need to add the mousedown and mouseup events
				result.appendChild((() => {
					const result = document.createElement("div")
					result.className = "scroll_arrow_top"
					// NOTE: need to add the mousedown and mouseup events
					return result
				})())
				result.appendChild((() => {
					const result = document.createElement("div")
					result.className = "scroller"
					result.setAttribute("style", "height: 183px; left: 0px; top: 0px; width: 16px;")
					// NOTE: need to add the mousedown event
					return result
				})())
				result.appendChild((() => {
					const result = document.createElement("div")
					result.className = "scroll_arrow_bottom"
					result.setAttribute("style", "top: 221px;")
					// NOTE: need to add the mousedown and mouseup events
					return result
				})())
				return result
			})())
			content.appendChild((() => {
				const result = document.createElement("div")
				result.className = "mainContent minimizableContent"
				// NOTE: need to add the mousescroll and mousewheel events
				result.appendChild((() => {
					const result = document.createElement("div")
					result.className = "contentBox01h"
					result.appendChild((() => {
						const result = document.createElement("h3")
						result.className = "header"
						// NOTE: need <a> and <span> elements here
						return result
					})())
					result.appendChild((() => {
						const result = document.createElement("div")
						result.className = "content"
						result.innerHTML = "TEMP CONTENT"
						return result
					})())
					result.appendChild((() => {
						const result = document.createElement("div")
						result.className = "footer"
						return result
					})())
					return result
				})())
				return result
			})())
			return content
		})())

		// Append Footer
		callout.appendChild((() => {
			const footer = document.createElement("div")
			footer.className = "ft footer"
			return footer
		})())

		// Return Element
		return callout
	})())

	// Return Element
	return view
	
})())