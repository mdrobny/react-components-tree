'use strict';

var React = require('react');
var Row = require('./row');

var Tree = React.createClass({
    displayName: 'Tree',
    propTypes: {
        rootNode: React.PropTypes.array.isRequired
    },

    transformTable: function() {
        var countDepth = function(item, table) {
            if (item.parentId === 0) {
                return 0;
            } else {
                return 1 + countDepth(table[item.parentId - 1], table);
            }
        }
        var resultTable = [];
        this.props.rootNode.forEach(function(item, idx, table) {
            var depth = countDepth(item, table);
            if (resultTable[depth]) {
                resultTable[depth].push(item);
            } else {
                resultTable[depth] = [item];
            }
        });

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
