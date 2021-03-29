const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

gulp.task('message', function () {
    return console.log('gulp is running');
})

gulp.task('clean-css', function () {
    return gulp
        .src('./static/styles/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('static/minified'));
});

gulp.task('default', gulp.series('clean-css'));