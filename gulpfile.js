var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();
 
gulp.task('scss', function(){
    
    gulp.src('dev/css/**/*.scss')
    	.pipe(plugins.plumber())
    	.pipe(plugins.compass({
    		css: 'dev/css',
    		sass: 'dev/css',
    		style: 'nested'
    	}))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(plugins.livereload());
})

gulp.task('vendorCss', function () {
    gulp.src('dev/css/vendor/**/*.css')
        .pipe(plugins.plumber())
        .pipe(plugins.concat('vendor.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist/css/'))
        .pipe(plugins.livereload());
})

gulp.task('js', function () {
 
	gulp.src('dev/js/*.js')
	.pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
	.pipe(gulp.dest('dist/js/'))
	.pipe(plugins.livereload());
});

gulp.task('vendorJs', function () {
 
    gulp.src('dev/js/vendor/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.concat('vendor.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(plugins.livereload());
});

gulp.task('img', function () {
    gulp.src('dev/css/img/**/*.{jpg,png,gif}')
    	.pipe(plugins.plumber())
        .pipe(plugins.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/css/img/'));

    gulp.src('dev/images/**/*.{jpg,png,gif}')
        .pipe(plugins.plumber())
        .pipe(plugins.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images/'))
        .pipe(plugins.livereload());
});

gulp.task('copy', function () {
    gulp.src('dev/font/**/*.*')
        .pipe(gulp.dest('dist/font/'));

    gulp.src('dev/*.{php,html}')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
	plugins.livereload.listen();
    gulp.watch('dev/css/vendor/**/*.css', ['vendorCss']);
  	gulp.watch('dev/css/**/*.scss', ['scss']);
  	gulp.watch('dev/js/vendor/**/*.js', ['vendorJs']);
    gulp.watch('dev/js/*.js', ['js']);
    gulp.watch('dev/*.{php,html}', ['copy']);
 
});
 
gulp.task('dist', ['copy', 'vendorCss', 'scss', 'vendorJs', 'js', 'img']);