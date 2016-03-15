'use strict'

var gm = require('gm')


module.exports = function processFile(path) {
	
	var img = gm(path)

	// resize
	img.resizeExact(32, 32)
	
	// process, filter, etc
	img.operator('Opacity', 'Threshold', 128 )

	// return the result
	return img
}



