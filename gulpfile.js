var defaultTasks = ['watch'];

var gulp = require('gulp');
var preprocess = require('gulp-preprocess');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cmq = require('gulp-combine-media-queries');
var minifycss = require('gulp-minify-css');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var clipboard = require('gulp-clipboard');

gulp.task('html', ['css', 'js'], function() {
  return compileHTML();
});
gulp.task('css', function() {
  return compileCSS();
})
gulp.task('js', function() {
  return compileJS();
})


/*gulp.task('test', function() {
  return gulp.src('build/main.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/'))
})
*/
function compileHTML() {
  var returnObj = gulp.src('theme/templates/main.tumblr')
    .pipe(preprocess())
    .on('error', watchTask ) // restart watch task on error
    .pipe(clipboard())
    .pipe(gulp.dest('dist/'));
}


function compileCSS() {
  return gulp.src('theme/sass/*.scss')
    .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe( cmq({
        log: true
    }))
    .pipe(gulp.dest('build/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('build/'))
}


function compileJS() {
/*  return browserify('./theme/js/main.js')
      .bundle()
      .on('error', watchTask) // restart watch task on error
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      .pipe(concat('./build/main')).js
      .pipe(gulp.dest('./build'))*/
  return gulp.src('theme/js/main.js')
    .pipe(gulp.dest('build/'))
/*    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build/'))*/
}



// Watch

gulp.task('watch', ['html', 'css', 'js'], watchTask);
gulp.task('default', defaultTasks);

function watchTask(error) {
    handleError(error);
    watchHTML();
    watchCSS();
}


function watchHTML(error) {
    handleError(error);
    gulp.watch(['theme/templates/*.tumblr', 'theme/templates/**/*.tumblr'], ['html']);
}

function watchCSS(error) {
    handleError(error);
    gulp.watch(['theme/sass/*.scss', 'theme/sass/**/*.scss'], ['html']);
}

function watchJS(error) {
    handleError(error);
    gulp.watch(['theme/js/main.js'], ['html']);
}


function handleError(error) {
    var message = error;
    if (typeof error === 'function' ) return;
    if (typeof error === 'object' && error.hasOwnProperty('message')) message = error.message;
    if (message !== undefined) console.log('Error: ' + message);
}