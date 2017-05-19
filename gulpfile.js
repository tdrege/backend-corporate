var gulp         = require('gulp'),
    sass      = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync'),
    sprity       = require('sprity'),
    gulpif       = require('gulp-if'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    minifyCSS    = require('gulp-minify-css'),
    ignoreErrors = require('gulp-ignore-errors'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    path         = require('path');
    Promise         = require('promise');

var env = process.env.GULP_ENV;

gulp.task('js', function () {
    gulp.src([
        'app/Resources/public/js/**/*.js',
        '!app/Resources/public/**/*.min.js'
    ])
        .pipe(concat('javascript.js'))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/assets/js'));

    gulp.src(['app/Resources/public/js/**/*.min.js'])
        .pipe(gulp.dest('web/assets/js'));
});

gulp.task('vendor', function () {
    return gulp.src([
        'app/Resources/public/vendor/**/*.*'
    ])
        .pipe(gulp.dest('web/assets/vendor'));
});

gulp.task('css', function() {
    gulp.src([
        'app/Resources/public/css/**/*.css',
        '!app/Resources/public/**/*.min.css'
    ])
        .pipe(autoprefixer((
            'last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        )))
        .on('error', function(error) {
            console.log(error);
            this.emit('end');
        })
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifyCSS())
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('web/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['app/Resources/public/css/**/*.min.css'])
        .pipe(gulp.dest('web/assets/css'));
});

gulp.task('img', function() {
    return gulp.src(['app/Resources/public/img/**/**/*.png',
    ])
        .pipe(gulp.dest('web/assets/img'));
});

gulp.task('pdf', function() {
    return gulp.src('app/Resources/public/pdf/**/*.*')
        .pipe(gulp.dest('web/assets/pdf'));
});

gulp.task('plugins', function() {
    return gulp.src('app/Resources/public/plugins/**/*.*')
        .pipe(gulp.dest('web/assets/plugins/'));
});

gulp.task('default', ['js', 'css', 'img']);