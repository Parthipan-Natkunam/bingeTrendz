'use strict';

var csso = require('gulp-csso');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify-es').default;
var dest = './build';

gulp.task('buildCSS', function () {
    return gulp.src('./style.css')
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest(dest))
});

gulp.task('buildJS', function() {
    return gulp.src('./app.js')
        // Minify the file
        .pipe(uglify())
        // Output
        .pipe(gulp.dest(dest))
});

gulp.task('buildHTML', function() {
    return gulp.src(['./newTab.html'])
        .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('default',function () {
    runSequence(
        'buildCSS',
        'buildHTML',
        'buildJS'
    );
});

