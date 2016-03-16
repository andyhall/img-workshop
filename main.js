'use strict'

var chokidar = require('chokidar')


/**************  default settings   ****************/

var _input = './input/**/*.png'
var _output = './output/'




// when invoked directly, run with defaults

if (require.main === module) {
	startWatching(
		_input,
		_output,
		require('./processor')
	)
} else {
	module.exports = startWatching
}




/**************   implementation    ****************/


function startWatching(input, output, proc) {
	// set up watching behavior
	var watcher = chokidar.watch(input, {
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
		var outfile = output + /[^/\\]*$/.exec(path)[0]
		// save output
		img.write(outfile, function(err) {
			if (err) console.error('GM Error: ', err)
		})
	}

	// wait...
	console.log('img-workshop running, ^C to exit...')
}


