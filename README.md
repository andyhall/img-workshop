# img-workshop

This is a simple helper library to dynamically process images. 
It watches an input folder (or fileglob), applies some arbitrary 
processing to each image, and saves the result in an output folder.
Whenever one of the source files changes, the processing is re-applied.

## Installation

```sh
brew install graphicsmagick
npm install img-workshop
```

## Usage

#### To invoke from code:

```js
var watch = require('img-workshop')
var gm = require('gm')

var input = './inputs/**/*.png'      // file, folder, or glob
var output = './outputs/'            // folder
var proc = function(path) {
    var img = gm(path)
        .blur(5)
        .flip()                      // or whatever
        .clip()
    return img
}

watch( input, output, proc )
```

#### To use as an ad-hoc standalone library:

 * Open `index.js` and edit the `INPUT` and `OUTPUT` settings
 * Open `processor.js` and fill in whatever image processing you want
 * run `npm start` from the project folder

Either way, image processing is done with [gm](https://github.com/aheckmann/gm), 
a node wrapper for [graphicsmagick](http://www.graphicsmagick.org/).

To see what can be done check the [API docs](http://aheckmann.github.io/gm/docs.html).

#### License: MIT

#### Author: https://github.com/andyhall
