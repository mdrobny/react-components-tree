'use strict';

var pathModule = require('path');
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var readline = require('readline');

function DiscoverComponents(options) {
    EventEmitter.call(this);

    this.projectPath = options.projectPath;
    this.componentsDirPath = options.componentsDirPath;
    this.symlinkPath = options.symlinkPath;

    this.requirePathRegex = /require\('(.*?)'\)/;
    this.displayNameRegex = /displayName:([\w\s])/;

    var rootComponent = {
        name: 'App',
        path: options.reactRootComponentPath
    };
    this.getChildrenComponents(rootComponent, function() {
        //console.log('done');
    });
}

util.inherits(DiscoverComponents, EventEmitter);

DiscoverComponents.prototype.getChildrenComponents = function(parentComponent, done) {
    var children = [];

    var readStream = fs.createReadStream(parentComponent.path);
    readStream.setEncoding('utf8');

    var rl = readline.createInterface({
        input: readStream,
        output: null
    });

    readStream.on('end', function() {
        rl.close();
        parentComponent.children = children;
        //console.log(children);
        if (children.length) {
            children.forEach(function(child) {
                this.getChildrenComponents(child, done);
            }.bind(this));
        } else {
            done();
        }
    }.bind(this));

    rl.on('line', function(line) {
        var requirePathMatch = this.requirePathRegex.exec(line),
            path, pathStart,
            symlinkDep = false, localDep = false;
        if (requirePathMatch) {
            path = requirePathMatch[1]; // get 'path' from require('path')
            pathStart = path.split('/')[0]; // 'symlink', '.', '..'

            if (pathStart === 'app') {
                symlinkDep = true;
            } else if (pathStart === '.' || pathStart === '..') {
                localDep = true;
            }

            if (symlinkDep) {
                path = this.symlinkPath + path;
            } else if (localDep) {
                path = pathModule.parse(parentComponent.path).dir + '/' + path;
            }

            if (symlinkDep || localDep) {
                path = path.replace(/\//g, pathModule.sep) + '.js';

                children.push({
                    name: '',
                    path: path
                });
                //console.log(children[children.length - 1]);
            }
        }
    }.bind(this));
};

module.exports = DiscoverComponents;
