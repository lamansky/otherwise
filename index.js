'use strict'

const errate = require('errate')

module.exports = function otherwise ({fallback, elseReturn = fallback, elseThrow}, defaultErrorClass) {
  if (elseThrow) throw errate(elseThrow, defaultErrorClass, {forceClass: false})
  return elseReturn
}
