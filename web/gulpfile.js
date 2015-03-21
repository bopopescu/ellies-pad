var gulp = require("gulp");
var inject = require("gulp-inject");
var util = require("gulp-util");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");

var webpackConfig = require("./webpack.config");

gulp.task("build", function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if (err) {
      throw new util.PluginError("webpack", err);
    }
    util.log("[build]", stats.toString());

    // TODO Inject the build artifact stream directly,
    // instead of finding the build artifacts by globbing.
    var dist = gulp.src(["dist/**/*.css", "dist/**/*.js"], {read: false});
    gulp.src("src/app.html")
      .pipe(inject(dist, {relative: true}))
      .pipe(gulp.dest("dist/"))
      .on("finish", callback);
  });
});
