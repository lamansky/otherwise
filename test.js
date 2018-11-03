'use strict'

const assert = require('assert')
const otherwise = require('.')

describe('otherwise()', function () {
  it('should call `elseCall` if set', function () {
    assert.strictEqual(otherwise({elseCall: () => 123, elseThrow: new Error()}), 123)
  })

  it('should pass `elseCall` a function that will invoke other fallbacks', function () {
    let called = false
    assert.strictEqual(otherwise({elseCall: fallback => { called = true; return fallback() }, elseReturn: 123}), 123)
    assert.strictEqual(called, true)

    called = false
    assert.throws(() => otherwise({elseCall: fallback => { called = true; return fallback() }, elseThrow: new TypeError()}), TypeError)
    assert.strictEqual(called, true)
  })

  it('should pass `args` to `elseCall`', function () {
    let arg
    assert.strictEqual(otherwise({elseCall: (fallback, arg1) => { arg = arg1; return fallback() }, elseReturn: 123}, {args: [234]}), 123)
    assert.strictEqual(arg, 234)
  })

  it('should throw `elseThrow` if set', function () {
    class CustomError extends Error {}
    assert.throws(() => otherwise({elseThrow: new CustomError()}, {defaultErrorClass: TypeError}), CustomError)
  })

  it('should convert an `elseThrow` string to an error', function () {
    assert.throws(() => otherwise({elseThrow: 'Test'}), Error)
  })

  it('should convert an `elseThrow` string to an instance of `defaultErrorClass`', function () {
    assert.throws(() => otherwise({elseThrow: 'Test'}, {defaultErrorClass: TypeError}), TypeError)
  })

  it('should return `elseReturn` if set', function () {
    assert.strictEqual(otherwise({elseReturn: 123}), 123)
  })

  it('should return `fallback` if set', function () {
    assert.strictEqual(otherwise({fallback: 123}), 123)
  })

  it('should return `undefined` if nothing is set', function () {
    assert.strictEqual(typeof otherwise({}), 'undefined')
    assert.strictEqual(typeof otherwise(), 'undefined')
  })
})
