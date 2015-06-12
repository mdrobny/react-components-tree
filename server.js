'use strict';

var express = require('express');
var app = express();
var path = require('path');

app.use(express['static'](path.join(__dirname, 'tree-renderer', 'public')));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

var server = app.listen(8081, function() {
    var port = server.address().port;

    console.log('Server app listening at port %s', port);
});
