var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
    compass = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat');
 
gulp.task('scss', function(){
    
    gulp.src('dev/css/**/*.scss')
    	.pipe(plumber())
    	.pipe(compass({
    		css: 'dev/css',
    		sass: 'dev/css',
    		style: 'nested'
    	}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minifyCss())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload());
})

gulp.task('vendorCss', function () {
    gulp.src('dev/css/vendor/**/*.css')
        .pipe(plumber())
        .pipe(concat('vendor.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'))
        .pipe(livereload());
})

gulp.task('js', function () {
 
	gulp.src('dev/js/*.js')
	.pipe(concat('main.js'))
    .pipe(uglify())
	.pipe(gulp.dest('dist/js/'))
	.pipe(livereload());
});

gulp.task('vendorJs', function () {
 
    gulp.src('dev/js/vendor/**/*.js')
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload());
});

gulp.task('img', function () {
    gulp.src('dev/css/img/**/*.{jpg,png,gif}')
    	.pipe(plumber())
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/css/img/'));

    gulp.src('dev/images/**/*.{jpg,png,gif}')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images/'))
        .pipe(livereload());
});

gulp.task('copy', function () {
    gulp.src('dev/font/**/*.*')
        .pipe(gulp.dest('dist/font/'));

    gulp.src('*.{php,html}')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	livereload.listen();
    gulp.watch('dev/css/vendor/**/*.css', ['vendorCss']);
  	gulp.watch('dev/css/**/*.scss', ['scss']);
  	gulp.watch('dev/js/vendor/**/*.js', ['vendorJs']);
    gulp.watch('dev/js/*.js', ['js']);
    gulp.watch('dev/*.{php,html}', ['copy']);
 
});
 
gulp.task('dist', ['copy', 'vendorCss', 'scss', 'vendorJs', 'js', 'img']);