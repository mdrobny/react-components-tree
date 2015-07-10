'use strict';

var React = require('react');
var Row = require('./row');

var Tree = React.createClass({
    displayName: 'Tree',
    propTypes: {
        rootNode: React.PropTypes.array.isRequired
    },

    searchEl: function(id) {
        var result = this.props.rootNode.filter(function(el) {
            return el.id === id;
        });
        return result[0];
    },

    transformTable: function() {
        var resultTable = [];
        resultTable[0] = [[this.props.rootNode[0]]];
        var currentRow = resultTable[0], i = 0;
        var that = this;
        var nodeHasChildren = true;

        while (nodeHasChildren) {
            nodeHasChildren = false;
            resultTable[i + 1] = [];
            var nodeCount = 0;
            currentRow.forEach(function(nodesWrapper, j) {
                nodesWrapper.forEach(function(node, k) {
                    if (node) {
                        resultTable[i + 1][nodeCount] = [];
                        if (node.children.length > 0) {
                            nodeHasChildren = true;
                        }
                        node.children.forEach(function(childId) {
                            resultTable[i + 1][nodeCount].push(that.searchEl(childId));
                        });
                    }
                    nodeCount++;
                });
            });
            i++;
            currentRow = resultTable[i];
        }
        return resultTable;
    },

    render: function() {
        return (
            <div>
                <h1>React components tree</h1>
                <div>
                    {this.transformTable().map(function(item, idx) {
                        return <Row key={idx} nodeList={item} />;
                    })}
                </div>
            </div>
        );
    }
});

module.exports = Tree;
