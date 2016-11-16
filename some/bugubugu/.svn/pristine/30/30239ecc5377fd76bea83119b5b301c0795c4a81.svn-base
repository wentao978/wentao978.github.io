var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
// var concat = require('gulp-concat');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var sh = require('shelljs');
var del = require('del');
var runSequence = require('run-sequence');
// var browserSync = require('browser-sync');
var wiredep = require('wiredep').stream;
var ngAnnotate = require('gulp-ng-annotate');
var inject = require('gulp-inject');
var angularTemplatecache = require('gulp-angular-templatecache');

var paths = {
  src: 'src/',
  dist: 'www/',
  tmp: '.tmp/',
  importPath: 'src/lib',
  sass: ['scss/**/*.scss']
};

gulp.task('serve:before', ['copy:dev', 'template', 'watch']);

// 是否需要minifyionic的css, keep them in src, then minify to www during build:prod
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./src/css/'))
    // .pipe(minifyCss({
    //   keepSpecialComments: 0
    // }))
    // .pipe(rename({extname: '.min.css' }))
    // .pipe(gulp.dest('./src/css/'))
    .on('end', done);
});

gulp.task('watch', ['wiredep:app', 'sass'], function() {
  gulp.watch('bower.json', ['wiredep:app']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.src + 'app/**/*.html', ['template']);
});

gulp.task('clean', function () {
    del([paths.dist + '**/*']);
});

gulp.task('copy', function () {
    return gulp.src(paths.src + 'lib/ionic/fonts/*.*').
              pipe(gulp.dest(paths.dist + 'lib/ionic/fonts/'));
});
gulp.task('copy:dev', function () {
    return gulp.src(paths.src + 'config/app.constants.dev.js')
              .pipe(rename({basename: 'app.constants', extname: '.js' }))
              .pipe(gulp.dest(paths.src + 'app/'));
});
gulp.task('copy:prod.js', function () {
    return gulp.src(paths.src + 'config/app.constants.prod.js')
              .pipe(rename({basename: 'app.constants', extname: '.js' }))
              .pipe(gulp.dest(paths.src + 'app/'));
});
gulp.task('copy:prod.files', function () {
    gulp.src([paths.src + 'img/*',paths.src + 'img/*/*']).pipe(gulp.dest(paths.dist + 'img/'));
    gulp.src([ paths.src + 'manifest.json',
                      paths.src + 'service-worker.js',
                      paths.src + 'templates.js',
                      paths.src + 'img',])
              .pipe(gulp.dest(paths.dist));
});
gulp.task('wiredep:app', function () {
    var s = gulp.src('src/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('src'));
    return s;
});
gulp.task('build:dev', function () {
    runSequence('copy:dev', 'sass', 'wiredep:app', 'template');
});
gulp.task('build:device', ['clean'], function () {
    runSequence('copy:prod.js', 'wiredep:app', 'useminDevice', 'copy', 'copy:prod.files');
});
gulp.task('build:prod', ['clean'], function () {
    runSequence('copy:prod.js', 'wiredep:app', 'usemin', 'copy', 'copy:prod.files');
});

var minifyHtmlConfig = {
  collapseWhitespace: true,
  collapseInlineTagWhitespace: true,
  collapseBooleanAttributes: true,
  removeComments: true
};
gulp.task('template:concat', function () {
  return gulp.src([paths.src + 'app/*.html', paths.src + 'app/**/*.html'])
    .pipe(htmlmin(minifyHtmlConfig))
    .pipe(angularTemplatecache({
        root: 'app/',
        module: 'bugu'
    }))
    .pipe(gulp.dest(paths.src));
});
gulp.task('template', ['template:concat'], function () {
    var injectTask = gulp.src(paths.src + 'index.html')
        .pipe(inject(gulp.src(paths.src + 'templates.js', {read: false}), {relative: true}))
        .pipe(gulp.dest(paths.src));
});

gulp.task('useminDevice', ['sass', 'template'], function () {
    return gulp.src([paths.src + '/index.html']).
          pipe(usemin({
              css_vender: [
                  // minifyCss({root: paths.src}),  // Replace relative paths for static resources with absolute path with root
                  'concat',
                  rev()
              ],
              css: [
                  prefix.apply(),
                  'concat',
                  rev()
              ],
              js_vender: [
                  'concat',
                  rev()
              ],
              js: [
                  ngAnnotate(),
                  'concat',
                  rev()
              ]
          })).
          pipe(gulp.dest(paths.dist)).
          on('error', function(e) {gutil.log('usemin error:' + e)});
});
gulp.task('usemin', ['sass', 'template'], function () {
    return gulp.src([paths.src + '/index.html']).
          pipe(usemin({
              css_vender: [
                  // minifyCss({root: paths.src}),  // Replace relative paths for static resources with absolute path with root
                  'concat',
                  rev()
              ],
              css: [
                  prefix.apply(),
                  minifyCss({root: paths.src}),  // Replace relative paths for static resources with absolute path with root
                  'concat',
                  rev()
              ],
              html: [
                  htmlmin(minifyHtmlConfig)
              ],
              js_vender: [
                  'concat',
                  rev()
              ],
              js: [
                  ngAnnotate(),
                  uglify(),
                  'concat',
                  rev()
              ]
          })).
          pipe(gulp.dest(paths.dist)).
          on('error', function(e) {gutil.log('usemin error:' + e)});
});

