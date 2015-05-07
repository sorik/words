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
        src: ['gruntfile.js', './src/scripts/{,*/}*.js', './src/database/{,*/}*.js']
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
        src: ['.tmp', 'dist/{,*/}*']
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
        'buildJs',
        'buildCss'
      ]
    },
    copy: {
      preDist: {
        expand: true,
        cwd: 'src/',
        src: 'styles/{,*/}*.css',
        dest: '.tmp/'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['*.html', '{,**/}*.html'],
            dest: 'dist/'
          }
        ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: {
          'dist/scripts/scripts.js': ['src/scripts/{,*/}*.js'],
          'dist/scripts/vendor.js': ['bower_components/{,*/}*.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! scripts <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/scripts/',
            src: '*.js',
            dest: 'dist/scripts/'
          }
        ]
      }
    },
    autoprefixer: {
      options: {
        browers: ['last 1 versions']
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: '.tmp/styles/'
          }
        ]
      }
    },
    cssmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/styles/',
            src: '{,*/}*.css',
            dest: 'dist/styles/'
          }
        ]
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

  grunt.registerTask('buildCss',
    ['useminPrepare', 'autoprefixer', 'cssmin']);

  grunt.registerTask('serve-local',
    ['bower:install', 'jshint:source', 'run:localMongodb','run:app', 'watch']);
  grunt.registerTask('serve',
    ['bower:install', 'jshint:source', 'run:mongodb','run:app', 'watch']);
  grunt.registerTask('test',
    ['jshint:test', 'karma:unit']);
  grunt.registerTask('build',
    ['jshint:source', 'bower:install', 'clean:dist', 'copy:preDist', 'concurrent:dist', 'copy:dist']);
};
