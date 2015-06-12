'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var webpack = require('gulp-webpack');
var livereload = require('gulp-livereload');

gulp.task('webpack', function() {
    return gulp.src('./tree-renderer/src/js/*')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./tree-renderer/public/js'))
        .pipe(livereload());
});

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
    livereload.listen();
});

gulp.task('default', ['webpack', 'server']);
