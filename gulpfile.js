var gulp = require('gulp')
var path = require('path')
var del = require('del')
var env = require('minimist')(process.argv.slice(2))
var through2 = require('through2')
var $ = require('gulp-load-plugins')({
  pattern: '*'
})

var environments = ['development', 'production']
var environment = environments.indexOf(env.t) > -1 ? env.t : 'development'
var isProduction = (environment === 'production')
var webpackConfig = require('./webpack.config.js')[environment]

var port = env.p || 9001
var src = 'web/app/'
var dist = 'web/public/'

gulp.task('clean', function (cb) {
  del([dist]).then(function () {
    cb()
  })
})

gulp.task('scripts', function () {
  return gulp.src(webpackConfig.entry.app)
    .pipe($.webpackStream(webpackConfig))
    .pipe(isProduction ? $.uglify({preserveComments: 'license'}) : through2.obj())
    .pipe(isProduction ? $.stripDebug() : through2.obj())
    .pipe(gulp.dest(dist))
    .pipe($.size({
      title: 'js'
    }))
    .pipe($.connect.reload())
})

gulp.task('static', function (cb) {
  return gulp.src(src + 'assets/**/*')
    .pipe($.size({
      title: 'static'
    }))
    .pipe(gulp.dest(dist + 'assets/'))
})

gulp.task('serve', function () {
  $.connect.server({
    root: dist,
    port: port,
    host: '0.0.0.0',
    livereload: {
      port: 35728
    }
  })
})

gulp.task('watch', function watch () {
  gulp.watch(src + 'assets/**/*', gulp.series('static'))
  gulp.watch(src + '**/*.js', gulp.series('scripts'))
  gulp.watch(src + '**/*.hbs', gulp.series('scripts'))
  gulp.watch(src + '**/*.json', gulp.series('scripts'))
  gulp.watch(src + '**/*.css', gulp.series('scripts'))
})

var defaultTasks = ['static', 'scripts']

// waits until clean is finished then builds the project
gulp.task('build', gulp.series('clean', gulp.parallel('static', 'scripts')), function () {

})

// by default build project and then watch files

gulp.task('default', gulp.parallel('build', 'serve', 'watch'), function () {
})
