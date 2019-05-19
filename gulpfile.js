// gulpfile to enable typescript conversion for node version of word game
const gulp = require('gulp');
const {watch} = require('gulp');
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject("tsconfig.json");
var reporter = ts.reporter.fullReporter();


function defaultTask(cb) {
    // place code for your default task here
    cb();
}

function compileTypescript() {
    return gulp.src("./*.ts")
    .pipe(sourcemaps.init())
    .pipe(tsProject(reporter))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./"));
}

function watchTask () {
    watch("./*.ts", compileTypescript );
}



exports.default = compileTypescript;
exports.ts = compileTypescript;
// exports.watch = watchTypescript;
exports.watch = watchTask;