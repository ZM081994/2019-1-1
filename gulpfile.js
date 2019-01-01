var gulp = require("gulp");

var sass = require("gulp-sass");

var concat = require("gulp-concat");
var clean = require("gulp-clean-css");
var js = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var babel = require("gulp-babel")

gulp.task("devSass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest("./src/css"));
});

gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devSass"));
})

gulp.task("dev", gulp.series("devSass", "watch"))

//js
gulp.task("js", function() {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(js())
        .pipe(gulp.dest("./bulid/js"))
})

//html
gulp.task("html", function() {
    return gulp.src("./src/**.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./bulid"))
})

//css
gulp.task("dCss", function() {
    return gulp.src("./src/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./bulid/css"))
})

gulp.task("bulid", gulp.series("js", "html", "dCss"));