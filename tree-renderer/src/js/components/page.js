'use strict';

var React = require('react');
var Tree = require('./tree');
var xhr = require('xhr');

var Page = React.createClass({
    displayName: 'Page',

    getInitialState: function() {
        return {
            data: null
        };
    },

    componentDidMount: function() {
        this.getData();
    },

    getData: function() {
        xhr({
            uri: './components-tree.json',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(err, resp, body) {
            this.setState({data: JSON.parse(body)});
        }.bind(this));
    },

    render: function() {
        var tree;
        if (this.state.data) {
            tree = <Tree rootNode={this.state.data} />;
        } else {
            tree = <p>Poczekaj chwile kurwa</p>;
        }
        return (
            <div>{tree}</div>
        );
    }
});

module.exports = Page;
