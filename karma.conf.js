module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        files: [
            'src/currencies-matchers.js',
            'test/*.js'
        ]
    });
};