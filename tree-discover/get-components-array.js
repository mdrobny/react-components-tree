'use strict';

var componentsArray = [];

function pushComponentsToArray(treeNode) {
    if (treeNode.type === 'component') {
        componentsArray.push(treeNode);
        if (treeNode.children) {
            treeNode.children.forEach(function(child) {
                pushComponentsToArray(child);
            });
            // Return only children ids in array
            treeNode.children = treeNode.children.map(function(child) {
                return child.id;
            });
        }
    }
}

// Get flat array of all components
function getComponentsArray(treeRoot) {
    pushComponentsToArray(treeRoot);

    return componentsArray;
}

module.exports = getComponentsArray;
