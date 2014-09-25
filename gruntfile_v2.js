module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var globalConfigs = {};


    grunt.initConfig({

        globalConfigs : {
            
            src : 'public',
            tempDir : '.tmp',
            dist : '<%= globalConfigs.tempDir %>/dist',

        },


        watch: {

            js: {
                files: [
                    '<%= globalConfigs.src %>/**/*.js'
                ],
                tasks: ['default']
            }

        },



        clean: {
            build: {
                src: ["<%= globalConfigs.tempDir %>"]
            },

            afterBuild : {
               // src: ["<%= globalConfigs.src %>/validation-all.js"]
            }
        },




        uglify: {
          build: {

            options: {
                report: 'gzip',
                mangle : false
            },


            files: [{
                  expand: true,
                  src:  '<%= globalConfigs.dist %>/**/*.js',
                  ext: '.min.js'
                  //dest: '<%= globalConfigs.dist %>'
              }]
          }
        },


        compress: {
          main: {
            options: {
              mode: 'gzip'
            },
            expand: true,
            cwd: '<%= globalConfigs.dist %>',
            src: ['**/*'],
            dest: 'public/'
          }
        },



        concat: {
            
            app: {
                src: [
                    '<%= globalConfigs.src %>/config.js', 
                    '<%= globalConfigs.src %>/application.js', 
                    '<%= globalConfigs.src %>/modules/**/*.js'
                ],
                dest: '<%= globalConfigs.dist %>/app.js'
            },

            vendor: {
                src: [
                    '<%= globalConfigs.src %>/lib/**/*min.js'
                ],
                dest: '<%= globalConfigs.dist %>/vendor.js'
            }


        },

        copy: {
            app: {
                files: [
                    {
                        cwd: '<%= globalConfigs.src %>/public',
                        expand: true,
                        src: ['<%= globalConfigs.src %>/**/*.js'],
                        dest: '<%= globalConfigs.dist %>'
                    }
                ]

            }
        },


        jshint: {
            jshintrc: '.jshintrc',
            beforeconcat: ['<%= globalConfigs.src %>/**/*.js']
        },

        jasmine: {

            build: {
                src: '<%= globalConfigs.src %>/validation-all.js',
                options: {
                    specs: 'test/**/*Test.js'
                }
            }
        }

    });

    //grunt.registerTask('build', ['clean', 'concat', 'copy', 'uglify', 'usebanner' ]);
    grunt.registerTask('testOnly',  ['jasmine']);
    grunt.registerTask('codequalityOnly', ['jshint']);

    grunt.registerTask('default', ['build', 'testOnly', 'codequalityOnly', 'clean:afterBuild']);
    grunt.registerTask('serve', ['default', 'watch']);
    grunt.registerTask('test',  ['build', 'jasmine']);
    grunt.registerTask('codeQuality',  ['build', 'jshint']);


    grunt.registerTask('build', ['clean', 'concat:app', 'concat:vendor', 'uglify', 'compress']);//, 'copy', 'uglify' ]);

}
