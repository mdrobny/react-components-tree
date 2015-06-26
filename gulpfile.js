'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;
var webpack = require('gulp-webpack');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var path = require('path');

gulp.task('webpack', function() {
    return gulp.src('./tree-renderer/src/js/*')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./tree-renderer/public/js'))
        .pipe(livereload());
});

gulp.task('less', function() {
    return gulp.src('./tree-renderer/src/less/main.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest('./tree-renderer/public/css'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./tree-renderer/src/less/**/*.less', ['less']);
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

gulp.task('default', ['less', 'webpack', 'server', 'watch']);
