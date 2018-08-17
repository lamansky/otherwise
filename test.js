'use strict'

const assert = require('assert')
const otherwise = require('.')

describe('otherwise()', function () {
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
