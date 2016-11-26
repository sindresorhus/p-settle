'use strict';
const pReflect = require('p-reflect');

module.exports = iterable => Promise.all(iterable.map(pReflect));
