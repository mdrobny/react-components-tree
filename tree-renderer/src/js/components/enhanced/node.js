'use strict';

var React = require('react');

var Node = React.createClass({
    displayName: 'Node',
    propTypes: {
        // when no children put empty table
        fileName: React.PropTypes.string.isRequired,
        displayName: React.PropTypes.string.isRequired
    },

    render: function() {
        return (
            <div>
                <div className="node component-box">
                    <p>{this.props.displayName}</p>
                    <p>({this.props.fileName + '.js'})</p>
                </div>
            </div>
        );
    }
});

module.exports = Node;
