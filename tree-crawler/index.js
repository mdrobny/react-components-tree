'use strict';

var DiscoverComponents = require('./discover-components');

var discoverComponentsTree = function() {
    var discover = new DiscoverComponents({
        projectPath: 'C:\\workspace\\vglive\\vglive-admin\\',
        symlinkPath: 'C:\\workspace\\vglive\\vglive-admin\\node_modules\\',
        componentsDirPath: 'C:\\workspace\\vglive\\vglive-admin\\src\\js\\components\\',
        reactRootComponentPath: 'C:\\workspace\\vglive\\vglive-admin\\src\\js\\app.js'
    });
};

discoverComponentsTree();
