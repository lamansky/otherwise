'use strict'

const errate = require('errate')

module.exports = function otherwise ({fallback, elseReturn = fallback, elseThrow}) {
  if (elseThrow) throw errate(elseThrow)
  return elseReturn
}
