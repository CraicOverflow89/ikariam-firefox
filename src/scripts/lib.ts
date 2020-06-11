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
 * Object Extension
 */
declare interface Object {
	apply(logic: (it: Object) => void): Object
	let(logic: (it: Object) => any): any
	when(logic: {}, none: (it: Object) => void | null): void
}

/**
 * Applies logic to object and returns object
 *
 * @param logic Callable logic to execute using object
 * @returns Object
 */
Object.prototype.apply = function(logic: (it: Object) => void): Object {
	logic(this)
	return this
}

/**
 * Applies logic to object and returns result
 *
 * @param logic Callable logic to execute using object
 * @returns any
 */
Object.prototype.let = function(logic: (it: Object) => any): any {
	return logic(this)
}

/**
 * Invokes logic of matching condition
 *
 * @param logic Map of condition / result pairs
 * @param none Logic to invoke if no condition is met
 * @returns void
 */
Object.prototype.when = function(logic: {property: CallableFunction}, none: (it: Object) => void = null): void {
	const condition = Object.keys(logic)
	for(let x = 0; x < condition.length; x ++) {
		if(condition[x] == this) {
			logic[condition[x]](this)
			return
		}
	}
	if(none !== null) none(this)
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
 * Bound Property Data
 */
class BoundProperty<T> {
	getter: () => T
	setter: (value: T) => void

	constructor(getter: () => T, setter: (value: T) => void) {
		this.getter = getter
		this.setter = setter
	}

	/**
	 * Creates a BoundProperty using an element and property
	 *
	 * @param element The element to bind to
	 * @param property The property to bind to
	 * @return BoundProperty
	 */
	static bind<T1>(element: HTMLElement, property: string): BoundProperty<T1> {
		return new BoundProperty<T1>(() => {
			return element[property]
		}, (value: T1) => {
			element[property] = value
		})
	}

	/**
	 * Gets the value of the bound property
	 *
	 * @returns T
	 */
	get(): T {
		return this.getter()
	}

	/**
	 * Sets the value of the bound property
	 *
	 * @param value The new value to set
	 * @returns void
	 */
	set(value: T): void {
		this.setter(value)
	}
}

/**
 * Colour Data
 */
class Colour {
	r: number
	g: number
	b: number

	constructor(r: number, g: number, b: number) {
		this.r = r
		this.g = g
		this.b = b
	}

	/**
	 * Provides hexidecimal colour code
	 *
	 * @returns string
	 */
	toHex(): string {
		return ((value: number) => {
			let result = Number(value).toString(16)
			if(result.length < 2) result = "0" + result
			return result
		}).let((it: CallableFunction) => ("#" + it(this.r) + it(this.g) + it(this.b)).toUpperCase())
	}
}

/** 
 * 2D Size Data
 */
class Dimension2D {
	width: number
	height: number

	constructor(width: number, height: number) {
		this.width = width
		this.height = height
	}

	/**
	 * Provides string of dimension data
	 *
	 * @returns string
	 */
	toString(): string {
		return `{width: ${this.width}, height: ${this.height}}`
	}
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
type int = Integer

/**
 * 2D Point Data
 */
class Point2D {
	x: number
	y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}
}

/**
 * 3D Point Data
 */
class Point3D {
	x: number
	y: number
	z: number

	constructor(x: number, y: number, z: number) {
		this.x = x
		this.y = y
		this.z = z
	}
}

/**
 * String Buffer
 */
class StringBuffer {
	data: Array<string> = []

	/**
	 * Appends data to the buffer
	 *
	 * @param data The data to append
	 * @returns void
	 */
	append(data: string): void {
		this.data.push(data)
	}

	/**
	 * Fetches the character at a position in the buffer
	 *
	 * @param position The position from which to fetch the character
	 * @return string
	 */
	charAt(position: int): string {
		return this.data[position as number]
	}

	/**
	 * Clears the buffer contents
	 */
	clear(): void {
		this.data = []
	}

	/**
	 * Creates a string from the buffer
	 *
	 * @returns string
	 */
	toString(): string {
		return this.data.join("")
	}
}

/**
 * UUID Data
 *
 * @see https://jcward.com/UUID.js
 */
class UUID {
	value: string

	constructor() {
		const lut = [];
		for(let i = 0; i < 256; i ++) lut[i] = (i < 16 ? '0' : '') + (i).toString(16)
		this.value = (() => {
			const d0 = Math.random() * 0xffffffff | 0
			const d1 = Math.random() * 0xffffffff | 0
			const d2 = Math.random() * 0xffffffff | 0
			const d3 = Math.random() * 0xffffffff | 0
			return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
			lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
			lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
			lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
		})()
	}
}