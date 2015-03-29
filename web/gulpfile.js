var _ = require("lodash");
var del = require("del");
var gulp = require("gulp");
var gulpWebpack = require("gulp-webpack");
var inject = require("gulp-inject");
var util = require("gulp-util");

// Webpack.
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");

var env = process.env.NODE_ENV || "development";

var webpackConfig = require("./webpack.config");

if (env === "production") {
  _.merge(webpackConfig, {
    devtool: "source-map",
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env),
        "process.env.API_URL": JSON.stringify("http://elliespad.com/api")
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  });
} else {
  _.merge(webpackConfig, {
    devtool: "eval",
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env),
        "process.env.API_URL": JSON.stringify("http://localhost:8080/api")
      })
    ]
  });
}

gulp.task("build", ["clean"], function() {
  var dist = gulp.src(webpackConfig.entry)
    .pipe(gulpWebpack(webpackConfig))
    .pipe(gulp.dest("dist/"));

  return gulp.src("src/app.html")
    .pipe(inject(dist, {relative: true}))
    .pipe(gulp.dest("dist/"));
});

gulp.task("clean", function(callback) {
  del(["dist/"], callback);
});
