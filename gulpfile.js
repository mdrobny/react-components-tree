'use strict';

var gulp = require('gulp');

var nodemon = require('gulp-nodemon');

gulp.task('crawlerApp', function() {
    var options = {
        script: 'tree-crawler/index.js',
        ext: 'js',
        ignore: ['node_modules/']
    };

    nodemon(options);
});

gulp.task('default', []);
