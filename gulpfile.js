'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    //uglify = require('gulp-uglify'), // JavaScript compressor
    //concat = require('gulp-concat'), // Concatenate files
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    //gcmq = require('gulp-group-css-media-queries'),
    rimraf = require('rimraf'),
    plumber = require('gulp-plumber');

var path = {
    build: {
        css: 'css/'
    },
    src: {
        style: 'sass/*.scss'
    },
    watch: {
        style: 'sass/*/*.scss'
    },
    clean: './css'
};

var config = {
    server: {
        baseDir: "./css"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['sass/'],
            sourcemaps: true,
            errLogToConsole: true
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(gcmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('build', [
    'style:build'
]);

gulp.task('watch', function(){
    gulp.watch(path.watch.style, ['style:build']);
});

gulp.task('default', ['build', 'watch']);
