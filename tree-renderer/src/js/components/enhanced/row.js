'use strict';

var React = require('react');
var Node = require('./node');

var Row = React.createClass({
    displayName: 'Row',
    propTypes: {
        // when no children put empty table
        nodeList: React.PropTypes.array
    },

    renderChildNodes: function() {
        return this.props.nodeList.map(function(item) {
            return <Node displayName={item.displayName} fileName={item.fileName} key={item.fileName}/>;
        });
    },

    render: function() {
        return (
            <div>
                <div className="component-row">
                    {this.renderChildNodes()}
                </div>
            </div>
        );
    }
});

module.exports = Row;
