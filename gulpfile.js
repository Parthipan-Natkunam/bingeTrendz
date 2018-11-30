'use strict';

var csso = require('gulp-csso');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify-es').default;
var imagemin = require('gulp-imagemin');
var dest = './build';
var imageDest = './build/logos';

gulp.task('buildCSS', function () {
    return gulp.src('./style.css')
        .pipe(csso())
        .pipe(gulp.dest(dest))
});

gulp.task('buildJS', function() {
    return gulp.src('./app.js')
        .pipe(uglify())
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

gulp.task('compressLogo', function() {
    gulp.src('./logos/*')
        .pipe(imagemin())
        .pipe(gulp.dest(imageDest))
});

gulp.task('copyManifest', function () {
    gulp.src('./manifest.json')
        .pipe(gulp.dest(dest));
});

gulp.task('default',function () {
    runSequence(
        'buildCSS',
        'buildHTML',
        'buildJS',
        'compressLogo',
        'copyManifest'
    );
});

