'use strict';

var React = require('react');
var Node = require('./node');

var NodeWrapper = React.createClass({
    displayName: 'NodeWrapper',
    propTypes: {
        data: React.PropTypes.array
    },

    render: function() {
        return (
            <div className="node-wrapper">
                {this.props.data.map(function(item, i) {
                    if (item) {
                        return <Node displayName={item.displayName ? item.displayName : ''} fileName={item.fileName ? item.fileName : ''} key={i}/>;
                    }
                    return <div key={i}></div>;
                })}
            </div>
        );
    }
});

module.exports = NodeWrapper;
