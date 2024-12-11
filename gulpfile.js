const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const plumber = require('gulp-plumber');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function fonts() {
    return src('src/assets/fonts/**/*.ttf')
        .pipe(dest('build/fonts') )
}

function html() {
    return src('src/*.html')
        .pipe( dest('build') )
}

function js() {
    return src('src/js/*.js')
        .pipe(dest('build/js') )
}

function css( done ) {
    src('src/scss/app.scss')
        .pipe(plumber({
            errorHandler: function(err) {
                console.error('Error en la tarea CSS:', err.message);
                this.emit('end');
            }
        }))
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        // .pipe( postcss([ autoprefixer() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function imagenes() {
    return src('src/assets/images/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/assets/images/**/*.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}

function dev() {
    watch( 'src/*.html', html );
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/assets/images/**/*', imagenes );
    watch( 'src/js/*.js', js )
}

exports.fonts = fonts
exports.html = html
exports.js = js;
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series( imagenes, versionWebp, html, fonts, js, css, dev );