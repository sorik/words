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
    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    concurrent: {
      dist: [
        'buildJs'
      ]
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/public/js/{,*/}*.js'],
        dest: 'dist/scripts/scripts.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! scripts <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/scripts/scripts.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    karma: {
      unit: {
        configFile: 'tests/karma.conf.js',
        singleRun: true
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('buildJs',
    ['useminPrepare', 'concat', 'uglify']);

  grunt.registerTask('serve-local',
    ['bower:install', 'jshint:source', 'run:localMongodb','run:app', 'watch']);
  grunt.registerTask('serve',
    ['bower:install', 'jshint:source', 'run:mongodb','run:app', 'watch']);
  grunt.registerTask('test',
    ['jshint:test', 'karma:unit']);
  grunt.registerTask('build',
    ['jshint:source', 'bower:install', 'clean:dist', 'useminPrepare', 'concurrent:dist']);
};
