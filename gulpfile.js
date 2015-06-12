'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;


gulp.task('server', function(cb) {
    var appServer = spawn('node', ['server.js']);
    appServer.stderr.on('data', function(data) {
        console.log('Server err: ' + data);
        cb();
    });
    appServer.stdout.on('data', function(data) {
        console.log('Server: ' + data);
        cb();
    });
});

gulp.task('default', ['server']);
