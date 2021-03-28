const gulp = require('gulp');
const uglifycss = require('gulp-uglifycss');

gulp.task('message', function () {
    return console.log('gulp is running')
})

gulp.task('css', function () {
    gulp.src('./styles/style.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./static/min-styles/'));
});

gulp.task('run'['css']);

gulp.task('watch', function () {
    gulp.watch('./styles/style.css', ['css']);
})

gulp.task('default', ['run', 'watch']);