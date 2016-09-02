var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var inlineCss = require('gulp-inline-css');
var changed = require('gulp-changed');

// Paths to various files
var paths = {
    scripts: ['js/*.js','views/js/*.js'],
    styles: ['css/*.css','views/css/*.css'],
    images: ['img/**/*', 'views/images/**/*'],
    content: ['*.html', 'views/*.html']
};

// Minifies js files and outputs them to build/
gulp.task('scripts', function() {
    return gulp.src(paths.scripts, {base: '.'})
    .pipe(changed('build'))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

// Inline CSS & minifies HTML files and outputs them to build/
gulp.task('content', function() {
    return gulp.src(paths.content, {base: '.'})
    .pipe(changed('build'))
    .pipe(inlineCss())
    .pipe(htmlmin({
        collapseWhitespace: true,
    }))
    .pipe(gulp.dest('build'));
});

// Optimizes our image files and outputs them to build
gulp.task('images', function() {
    return gulp.src(paths.images, {base: '.'})
    .pipe(changed('build'))
    .pipe(imagemin())
    .pipe(gulp.dest('build'));
});

// Watches for changes to our files and executes required scripts
gulp.task('content-watch', ['content'], browserSync.reload);
gulp.task('image-watch', ['images'], browserSync.reload);
gulp.task('script-watch', ['scripts'], browserSync.reload);

// Launches a test webserver
gulp.task('browse', function(){
    browserSync({
        port: 3030,
        server: {
            baseDir: "build"
        },
        browser: 'google chrome',
    });
    gulp.watch(paths.scripts, ['script-watch']);
    gulp.watch(paths.content.concat(paths.styles), ['content-watch']);
    gulp.watch(paths.images, ['image-watch']);
});

gulp.task('default', ['scripts', 'content', 'images', 'browse']);
