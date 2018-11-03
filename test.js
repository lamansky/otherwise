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

  it('should throw `elseThrow` if set', function () {
    class CustomError extends Error {}
    assert.throws(() => otherwise({elseThrow: new CustomError()}, TypeError), CustomError)
  })

  it('should convert an `elseThrow` string to an error', function () {
    assert.throws(() => otherwise({elseThrow: 'Test'}), Error)
  })

  it('should convert an `elseThrow` string to an instance of `defaultErrorClass`', function () {
    assert.throws(() => otherwise({elseThrow: 'Test'}, TypeError), TypeError)
  })

  it('should return `elseReturn` if set', function () {
    assert.strictEqual(otherwise({elseReturn: 123}), 123)
  })

  it('should return `fallback` if set', function () {
    assert.strictEqual(otherwise({fallback: 123}), 123)
  })

  it('should return `undefined` if nothing is set', function () {
    assert.strictEqual(typeof otherwise({}), 'undefined')
  })
})
