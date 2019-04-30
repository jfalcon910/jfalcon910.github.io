const gulp = require('gulp');
const changed = require('gulp-changed');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');


function onError (error) {
    gutil.log(error);
    this.emit('end');
}

gulp.task('sass', () => {
	return gulp.src([
		'node_modules/materialize-css/sass/materialize.scss',
		'node_modules/node-normalize-scss/normalize.scss',
		//'node_modules/bootstrap/scss/bootstrap.scss',
		'src/scss/*.scss'
	])
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.stream());
});

gulp.task('pug', () => {
	return gulp.src([
		'src/pug/*.pug'
	])
	.pipe(pug())
	.pipe(gulp.dest('src/'))
	.pipe(browserSync.stream());

});


gulp.task('js', () => {
	return gulp.src([
		//'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',  
		'node_modules/materialize-css/dist/js/materialize.min.js'
		//'node_modules/popper.js/dist/umd/popper.min.js'
	])
	.pipe(gulp.dest('src/js'))
	.pipe(browserSync.stream());
});

gulp.task('serve', ['sass','pug'], () => {
	browserSync.init({
		server:'./src'
	});

	gulp.watch([
		'src/scss/*.scss',
		'src/pug/*.pug'
	],['sass', 'pug']);

	//gulp.watch('src/index.html').on('change', browserSync.reload);
});

gulp.task('font-awesome', () => {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('src/css'));
});

gulp.task('fonts', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('src/fonts'));
})

gulp.task('default', ['js', 'serve', 'font-awesome', 'fonts']);