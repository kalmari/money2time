var gulp = require('gulp');
var karma = require('karma').server;

gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('default', ['tdd']);