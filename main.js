'use strict'

var proc = require('./processor')
var chokidar = require('chokidar')



/******************   settings   *******************/

var INPUT = './input/**/*.png'
var OUTPUT = './output/'

/******************   settings   *******************/



// set up watching behavior
var watcher = chokidar.watch(INPUT, {
	ignored: /[\/\\]\./, persistent: true
})

watcher.on('add', onChange)
watcher.on('change', onChange)
watcher.on('error', function(error) { console.error('File watcher error: ', error) })

// on file add or change, start the magic
function onChange(path, stats) {
	// run image processor
	var img = proc(path)
	// output filename based on input
	var outfile = OUTPUT + /[^/\\]*$/.exec(path)[0]
	// save output
	img.write(outfile, function(err) {
		if (err) console.error('GM Error: ', err)
	})
}

// wait...
console.log('img-workshop running, ^C to exit...')


