const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');

return gulp.src([
    "./static/styles/*.css",
])
    .pipe(cleanCSS())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest("./static/min-styles"))