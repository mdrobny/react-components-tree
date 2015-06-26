'use strict';

var pathModule = require('path');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var readline = require('readline');

var async = require('async');

function DiscoverComponents(options) {
    EventEmitter.call(this);

    this.symlinkPath = options.symlinkPath;

    this.requirePathRegex = /require\('(.*?)'\)/;
    this.displayNameRegex = /displayName: '([\w]+)'/;

    var rootComponent = {
        name: 'App',
        id: 1,
        parentId: 0,
        path: options.reactRootComponentPath
    };
    this.componentIndex = 1;
    this.getChildrenComponents(rootComponent, function() {
        console.log('route app done');

        this.getComponentsArray(rootComponent);
    }.bind(this));
}

util.inherits(DiscoverComponents, EventEmitter);

DiscoverComponents.prototype.getChildrenComponents = function(component, done) {
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
        var requirePathMatch = this.requirePathRegex.exec(line),
            displayNameMatch = this.displayNameRegex.exec(line),
            path, pathStart,
            symlinkDep = false, localDep = false;

        // If line contains require('file') add this file as children
        if (requirePathMatch) {
            // get 'path' from require('path')
            path = requirePathMatch[1];
            // pathStart: 'symlink', '.', '..'
            pathStart = path.split('/')[0];

            if (pathStart === 'app') {
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

                fs.exists(path + '.js', function(exists) {
                    if (!exists) {
                        // If path.js does not exists use index.js from directory 'path'
                        path += '/index';
                    }

                    path += '.js';

                    children.push({
                        name: '',
                        id: this.componentIndex++,
                        parentId: component.id,
                        path: path
                    });
                }.bind(this));
            }
        }

        if (displayNameMatch) {
            name = displayNameMatch[1];
            type = 'component';
        }

    }.bind(this));

    // After 'end' event array of children components is complete
    // Call getChildrenComponents for each child
    readStream.on('end', function() {
        var functionsArray;
        rl.close();

        component.children = children;
        component.name = name;
        component.type = type;

        if (children.length) {
            functionsArray = [];

            children.forEach(function(child) {
                functionsArray.push(function(callback) {
                    this.getChildrenComponents(child, callback);
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

DiscoverComponents.prototype.getComponentsArray = function(treeRoot) {
    var componentsArray = [],
        pushComponentsToArray = function(treeNode) {
            if (treeNode.type === 'component') {
                componentsArray.push(treeNode);
                if (treeNode.children) {
                    treeNode.children.forEach(function(child) {
                        pushComponentsToArray(child);
                    });
                }
                delete treeNode.children;
            }

        };
    pushComponentsToArray(treeRoot);

    return componentsArray;
};

module.exports = DiscoverComponents;
