'use strict';

var React = require('react');
var TreeSimple = require('./simple/tree');
var TreeEnhanced = require('./enhanced/tree');
var xhr = require('xhr');

var Page = React.createClass({
    displayName: 'Page',

    getInitialState: function() {
        return {
            data: null,
            type: 'enhanced'
        };
    },

    componentDidMount: function() {
        this.getData();
    },

    getData: function() {
        xhr({
            uri: './components-tree-flat.json',
            headers: {
                'Content-Type': 'application/json'
            }
        }, function(err, resp, body) {
            if (err) {
                return;
            }
            this.setState({data: JSON.parse(body)});
        }.bind(this));
    },

    render: function() {
        var content;
        if (this.state.data) {
            if (this.state.type === 'simple') {
                content = <TreeSimple rootNode={this.state.data} />;
            } else {
                content = <TreeEnhanced rootNode={this.state.data} />;
            }
        } else {
            content = <p>Poczekaj chwile kurwa</p>;
        }
        return (
            <div>{content}</div>
        );
    }
});

module.exports = Page;
