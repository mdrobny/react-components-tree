'use strict';

var React = require('react');

var Node = React.createClass({
    displayName: 'Node',
    propTypes: {
        // when no children put empty table
        childNodes: React.PropTypes.array.isRequired,
        fileName: React.PropTypes.string.isRequired,
        displayName: React.PropTypes.string.isRequired,
        tab: React.PropTypes.string
    },

    renderChildNodes: function() {
        return this.props.childNodes.map(function(item) {
            return (<Node childNodes={item.children}
                        displayName={item.displayName} fileName={item.fileName}
                        tab={this.props.tab + ' ---'} key={item.fileName}
                    />);
        }.bind(this));
    },

    render: function() {
        return (
            <div>
                <div className="node component-box">
                    <p>{this.props.tab + '>' + this.props.displayName} ({this.props.fileName})</p>
                </div>
                <div>{this.renderChildNodes()}</div>
            </div>
        );
    }
});

module.exports = Node;
