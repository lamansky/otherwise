# otherwise

Executes fallback behavior if a function was unsuccessful. Intended for use in modules that use option object arguments.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i otherwise
```

## API

The module exports a single function.

### Parameter

Object argument:
* Optional: `elseThrow` (Error or string): An error to be thrown. A string will be wrapped in an `Error` object automatically.
* Optional: `elseReturn` or `fallback` (any): A value to return if `elseThrow` is omitted.

### Return Value

Returns `elseReturn` (or `fallback`)
