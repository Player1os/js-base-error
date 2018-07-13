// Expose the extendable error class.
module.exports.default = class BaseError extends Error {
	constructor (
		message = '',
	) {
		// Call the parent constructor.
		super(message)

		// Define the message property.
		Object.defineProperty(this, 'message', {
			configurable: true,
			enumerable: false,
			value: message,
			writable: true,
		})

		// Define the name property.
		Object.defineProperty(this, 'name', {
			configurable: true,
			enumerable: false,
			value: this.constructor.name,
			writable: true,
		})

		// Ensure the stack trace is captured.
		if (Error.hasOwnProperty('captureStackTrace')) {
			Error.captureStackTrace(this, this.constructor)
		} else {
			Object.defineProperty(this, 'stack', {
				configurable: true,
				enumerable: false,
				value: (new Error(message)).stack,
				writable: true,
			})
		}
	}
}
