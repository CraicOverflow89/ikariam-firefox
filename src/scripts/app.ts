// Library

/**
 * HTMLElement Extension
 */
declare interface HTMLElement {
	apply(logic: (it: HTMLElement) => void): HTMLElement
	let(logic: (it: HTMLElement) => any): any
}

/**
 * Applies logic to element and returns element
 *
 * @param logic Callable logic to execute using element
 * @returns HTMLElement
 */
HTMLElement.prototype.apply = function(logic: (it: HTMLElement) => void): HTMLElement {
	logic(this)
	return this
}

/**
 * Applies logic to element and returns result
 *
 * @param logic Callable logic to execute using element
 * @returns any
 */
HTMLElement.prototype.let = function(logic: (it: HTMLElement) => any): any {
	return logic(this)
}

/**
 * Number Extension
 */
declare interface Number {
	isInteger(): boolean
	toPaddedString(count: number): string
}

/**
 * Determines if a number is an integer
 *
 * @returns boolean
 */
Number.prototype.isInteger = function(): boolean {
	return typeof this === "number" && isFinite(this) && Math.floor(this) === this
}

/**
 * Creates a string with padded zeroes
 *
 * @param count The minimum number of digits
 * @returns string
 */
Number.prototype.toPaddedString = function(count: number): string {
	const result = this.toString()
	return "0".repeat(count - result.length) + result
}

/**
 * String Extension
 */
declare interface String {
	endsWith(value: string): boolean
	repeat(count: number): string
	startsWith(value: string): boolean
}

/**
 * Determines if a string ends with a string
 *
 * @param value The string to check
 * @returns boolean
 */
String.prototype.endsWith = function(value: string): boolean {
	return this.substr(this.length - value.length) == value
}

/**
 * Repeats a string a number of times
 *
 * @param count The amount of times to repeat
 * @returns string
 */
String.prototype.repeat = function(count: number): string {
	if(count < 1 || !count.isInteger()) return ""
	let result = this
	let x = 0
	while(++ x < count) result += result
	return result
}

/**
 * Determines if a string starts with a string
 *
 * @param value The string to check
 * @returns boolean
 */
String.prototype.startsWith = function(value: string): boolean {
	return this.substr(0, value.length) == value
}

/**
 * Element Factory
 */
class Factory {

	/**
	 * Creates a new <br> element
	 *
	 * @returns HTMLBRElement
	 */
	static br(): HTMLBRElement {
		return document.createElement("br")
	}

	/**
	 * Creates a new <div> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLDivElement
	 */
	static div(logic: (it: HTMLDivElement) => void = () => null): HTMLDivElement {
		return <HTMLDivElement>document.createElement("div").apply((it: HTMLDivElement) => logic(it))
	}

	/**
	 * Creates a new <form> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLFormElement
	 */
	static form(logic: (it: HTMLFormElement) => void = () => null): HTMLFormElement {
		return <HTMLFormElement>document.createElement("form").apply((it: HTMLFormElement) => logic(it))
	}

	/**
	 * Creates a new <h1> element (or other size)
	 *
	 * @param size The size of the heading
	 * @param value The innerHTML of the element
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLHeadingElement
	 */
	static h(size: int, value: string, logic: (it: HTMLHeadingElement) => void = () => null): HTMLHeadingElement {
		if(size < 1) size = 1
		if(size > 6) size = 6
		return <HTMLHeadingElement>document.createElement(`h${size}`).apply((it: HTMLHeadingElement) => {
			it.innerHTML = value
			logic(it)
		})
	}

	/**
	 * Creates a new <img> element
	 *
	 * @param src The image source
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLImageElement
	 */
	static img(src: string, logic: (it: HTMLImageElement) => void = () => null) {
		return <HTMLImageElement>document.createElement("img").apply((it: HTMLImageElement) => {
			it.src = src
			logic(it)
		})
	}

	/**
	 * Creates a new <input> element
	 *
	 * @param type The input type (text by default)
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLInputElement
	 */
	static input(type: string = "text", logic: (it: HTMLInputElement) => void = () => null): HTMLInputElement {
		return <HTMLInputElement>document.createElement("input").apply((it: HTMLInputElement) => {
			it.type = type
			logic(it)
		})
	}

	/**
	 * Creates a new <li> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLLIElement
	 */
	static li(logic: (it: HTMLLIElement) => void = () => null): HTMLLIElement {
		return <HTMLLIElement>document.createElement("li").apply((it: HTMLLIElement) => logic(it))
	}

	/**
	 * Creates a new <span> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLSpanElement
	 */
	static span(logic: (it: HTMLSpanElement) => void = () => null): HTMLSpanElement {
		return <HTMLSpanElement>document.createElement("span").apply((it: HTMLSpanElement) => logic(it))
	}

	/**
	 * Creates a new <table> element
	 *
	 * @param logicBody Optional logic to apply to the body
	 * @param logicTable Optional logic to apply to the table
	 * @returns HTMLTableElement
	 */
	static table(logicBody: (it: HTMLTableElement) => void = () => null, logicTable: (it: HTMLTableElement) => void = () => null): HTMLTableElement {
		return <HTMLTableElement>document.createElement("table").apply((it: HTMLTableElement) => {
			logicTable(it)
			it.appendChild(<HTMLTableElement>it.createTBody().apply((it: HTMLTableElement) => logicBody(it)))
		})
	}

	/**
	 * Creates a new <td> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLTableCellElement
	 */
	static td(logic: (it: HTMLTableCellElement) => void = () => null): HTMLTableCellElement {
		return <HTMLTableCellElement>document.createElement("td").apply((it: HTMLTableCellElement) => logic(it))
	}

	/**
	 * Creates a new <text> element
	 *
	 * @param value The text value
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLElement
	 */
	static text(value: string, logic: (it: HTMLElement) => void = () => null): HTMLElement {
		return <HTMLElement>document.createElement("text").apply((it: HTMLElement) => {
			it.innerHTML = value
			logic(it)
		})
	}

	/**
	 * Creates a new <textarea> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLTextAreaElement
	 */
	static textarea(logic: (it: HTMLTextAreaElement) => void = () => null): HTMLTextAreaElement {
		return <HTMLTextAreaElement>document.createElement("textarea").apply((it: HTMLTextAreaElement) => logic(it))
	}

	/**
	 * Creates a new <tr> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLTableRowElement
	 */
	static tr(logic: (it: HTMLTableRowElement) => void = () => null): HTMLTableRowElement {
		return <HTMLTableRowElement>document.createElement("tr").apply((it: HTMLTableRowElement) => logic(it))
	}

	/**
	 * Creates a new <ul> element
	 *
	 * @param logic Optional logic to apply to the element
	 * @returns HTMLLIElement
	 */
	static ul(logic: (it: HTMLUListElement) => void = () => null): HTMLUListElement {
		return <HTMLUListElement>document.createElement("ul").apply((it: HTMLUListElement) => logic(it))
	}
}

/**
 * Map of Key / Value Entries
 */
class HashMap<T> {
	data: {} = {}

	/**
	 * Clears all data in the map
	 *
	 * @returns void
	 */
	clear(): void {
		this.data = {}
	}

	/**
	 * Checks if the map contains a key
	 *
	 * @param key The key to search for
	 * @returns boolean
	 */
	containsKey(key: string): boolean {
		return this.data.hasOwnProperty(key)
	}

	/**
	 * Gets data from the map
	 *
	 * @param key The key to read from
	 * @returns any
	 */
	get(key: string): T {
		return this.data[key]
	}

	/**
	 * Puts data in the map
	 *
	 * @param key The key to write with
	 * @param value The value to write
	 * @returns void
	 */
	put(key: string, value: T): void {
		this.data[key] = value
	}

	/**
	 * Removes an entry from the map
	 *
	 * @param key The key to search for
	 * @returns boolean
	 */
	remove(key: string): boolean {

		// Not Found
		if(!this.data.hasOwnProperty(key)) return false

		// Remove Entry
		delete this.data[key]
		return true
	}

	/**
	 * Creates an array of data
	 *
	 * @param logic The logic to invoke against each entry
	 * @returns Array
	 */
	toArray<R>(logic: (k: string, v: T) => R): Array<R> {
		const result = []
		const keys = Object.keys(this.data)
		for(let x = 0; x < keys.length; x ++) {
			result.push(logic(keys[x], this.data[keys[x]]))
		}
		return result
	}
}

/**
 * Integer Data
 */
class Integer extends Number {

	constructor(value: number) {
		if(!value.isInteger()) throw new TypeError("Value must be an integer!")
		super(value)
	}
}
type int = Integer;

// Create Debugger
// NOTE: object that can be posted to and renders in a modal/popup
/*const Debug = (() => {

	// Active Status
	let isActive = true

	// Create Elements
	const input = Factory.span((it) => {
		it.setAttribute("style", "color: rgba(0, 200, 0); font-family: monospace;")
	})
	Factory.div((root) => {
		root.setAttribute("style", "color: rgba(0, 200, 0); font-family: monospace; height: 200px; left: 10px; padding: 5px; position: absolute; top: 50px; width: 300px; z-index: 99;")
		root.appendChild(Factory.table((it) => {
			it.appendChild(Factory.tr((it) => {
				it.vAlign = "top"
				it.style.height = "20px"
				it.appendChild(Factory.td((it) => {
					it.innerHTML = "Debug"
				}))
				it.appendChild(Factory.td((it) => {
					it.align = "center"
					it.vAlign = "middle"
					it.width = "20px"
					it.innerHTML = "x"
					it.addEventListener("click", () => {
						isActive = false
						root.remove()
					})
				}))
			}))
			it.appendChild(Factory.tr((it) => {
				it.vAlign = "top"
				it.appendChild(Factory.td((it) => {
					it.colSpan = 2
					it.setAttribute("style", "border-top: 1px solid rgba(0, 200, 0);")
					it.appendChild(input)
				}))
			}))
		}, (it) => it.setAttribute("style", "background-color: rgba(0, 0, 0, 0.75); border: 1px solid rgba(0, 200, 0); height: 100%; width: 100%;")))
		document.body.appendChild(root)
	})

	// Return Methods
	return {
		"clear": () => {
			if(!isActive) return;
			input.innerHTML = ""
		},
		"isActive": () => isActive,
		"print": (data: any) => {
			if(!isActive) return;
			input.innerHTML += (typeof data == "string" ? data : JSON.stringify(data)) + "<br>"
		}
	}
})()*/

// Create Definitions
interface Ikariam {
	controller: IkariamController
	destroyCurrentView(): void
	model: IkariamModel
}
interface IkariamController {
	resetSliders(): void
}
interface IkariamModel {
	relatedCityData: Object
}
declare const ikariam: Ikariam;

class IkariamCity {
	id: number
	name: string

	constructor(id: number, name: string) {
		this.id = id
		this.name = name
	}

	getTroops() {
		// NOTE: return data like {hoplite: number}
	}
}

// Console Logic
/*console = (() => {
	const iFrame = document.createElement("iframe")
	iFrame.style.display = "none"
	document.body.appendChild(iFrame)
	const result = iFrame.contentWindow["console"]
	document.body.removeChild(iFrame)
	return result
})()*/

// Execute Application
//console.log("Ikariam application running...")
// NOTE: this is still not working, despite console changes

// NOTE: for general data, see window.ikariam.model

// Mutation Logic
const mutationData = (() => {

	// Private Properties
	const listenerData: Array<{id: string, logic: (element: HTMLElement) => void}> = []

	// Create Listener
	new MutationObserver((mutationsList, observer) => {
		mutationsList.forEach((it) => {
			if(it.type === "childList" && it.addedNodes.length) {
				it.addedNodes.forEach(node => {
					listenerData.forEach((it) => {
						if(it.id == node["id"]) {
							it.logic(document.getElementById(it.id))
						}
					})
				})
			}
		})
	}).observe(document.getElementById("container"), {
		"attributes": false,
		"childList": true,
		"subtree": false
	})

	// Return Methods
	return {
		"onElementAdd": (id: string, logic: (element: HTMLElement) => void) => {
			listenerData.push({
				"id": id,
				"logic": logic
			})
		}
	}
})()

// Barbarian Village
mutationData.onElementAdd("barbarianVillage", (it) => {

	// Calculate Resources
	const resourceInfo = document.getElementsByClassName("barbarianCityResources")[0]
	const resourceAmount = [
		"js_islandBarbarianResourceresource",
		"js_islandBarbarianResourcetradegood1",
		"js_islandBarbarianResourcetradegood2",
		"js_islandBarbarianResourcetradegood3",
		"js_islandBarbarianResourcetradegood4"
	].reduce((result, it) => {
		return result + parseInt(document.getElementById(it).innerHTML)
	}, 0)
	const shipAmount = Math.ceil(resourceAmount / 500)

	// Update View
	resourceInfo.appendChild(Factory.br())
	resourceInfo.appendChild(Factory.div((it) => {
		it.innerHTML = "Resource Transport:"
	}))
	resourceInfo.appendChild(Factory.ul((it) => {
		it.className = "resources"
		it.setAttribute("style", "height: 25px;")
		it.appendChild(Factory.li((it) => {
			it.setAttribute("style", 'background: url("skin/wonder/multi_marble.png") no-repeat left center;')
			it.innerHTML = resourceAmount.toString()
		}))
		it.appendChild(Factory.li((it) => {
			it.setAttribute("style", 'background: url("skin/characters/fleet/40x40/ship_transport_r_40x40.png") no-repeat left center; background-size: 20px;')
			it.innerHTML = shipAmount.toString()
		}))
	}))
	document.getElementsByClassName("barbarianCityInfos")[0].setAttribute("style", "height: 180px;")
	document.getElementsByClassName("barbarianCityInfosText")[0].setAttribute("style", "height: 50px;")
})

// Hide Event Promotion
document.getElementById("eventDiv").style.display = "none"
// NOTE: could remove this if event that does the timer is also removed

// City View
if(window.location.href.indexOf("view=city") > -1) {

	// Remove Left Menu
	document.getElementById("js_viewCityMenu").remove()
	// NOTE: see window.bgViewData.cityLeftMenu.visibility

	// Remove Footer Controls
	document.getElementById("mapControls").remove()
	document.getElementById("js_toggleControlsOn").style.cursor = "default"
}
// NOTE: should access page data to determine if city view

// List Cities
// NOTE: let's get a list of cities and coords for player
/*const tempCity = ikariam.model.relatedCityData.let((it) => {
	return it[it["selectedCity"]].let((it) => {
		return new IkariamCity(it.id, it.name)
	})
})*/
//alert(JSON.stringify(tempCity))

// Create Callout
/*document.body.appendChild(Factory.div((it) => {

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
}))*/