const gulp = require('gulp');

require('./_gulp/dev.js');
require('./_gulp/docs.js');

gulp.task('default', gulp.series(
  'clean:dev',
  gulp.parallel('build-dev'),
  gulp.parallel('server-dev')
));


gulp.task('docs', gulp.series(
  'clean:docs',
   gulp.parallel('build-docs'),
   gulp.parallel('server-docs')
));

