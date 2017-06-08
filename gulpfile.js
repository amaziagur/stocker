const gulp = require('gulp');
const del = require("del");
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const tsE2E = ts.createProject('e2e/tsconfig.json');

gulp.task('clean', (cb) => {
    return del(["dist", "e2e/tmp"], cb);
});

gulp.task('scripts', () => {
    const tsResult = tsProject.src().pipe(tsProject());
return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('e2e', () => {
    const tsResult = tsE2E.src().pipe(tsE2E());
return tsResult.js.pipe(gulp.dest('e2e/tmp'));
});

gulp.task('app_resources', () => {
    gulp.src(['src/public/**/*', '!**/*.ts'], {base: './src'}).pipe(gulp.dest('dist'));
});

gulp.task('copy_config', () => {
    gulp.src(['config/**/*'], {base: './'}).pipe(gulp.dest('dist'));
});

gulp.task('copy_bin', () => {
    gulp.src(['bin/**/*'], {base: './'}).pipe(gulp.dest('dist'));
});

gulp.task('libs', () => {
    gulp.src([
    'zone.js/dist/zone.js',
    'core-js/client/**',
    'systemjs/dist/system.src.js'
], { cwd: 'node_modules/**'}).pipe(gulp.dest('dist/public/libs'));
});

gulp.task('watch', ['scripts', 'app_resources', 'e2e'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
gulp.watch('src/public/**/*', ['app_resources']);
gulp.watch('e2e/**/*.ts', ['e2e']);
gulp.watch('config/*', ['copy_config']);
});

gulp.task('build', ['libs', 'scripts', 'app_resources', 'copy_config', 'copy_bin', 'e2e']);

gulp.task('default', ['watch']);
