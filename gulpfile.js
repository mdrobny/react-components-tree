'use strict';

var gulp = require('gulp');

var nodemon = require('gulp-nodemon');

gulp.task('traverseProjectFiles', function() {
    var options = {
        script: 'tree-discover/index.js',
        ext: 'js',
        ignore: ['node_modules/']
    };

    nodemon(options);
});

gulp.task('default', []);
