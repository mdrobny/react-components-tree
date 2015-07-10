'use strict';

var pathModule = require('path');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var readline = require('readline');

var async = require('async');

var config = {
    requirePathRegex: /require\('(.*?)'\)/,
    displayNameRegex: /displayName: '([\w]+)'/,
    storeRegex: /[\w]*createStore\(\{/
};

function TraverseProjectFiles(options) {
    EventEmitter.call(this);

    this.symlinkPath = options.symlinkPath;
    this.symlinkName = options.symlinkName;

    var rootComponent = {
        id: 1,
        parentId: 0,
        path: options.reactRootComponentPath
    };

    this.componentIndex = 1;

    // Start discovering components
    this.getChildrenFiles(rootComponent, function() {

        this.emit('discoverFinished', rootComponent);
    }.bind(this));
}

util.inherits(TraverseProjectFiles, EventEmitter);

TraverseProjectFiles.prototype.getChildrenFiles = function(component, done) {
    // Array of children components
    var children = [],
        name, type;

    var readStream = fs.createReadStream(component.path);
    readStream.setEncoding('utf8');

    var rl = readline.createInterface({
        input: readStream,
        output: null
    });

    // Parse file line by line
    rl.on('line', function(line) {
        var requirePathMatch, displayNameMatch, storeMatch,
            path, pathStart,
            symlinkDep = false, localDep = false,
            fileExists;

        requirePathMatch = config.requirePathRegex.exec(line);
        displayNameMatch = config.displayNameRegex.exec(line);
        storeMatch = config.storeRegex.exec(line);

        // If line contains require('file') add this file as children
        if (requirePathMatch) {
            // get 'path' from require('path')
            path = requirePathMatch[1];
            // possible pathStarts: ['symlink', '.', '..']
            pathStart = path.split('/')[0];

            if (pathStart === this.symlinkName) {
                symlinkDep = true;
            } else if (pathStart === '.' || pathStart === '..') {
                localDep = true;
            }

            if (symlinkDep) {
                path = this.symlinkPath + path;
            } else if (localDep) {
                path = pathModule.parse(component.path).dir + '/' + path;
            }

            if (symlinkDep || localDep) {
                path = path.replace(/\//g, pathModule.sep);

                try {
                    // Check if file exists
                    fileExists = fs.openSync(path + '.js', 'r');
                    if (!fileExists) {
                        // If path.js does not exists use index.js from directory 'path'
                        path += '/index';
                    }

                    path += '.js';

                    children.push({
                        id: ++this.componentIndex,
                        parentId: component.id,
                        path: path
                    });
                } catch (e) {}
            }
        }

        if (displayNameMatch) {
            name = displayNameMatch[1];
            type = 'component';
        }

        if (storeMatch) {
            type = 'store';
        }
    }.bind(this));

    // After 'end' event array of children components is complete
    // Call getChildrenComponents for each child using async to keep track when they end
    readStream.on('end', function() {
        var functionsArray;
        rl.close();

        component.children = children;
        component.displayName = name;
        component.type = type;
        delete component.path;

        // Discover more components
        if (component.type === 'component' && children.length) {
            functionsArray = [];

            children.forEach(function(child) {
                functionsArray.push(function(callback) {
                    this.getChildrenFiles(child, callback);
                }.bind(this));
            }.bind(this));

            // When children finished call done()
            async.parallel(functionsArray, function() {
                done();
            });
        } else {
            done();
        }
    }.bind(this));
};

module.exports = TraverseProjectFiles;
