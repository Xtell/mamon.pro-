let gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    csso            = require('gulp-csso'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    imagemin        = require('gulp-imagemin'),
    webp            = require('imagemin-webp'),
    svgo            = require('gulp-svgmin'),
    svgSprite       = require('gulp-svg-sprite'),
    cache           = require('gulp-cache'),
    uglify          = require('gulp-uglify-es').default,
    rigger          = require('gulp-rigger'),
    newer           = require('gulp-newer'),
    rename          = require('gulp-rename'),
    concat          = require('gulp-concat'),
    del             = require('del'),
    browserSync     = require('browser-sync').create(),
    debug           = require('gulp-debug'),
    extReplace      = require("gulp-ext-replace");

let paths = {
    'scss': './app/scss/',
    'css': './app/css/',
    'scripts': './app/js/',
    'imagesSrc': './app/img/src/',
    'imagesDest': './app/img/',
    'html': './app/html/*.html'

}

gulp.task('serve', function(done) {
    browserSync.init({
        server: "./app"
    });
});

gulp.task('styles', function () {
    return gulp.src(paths.scss + 'main.scss')
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(csso())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});
gulp.task('scripts', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',

        paths.scripts + 'libs/*',
        paths.scripts + 'custom.js'
    ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts))
    .pipe(browserSync.stream());
});

//IMAGES OPTIMIZATION

gulp.task('jpegAndPngOptimize', function() {
    return gulp.src(paths.imagesSrc + '**/*')
    .pipe(imagemin([
           imagemin.mozjpeg({quality: 85, progressive: true}),
           imagemin.optipng({optimizationLevel: 3})
        ]))
	.pipe(gulp.dest(paths.imagesDest));
});
gulp.task('jpegOptimize', function() {
    return gulp.src(paths.imagesSrc + '**/*.{jpg, jpeg}')
    .pipe(imagemin([
        imagemin.mozjpeg({quality: 90, progressive: true})
    ]))
    .pipe(gulp.dest(paths.imagesDest));
});
gulp.task('pngOptimize', function() {
    return gulp.src(paths.imagesSrc + '**/*.png')
    .pipe(imagemin([
        imagemin.optipng()
    ]))
    .pipe(gulp.dest(paths.imagesDest));
});
gulp.task('makeWebp', function() {
    return gulp.src(paths.imagesSrc + '**/*.{png,jpg,jpeg}')
    .pipe(imagemin([
        webp({quality: 80})
    ]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest(paths.imagesDest));
});

gulp.task('optimizeSvg', function() {
    return gulp.src(paths.imagesSrc + '**/*.svg')
    .pipe(imagemin([
        imagemin.svgo({})
    ]))
    .pipe(gulp.dest(paths.imagesDest));
});
gulp.task('images', gulp.series('makeWebp', 'jpegOptimize','pngOptimize', 'optimizeSvg'));

gulp.task('html', function () {
    return gulp.src(paths.html)
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.stream());
});
gulp.task('watch', function(){
    gulp.watch(paths.scss + '**/*', gulp.series('styles'));
    gulp.watch(paths.html, gulp.series('html'));
    gulp.watch([paths.scripts + 'libs.js', paths.scripts + 'custom.js'], gulp.series('scripts'));
});

gulp.task('default', gulp.parallel('images', 'styles', 'scripts', 'html', 'serve', 'watch'));
