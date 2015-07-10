'use strict';

var config = require('../config/config');

var TraverseProjectFiles = require('./traverse-project-files');
var getComponentsArray = require('./get-components-array');
var saveArrayToFile = require('./save-array-to-file');

var traverseProject = new TraverseProjectFiles(config);

traverseProject.on('discoverFinished', function(rootComponent) {
    var components = getComponentsArray(rootComponent);

    saveArrayToFile(components, 'tree-data/components.json');
});
