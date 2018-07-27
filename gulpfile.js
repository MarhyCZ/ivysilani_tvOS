var gulp = require('gulp')
var path = require('path')
var del = require('del')
var $ = require('gulp-load-plugins')({
  pattern: '*'
})

var environments = ['development', 'production']
var environment = environments.indexOf($.util.env.t) > -1 ? $.util.env.t : 'development'
var isProduction = (environment === 'production')
var webpackConfig = require('./webpack.config.js')[environment]

var port = $.util.env.p || 9001
var src = 'web/app/'
var dist = 'web/public/'

gulp.task('scripts', function () {
  return gulp.src(webpackConfig.entry.app)
    .pipe($.webpackStream(webpackConfig))
    .pipe(isProduction ? $.uglify({preserveComments: 'license'}) : $.util.noop())
    .pipe(isProduction ? $.stripDebug() : $.util.noop())
    .pipe(gulp.dest(dist))
    .pipe($.size({
      title: 'js'
    }))
    .pipe($.connect.reload())
})

gulp.task('serve', function () {
  $.connect.server({
    root: dist,
    port: port,
    host: "0.0.0.0",
    livereload: {
      port: 35728
    }
  })
})

gulp.task('static', function (cb) {
  return gulp.src(src + 'assets/**/*')
    .pipe($.size({
      title: 'static'
    }))
    .pipe(gulp.dest(dist + 'assets/'))
})

gulp.task('watch', function () {
  gulp.watch(src + 'assets/**/*', ['static'])
  gulp.watch(src + '**/*.js', ['scripts'])
  gulp.watch(src + '**/*.hbs', ['scripts'])
  gulp.watch(src + '**/*.json', ['scripts'])
  gulp.watch(src + '**/*.css', ['scripts'])
})

gulp.task('clean', function (cb) {
  del([dist]).then(function () {
    cb()
  })
})

var defaultTasks = ['static', 'scripts']

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function () {
  gulp.start(defaultTasks)
})

// by default build project and then watch files
gulp.task('default', ['build', 'serve', 'watch'])
