// Gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

// SASS processing
gulp.task('sass', function(){
	return gulp.src('src/stylesheets/scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('src/stylesheets/css/'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

// Watch for SASS, HTML, JS file changes
gulp.task('watch', ['browserSync', 'sass'], function (){
	gulp.watch('src/stylesheets/scss/**/*.scss', ['sass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

// Live reload via Browser Sync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		},
	})
});

// Concatenate JS and CSS files
gulp.task('useref', function(){
	return gulp.src('src/*.html')
	.pipe(useref())
    // Minifies JS and CSS files
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Optimize images
gulp.task('images', function(){
	return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
  // Cache images that already ran through imagemin
  .pipe(cache(imagemin({
  	interlaced: true
  })))
  .pipe(gulp.dest('dist/img'))
});

// Add fonts to dist
gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
})

// Add vendor prefixes to CSS files
gulp.task('prefix', function () {
	return gulp.src('src/stylesheets/css/**/*.css')
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('src/stylesheets/css'));
});

// Clean dist
gulp.task('clean:dist', function() {
	return del.sync('dist');
})

// Clean dist + run Gulp tasks
gulp.task('build', function (callback) {
	runSequence('clean:dist', 'prefix',
		['sass', 'useref', 'images', 'fonts'],
		callback
		)
})

// Compile + watch SASS, load browser
gulp.task('default', function (callback) {
	runSequence(['sass','browserSync', 'watch'], callback)
})
