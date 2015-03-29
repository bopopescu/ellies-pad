var del = require("del");
var gulp = require("gulp");
var inject = require("gulp-inject");
var util = require("gulp-util");
var webpack = require("gulp-webpack");
var webpackDevServer = require("webpack-dev-server");

var webpackConfig = require("./webpack.config");

gulp.task("build", ["clean"], function() {
  var dist = gulp.src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("dist/"));

  return gulp.src("src/app.html")
    .pipe(inject(dist, {relative: true}))
    .pipe(gulp.dest("dist/"));
});

gulp.task("clean", function(callback) {
  del(["dist/"], callback);
});
