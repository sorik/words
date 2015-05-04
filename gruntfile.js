/* global require, module */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig ({
    run: {
      app: {
        args: [
          'src/app.js'
        ],
        options: {
          wait: false
        }
      },
      localMongodb: {
        cmd: 'mongod',
        args: [
          '--dbpath=./data'
        ],
        options: {
          wait: false
        }
      },
      mongodb: {
        cmd: 'mongod',
        options: {
          wait: false
        }
      }
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bower:install']
      },
      jsTest: {
        files: ['tests/unit/{,**/}*.js'],
        tasks: ['jshint:test', 'karma:unit']
      }
    },
    bower: {
      install: {
        options: {
          copy: false,
          verbose: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      source: {
        src: ['gruntfile.js', './src/public/js/{,*/}*.js', './src/database/{,*/}*.js']
      },
      test: {
        options: {
          jshintrc: './tests/.jshintrc'
        },
        src: ['./tests/{,**/}*.js']
      }
    },
    clean: {
      dist: {
        src: ['dist/{,*/}*']
      }
    },
    karma: {
      unit: {
        configFile: 'tests/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('serve-local',
    ['bower:install', 'jshint:source', 'run:localMongodb','run:app', 'watch']);
  grunt.registerTask('serve',
    ['bower:install', 'jshint:source', 'run:mongodb','run:app', 'watch']);
  grunt.registerTask('test',
    ['jshint:test', 'karma:unit']);
  grunt.registerTask('build',
    ['jshint:source', 'bower:install', 'clean:dist']);
};
