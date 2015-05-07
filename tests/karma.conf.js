/* global module */

module.exports = function(config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            'bower_components/modernizr/modernizr.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'src/scripts/words.js',
            'src/scripts/{,*/}*.js',
            'tests/unit/{,*/}*.js'
        ],

        exclude: [],
        reporter: ['mocha'],
        hostname: 'localhost',
        port: 9999,
        browsers: ['PhantomJS'],
        singleRun: false,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true
    });
};