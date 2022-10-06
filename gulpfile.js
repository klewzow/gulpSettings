let project_folder = "dist" // папка куда будут помещены готовые исходники
let sourse_folder = "#src"  // папка с исходниками

let path = {   // переменная с объектами которые содержат пути к файлам

    build: {    // обработаные файлы
        html: project_folder + "/",         // путь к html
        css: project_folder + "/css/",      // путь к css
        js: project_folder + "/js/",        // путь к js
        img: project_folder + "/img/",      // путь к img
        fonts: project_folder + "/fonts/"   // путь к fonts
    },
    src: {    // исходники
        html: [sourse_folder + "/*.html", "!" + sourse_folder + "/_*.html"],                                                              // путь к html
        css: sourse_folder + "/scss/style.scss",                                                // путь к scss
        js: sourse_folder + "/js/script.js",                                                    // путь к js
        img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",                            // путь к img и расширения
        fonts: sourse_folder + "/fonts/*.ttf"                // путь к  fonts и расширения
    },
    watch: {    // За какими файлами нужно следить
        html: sourse_folder + "/**/*.html",                                                     // путь к html
        css: sourse_folder + "/scss/**/*.scss",                                                 // путь к scss
        js: sourse_folder + "/js/**/*.js",                                                      // путь к js
        img: sourse_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",                            // путь к img и расширения
        // шрифты слушать не нужно
    },
    // Очистка и пересоздание
    clean: "./" + project_folder + "/",
}

// Переменные для написания сценария
const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const del = require('del');
const browsersync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const cleanJS = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

// для browser-sync
function browserSync() {
    browsersync.init({
        server: {
            open: true,
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function css() {
    return gulp.src(path.src.css)
        .pipe(scss({ outputStyle: "expanded" }))
        .pipe(autoprefixer({ overrideBrowserslist: ["last 5 versions"], cascade: true }))
        .pipe(gcmq())
        .pipe(gulp.dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream())
}
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function html() {
    return gulp.src(path.src.html)
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream())
}

function js() {
    return gulp.src(path.src.js)
        .pipe(fileinclude())
        .pipe(gulp.dest(path.build.js))
        .pipe(rename({ extname: ".min.js" }))
        .pipe(cleanJS())
        .pipe(gulp.dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 5, // 0-7
            interlaced: true,
            svgoPlugins: [{ removeViewBox: false }]
        }))
        .pipe(browsersync.stream())
}

function clean() {
    return del(path.clean)
}

function font() {
    gulp.src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(gulp.dest(path.build.fonts));
    return gulp.src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.build.fonts));
}

// Добавление задач
let build = gulp.series(clean, gulp.parallel(images, html, css, js ), font);

// Добавление задач в общую переменную в паралельных потоках
let watch = gulp.parallel(build, watchFiles, browserSync);

// Добавление в gulp
exports.font = font;
exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;
exports.build = build;
exports.watch = watch;
exports.default = watch; // запускается при старте gulp и вызывает watch