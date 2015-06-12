'use strict';

var React = require('react');
var Page = require('./js/components/page');

var App = React.createClass({
    displayName: 'App',

    render: function() {
        return (
            <Page />
        );
    }
});

if (typeof window !== 'undefined') {
    React.render(<App />, document.getElementById('root'));
}

module.exports = App;
