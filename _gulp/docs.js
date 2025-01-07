const gulp = require('gulp');
// HTML
const fileinclude = require('gulp-file-include');//включение нескольких HTML в один HTML
const htmlclean = require('gulp-htmlclean');//минимизация HTML
const webphtml = require('gulp-webp-for-html'); //автоматическая обертывание в <picture> для показа .webp

// SASS
const sass = require('gulp-dart-sass');//Вар-4 sass конвертация scss в один css Вар-1,2,3
const autoprefixer = require('gulp-autoprefixer');//расстанока префиксов стилей для старых барузеров
const csso = require('gulp-csso');//минификация css
const webpcss = require("gulp-webp-css");//конвертация в .wepb картинок в style.css
const groupMedia = require('gulp-group-css-media-queries'); //группировка CSS @media в один блок

const browsersync = require("browser-sync"); // вместо сервра, сдалал как раньше в Модуле10

const clean = require('gulp-clean');//удалить все
const fs = require('fs'); //доступ к файлам

const plumber = require('gulp-plumber');//отслеживание ошибок при сборке
const notify = require('gulp-notify');//выводит нотицикацию на экран об ошибках
const webpack = require('webpack-stream');//сборка JS
const babel = require('gulp-babel');//адаптация JS под старые браузеры
const changed = require('gulp-changed');//отслеживиние изменений файла (пропускать при отсутсвии изменений)
// Images
const imagemin = require('gulp-imagemin');//сжатие изобржения
const webp = require('gulp-webp');//конвертация картинок в *.webp в [img]




const fileInclude = {
    prefix: '@@',
    basepath: '@file'
  }

const docs = './docs';

gulp.task('clean:docs', (done) => {
  if (fs.existsSync(docs)) {
    return gulp.src(docs, {read: false}).pipe(clean({force: true}));
  }
  done(console.log('Нет папки docs'));
});

const plumberNotify = (title) => {
    return {
      errorHandler: notify.onError({
        title: title,
        message: 'Error <%= error.message %>',
        sound: false
      })
    }
}

// .src('./src/**/*.html')
gulp.task('html:docs', () => {
    return gulp
        .src('./src/*.html')
        .pipe(changed(docs, {hasChanged: changed.compareContents}))
        .pipe(fileinclude(fileInclude))
        .pipe(webphtml(['.jpg', '.png']))
        .pipe(htmlclean())
        .pipe(gulp.dest(docs))
        .pipe(browsersync.stream());
});

gulp.task('sass:docs', () => {
    return gulp.src('./src/assets/sass/*.scss')
                .pipe(changed(docs))
                .pipe(plumber(plumberNotify('Styles')))
                // .pipe(sourcemaps.init()) - отказался
                .pipe(sass().on('error', sass.logError))
                // .pipe(sourcemaps.write()) - отказался
                .pipe(autoprefixer())//расстанока префиксов стилей для старых барузеров
                .pipe(groupMedia()) //группировка CSS @media в один блок
                .pipe(webpcss()) //конвертация в .wepb картинок в style.css
                .pipe(csso()) //минификация css
                .pipe(gulp.dest(docs))
                .pipe(browsersync.stream());

});

gulp.task('copy-img:docs', function ()  {
  return gulp
    .src('./src/assets/img/**/*', { encoding: false })// берем исходники-картинки в src Имена с маленькой буквы
      .pipe(changed(docs + '/assets/img')) //если картинки изменились идем дальше, если нет пропускаем все
      .pipe(webp()) //обарабатываем картинки делаем webp
      .pipe(gulp.dest(docs + '/assets/img'))//сохраняем картинки
      //второй этап
      .pipe(gulp.src('./src/assets/img/**/*', { encoding: false }))//опять берем исходники-картинки в src Имена с маленькой буквы
      .pipe(changed(docs + '/assets/img')) //если картинки изменились идем дальше, если нет пропускаем все
      .pipe(imagemin({verbose: true})) //минимизируем картинки
      .pipe(gulp.dest(docs + '/assets/img'))
      .pipe(browsersync.stream());
});

// gulp.task('copy-svg:docs', function ()  { //для svg спрайта
//   return gulp
//     .src('./src/assets/img/**/*.svg')
//       .pipe(changed(docs + '/assets/img'))
//       .pipe(gulp.dest(docs + '/assets/img'))
//       .on("end", browsersync.reload);
// });


gulp.task('copy-fonts:docs', (done) => {
  if (fs.existsSync('./src/assets/fonts/')) {
    return gulp
    .src('./src/assets/fonts/**/*', {encoding: false})
      .pipe(gulp.dest(docs + '/assets/fonts'))
      .on("end", browsersync.reload);
  }
  done(console.log('Нет папки'));
});


gulp.task('js:docs', () => { //делаю как раньше один script
  return gulp
    .src('./src/js/*.js')
    .pipe(changed(docs + '/js'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack({
          mode: 'production',
          output: {
              filename: 'script.js'
          },
          module: {
            rules: [
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
            ],
          },
      }))
    .pipe(gulp.dest(docs))
    .pipe(browsersync.stream());
});

gulp.task('copy-favicon:docs', (done) => {
  if (fs.existsSync('./favicon.ico')) {
    return gulp
    .src('favicon.ico', {encoding: false})
      .pipe(gulp.dest(docs));
      // .on("end", browsersync.reload);
  }
  done(console.log('Нет favicon.ico'));
});


gulp.task('server-docs', () => {
	browsersync.init({
		server: docs,
		port: 4000,
		notify: true
  });
});

gulp.task( 'build-docs', gulp.parallel('copy-fonts:docs', 'html:docs', 'sass:docs', 'copy-img:docs','js:docs', 'copy-favicon:docs'));

