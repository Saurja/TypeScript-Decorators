function Logger(logString: string) {
	return function (constructor: Function) {
		console.log(logString);
		console.log(constructor);
	};
}

function withTemplate(template: string, hookId: string) {
	return function (constructor: any) {
		const hookEl = document.getElementById(hookId);
		const p = new constructor();
		if (hookEl) {
			hookEl.innerHTML = template;
			hookEl.querySelector("h1")!.textContent = p.name;
		}
	};
}

@withTemplate("<h1>My Rocket Object<h1>", "app")
@Logger("Rocket Class")
class Rocket {
	name: string = "StarShip 901";
}

// ----------------------------------------------------------------

// Property Decorator
function Log(target: any, propertyName: string | Symbol) {
	console.log("Property Decorator");
	console.log(target);
	console.log(propertyName);
}

// Accessor Decorator
function Log2(target: any, name: string, description: PropertyDescriptor) {
	console.log("Accessor Decorator");
	console.log(target);
	console.log(name);
	console.log(description);
}

// Method Decorator
function Log3(
	target: any,
	name: string | Symbol,
	description: PropertyDescriptor
) {
	console.log("Method Decorator");
	console.log(target);
	console.log(name);
	console.log(description);
}

// Parameter Decorator
function Log4(target: any, name: string, position: number) {
	console.log("Parameter Decorator");
	console.log(target);
	console.log(name);
	console.log(position);
}

class Product {
	@Log
	title: string;
	private _price: number;

	@Log2
	set price(value: number) {
		if (value > 0) {
			this._price = value;
		} else {
			throw new Error("Invalid price - Should be positive");
		}
	}

	constructor(t: string, p: number) {
		this.title = t;
		this._price = p;
	}

	@Log3
	getPriceWithTax(@Log4 tax: number) {
		return this._price * (1 + tax);
	}
}

// ----------------------------------------------------------------

function Autolink(_: any, _2: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		enumerable: false,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	return adjDescriptor;
}

class Printer {
	message = "This Works";

	@Autolink
	showMessage() {
		console.log(this.message);
	}
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

// ----------------------------------------------------------------
