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
var uglify = require("gulp-uglify");
var util = require("gulp-util");
var watchify = require("watchify");

var env = process.env.NODE_ENV || "development";

var bundler = watchify(browserify(watchify.args));
bundler.add("./src/app.js");
bundler.transform("strictify");
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
        .on("error", util.log.bind(util, "Browserify Error"))
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(gulpif(env === "production", uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/"));
}
bundler.on("update", bundle);

gulp.task("build-watch", ["build"], browserSync.reload);

gulp.task("build", ["clean", "lint"], function() {
    return gulp.src("src/app.html")
        .pipe(inject(bundle(), {
            relative: true
        }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("clean", function(callback) {
    del(["dist/"], callback);
});

gulp.task("format", function() {
    return gulp.src(["*.js", "src/**/*.js"])
        .pipe(beautify({
            config: ".jsbeautifyrc",
            mode: "VERIFY_ONLY"
        }));
});

gulp.task("lint", ["format"], function() {
    var jshintrc = jshintcli.getConfig("./.jshintrc");
    delete jshintrc.dirname;

    return gulp.src(["*.js", "src/**/*.js"])
        .pipe(jshint(_.merge(jshintrc, {
            devel: env === "development"
        })))
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("serve", ["build"], function() {
    browserSync({
        notify: true,
        server: {
            baseDir: ".",
            index: "dist/app.html"
        },
        port: 8081,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        online: true
    });
    gulp.watch("src/", ["build-watch"]);
});
