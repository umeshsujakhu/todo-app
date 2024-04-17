class CustomAPIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the prototype chain is correctly set
    Object.setPrototypeOf(this, CustomAPIError.prototype);
  }
}

export default CustomAPIError;
