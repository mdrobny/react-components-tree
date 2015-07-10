'use strict';

var React = require('react');
var NodeWrapper = require('./node-wrapper');

var Row = React.createClass({
    displayName: 'Row',
    propTypes: {
        // when no children put empty table
        nodeList: React.PropTypes.array
    },

    renderChildNodes: function() {
        if (this.props.nodeList.length) {
            return this.props.nodeList.map(function(item, i) {
                return <NodeWrapper data={item} key={i}/>;
            });
        }
    },

    render: function() {
        return (
            <div className="component-row">
                {this.renderChildNodes()}
            </div>
        );
    }
});

module.exports = Row;
