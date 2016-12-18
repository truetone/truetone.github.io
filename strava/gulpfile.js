var gulp = require('gulp');
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

gulp.task('default', function() {
    return gulp.src("./css/sass/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./css/"));
});

// Watch task
gulp.task("watch", function() {
    gulp.watch(
        "./css/sass/**/*.scss",
        [
            "default"
        ]
    );
});
