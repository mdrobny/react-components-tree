'use strict';

var React = require('react');
var Node = require('./node');

var Tree = React.createClass({
    displayName: 'Tree',
    propTypes: {
        rootNode: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <div>
                <h1>React components tree</h1>
                <Node displayName={this.props.rootNode.displayName}
                      fileName={this.props.rootNode.fileName}
                      childNodes={this.props.rootNode.children} />
            </div>
        );
    }
});

module.exports = Tree;
