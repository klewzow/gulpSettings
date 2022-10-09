Установка gulp глобально
install --global gulp-cli
/*
Может потребовать обновления пример : npm install -g npm@8.19.2
*/
Даее из папки проекта выполнить 
npm init 


/*
Эта утилита поможет вам создать файл package.json.
Он охватывает только самые распространенные элементы и пытается угадать разумные значения по умолчанию.

Подробную документацию по этим полям см. в `npm help init`.
и именно то, что они делают.

После этого используйте `npm install <pkg>`, чтобы установить пакет и
сохраните его как зависимость в файле package.json.
*/


заполнить данные чтото вроде :
{
  "name": "test-gulp",
  "version": "1.0.0",
  "description": "Сборка gulp",
  "main": "index.html",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Klevtsov",
  "license": "ISC"
}
В папке с проектом появится файл package.json в котором сохранятся ети данные(их можно изменить)

В папке с проектом установить  
npm instal gulp --save-dev
/*
Будет изменен package,json и добавленны packege-lock.json node_modules
*/


Установка плагинов и настройка : 
/*
настройка иерархии папок
*/
В папке с проектом создать 
файл 
	gulpfile.js <= именно
папку для исходников
	#src
		img js scss fonts  +   создать первые файлы /*.js .scss*/
	index.html



Тест gulp =>

в gulpfile.js поместить

function defaultTask(cb) {
  // place code for your default task here
  cb();
}
 

exports.default = defaultTask

и запустить в терминале коммандой gulp 
должно появится чтото вида : 

[12:51:14] Using gulpfile E:\html\gulpTest\gulpfile.js
[12:51:14] Starting 'default'...
[12:51:14] Finished 'default' after 1.9 ms

PLUGINS
===================================>>>


BrowserSync - https://browsersync.io/docs/gulp
File Include - https://www.npmjs.com/package/gulp-file-include
Del - https://www.npmjs.com/package/del
Sass - https://www.npmjs.com/package/gulp-sass
Autoprefixer - https://www.npmjs.com/package/gulp-autoprefixer
Group CSS media-queries - https://www.npmjs.com/package/gulp-group-css-media-queries
Rename - https://www.npmjs.com/package/gulp-rename
Clean CSS - https://www.npmjs.com/package/gulp-clean-css
Uglify ES - https://www.npmjs.com/package/gulp-uglify-es
Imagemin - https://www.npmjs.com/package/gulp-imagemin
ttf2woff - https://www.npmjs.com/package/gulp-ttf2woff
ttf2woff2 - https://www.npmjs.com/package/gulp-ttf2woff2

/* считаю не нужными
Babel - https://www.npmjs.com/package/gulp-babel
Fonter - https://www.npmjs.com/package/gulp-fonter
SVG Sprite - https://www.npmjs.com/search?q=gulp-svg-sprite
*/
/* Эти под вопроссом
WEBP - https://www.npmjs.com/package/gulp-webp
WEBP HTML - https://www.npmjs.com/package/gulp-webp-html
WEBP CSS - https://www.npmjs.com/package/gulp-webpcss
*/
 ++
npm i gulp-decomment --save-dev // Удаление комментариев Html
 
