'use strict';

var path = require('path');
var fs = require('fs');

function saveArrayToFile(array, outputFilePath) {
    fs.exists(outputFilePath, function(exists) {
        if (!exists) {
            fs.closeSync(fs.openSync(outputFilePath, 'w'));
        }
    });

    var writeStream = fs.createWriteStream(outputFilePath, {
        encoding: 'utf8'
    });

    writeStream.write('[');
    array.forEach(function(element, it) {
        var comma = ',';
        if (it === array.length - 1) {
            comma = '';
        }
        writeStream.write(JSON.stringify(element) + comma);
    });
    writeStream.write(']');

    writeStream.end(function() {
        console.log('Array saved to tree-data/components.json file');
    });
}

module.exports = saveArrayToFile;
