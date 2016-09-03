var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var inlinecss = require('gulp-inline-css');
var cleancss = require('gulp-clean-css');
var queue = require('streamqueue');

// Paths to various files
var paths = {
    scripts: ['js/*.js','views/js/*.js'],
    styles: ['css/*.css', 'views/css/*.css'],
    images: ['img/**/*', 'views/images/**/*'],
    restPages: ['*.html', 'views/*.html', '!index.html'],
    firstPage: 'index.html',
    content: ['*.html', 'views/*.html']
};

// Minifies js files and outputs them to build/
gulp.task('scripts', function() {
    return gulp.src(paths.scripts, {base: '.'})
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

// Inline CSS and minifies HTML files and outputs them to build/
gulp.task('content', function() {
    return queue(
        {objectMode: true},
        gulp.src(paths.firstPage, {base: '.'})
        .pipe(inlinecss()),
        gulp.src(paths.restPages, {base: '.'})
    ).pipe(htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
    }))
    .pipe(gulp.dest('build'));
});

// Minifies CSS files
gulp.task('styles', function () {
    return gulp.src(paths.styles, {base: '.'})
    .pipe(cleancss())
    .pipe(gulp.dest('build'));
});

// Optimizes our image files and outputs them to build
gulp.task('images', function() {
    return gulp.src(paths.images, {base: '.'})
    .pipe(imagemin())
    .pipe(gulp.dest('build'));
});

// Watches for changes to our files and executes required scripts
gulp.task('content-watch', ['content', 'styles'], browserSync.reload);
gulp.task('image-watch', ['images'], browserSync.reload);
gulp.task('script-watch', ['scripts'], browserSync.reload);

// Launches a test webserver
gulp.task('browser', function(){
    browserSync({
        port: 8000,
        server: {
            baseDir: "build"
        },
        browser: 'google chrome',
    });
});

gulp.task('default', ['scripts', 'content', 'images', 'styles'], function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.content.concat(paths.styles), ['content', 'styles']);
    gulp.watch(paths.images, ['images']);
});
