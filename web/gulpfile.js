/* jshint node: true, browser: false */
"use strict";

var _ = require("lodash");
var beautify = require("gulp-jsbeautifier");
var browserify = require("browserify");
var browserSync = require("browser-sync");
var buffer = require("vinyl-buffer");
var del = require("del");
var envify = require("envify/custom");
var gulp = require("gulp");
var gulpif = require("gulp-if");
var inject = require("gulp-inject");
var jshint = require("gulp-jshint");
var jshintcli = require("jshint/src/cli");
var source = require("vinyl-source-stream");
var sourcemaps = require("gulp-sourcemaps");
var strictify = require("strictify");
var stylish = require("jshint-stylish");
var uglify = require("gulp-uglify");
var util = require("gulp-util");
var watchify = require("watchify");

var env = process.env.NODE_ENV || "development";

function build(bundler) {
    bundler.add("./src/index.js");
    bundler.transform(strictify);
    bundler.transform(envify({
        NODE_ENV: env,
        API_URL: (function() {
            if (env === "production") {
                return "http://elliespad.com/api";
            } else {
                return "http://localhost:8080/api";
            }
        })()
    }));
    bundler.on("log", util.log);

    function bundle() {
        return bundler.bundle()
            .on("error", function(err) {
                util.log(util.colors.magenta("browserify"), err.message);
                bundler.emit("end");
            })
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true
            }))
            .pipe(gulpif(env === "production", uglify()))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("dist/"))
            // TODO @daniel Reload the browser when updating unbundled files, e.g. index.html.
            .pipe(browserSync.reload({
                once: true,
                stream: true
            }));
    }
    bundler.on("update", bundle);

    return gulp.src("src/index.html")
        .pipe(inject(bundle()))
        .pipe(gulp.dest("dist/"));
}

gulp.task("build", ["clean"], function() {
    return build(browserify());
});

gulp.task("buildWatch", ["clean"], function() {
    return build(watchify(browserify(watchify.args)));
});

gulp.task("checkFormat", function() {
    return gulp.src(["*.js", "src/**/*.js"])
        .pipe(beautify({
            config: ".jsbeautifyrc",
            mode: "VERIFY_ONLY"
        }));
});

gulp.task("clean", function(callback) {
    del(["dist/"], callback);
});

gulp.task("format", function() {
    return gulp.src(["*.js", "src/**/*.js"])
        .pipe(beautify({
            config: ".jsbeautifyrc",
            mode: "VERIFY_AND_WRITE"
        }));
});

gulp.task("lint", ["checkFormat"], function() {
    var jshintrc = jshintcli.getConfig("./.jshintrc");
    delete jshintrc.dirname;

    return gulp.src(["*.js", "src/**/*.js"])
        .pipe(jshint(_.merge(jshintrc, {
            devel: env === "development"
        })))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter("fail"));
});

gulp.task("serve", ["buildWatch"], function() {
    browserSync({
        open: false,
        proxy: "localhost:8080"
    });
});

gulp.task("test", function(callback) {
    callback();
});
