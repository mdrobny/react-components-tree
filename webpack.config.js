'use strict';
var path = require('path');

var config = {
    context: path.join(__dirname, 'tree-renderer'),
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'tree-renderer', 'public', 'js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'jsx-loader?harmony', exclude: /node_modules/}
        ]
    }
};

module.exports = config;
