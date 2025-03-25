const gulp = require('gulp')

const cpLottery = function() {
  return gulp.src('./lottery/**/*.*')
    .pipe(gulp.dest('./docs/.vuepress/dist/lottery/'))
}
module.exports.default = gulp.series([
  cpLottery
]);