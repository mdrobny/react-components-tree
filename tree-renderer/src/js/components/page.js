'use strict';

var React = require('react');

var Page = React.createClass({
    displayName: 'Page',

    render: function() {
        return (
            <div>It's alive!!!</div>
        );
    }
});

if (typeof window !== 'undefined') {
    React.render(<Page />, document.getElementById('root'));
}

module.exports = Page;
