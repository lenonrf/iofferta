module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var globalConfigs = {};
    
    var watchFiles = {
        serverViews: ['app/views/**/*.*'], 
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
        clientViews: ['public/modules/**/views/**/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css'],
        mochaTests: ['app/tests/**/*.js']
    };

    grunt.initConfig({

        globalConfigs : {
            
            src : 'public',
            dist : '<%= globalConfigs.src %>/dist'

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
                src: ["<%= globalConfigs.dist %>"]
            },

            afterBuild : {}
        },


        cssmin: {
            combine: {
                files: {
                    '<%= globalConfigs.src %>/dist/styles.min.css': [
                        '<%= globalConfigs.src %>/lib/bootstrap/dist/css/bootstrap.css', 
                        '<%= globalConfigs.src %>/lib/bootstrap/dist/css/bootstrap-theme.css',
                        '<%= globalConfigs.src %>/modules/core/css/1024.css',
                        '<%= globalConfigs.src %>/modules/core/css/1280.css',
                        '<%= globalConfigs.src %>/modules/core/css/1440.css',
                        '<%= globalConfigs.src %>/modules/core/css/800.css',
                        '<%= globalConfigs.src %>/modules/core/css/base.css',
                        '<%= globalConfigs.src %>/modules/core/css/core.css',
                        '<%= globalConfigs.src %>/modules/users/css/users.css'
                    ]
                }
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
                src: ['**/*.min.js'],
                dest: '<%= globalConfigs.dist %>/compress',
                ext: '.gzip'
            }
        },



        concat: {
            
            app: {
                src: [
                    '<%= globalConfigs.src %>/config.js', 
                    '<%= globalConfigs.src %>/application.js', 
                    '<%= globalConfigs.src %>/modules/core/core.client.module.js',
                    '<%= globalConfigs.src %>/modules/emails/emails.client.module.js',
                    '<%= globalConfigs.src %>/modules/landingpages/landingpages.client.module.js',
                    '<%= globalConfigs.src %>/modules/users/users.client.module.js',
                    '<%= globalConfigs.src %>/modules/core/config/core.client.routes.js',
                    '<%= globalConfigs.src %>/modules/core/controllers/header.client.controller.js',
                    '<%= globalConfigs.src %>/modules/core/controllers/home.client.controller.js',
                    '<%= globalConfigs.src %>/modules/core/services/menus.client.service.js',
                    '<%= globalConfigs.src %>/modules/emails/config/emails.client.config.js',
                    '<%= globalConfigs.src %>/modules/emails/config/emails.client.routes.js',
                    '<%= globalConfigs.src %>/modules/emails/controllers/emails.client.controller.js',
                    '<%= globalConfigs.src %>/modules/emails/services/emails.client.service.js',
                    '<%= globalConfigs.src %>/modules/landingpages/config/landingpages.client.config.js',
                    '<%= globalConfigs.src %>/modules/landingpages/config/landingpages.client.routes.js',
                    '<%= globalConfigs.src %>/modules/landingpages/controllers/landingpages.client.controller.js',
                    '<%= globalConfigs.src %>/modules/landingpages/services/landingpages.client.service.js',
                    '<%= globalConfigs.src %>/modules/users/config/users.client.config.js',
                    '<%= globalConfigs.src %>/modules/users/config/users.client.routes.js',
                    '<%= globalConfigs.src %>/modules/users/controllers/authentication.client.controller.js',
                    '<%= globalConfigs.src %>/modules/users/controllers/password.client.controller.js',
                    '<%= globalConfigs.src %>/modules/users/controllers/settings.client.controller.js',
                    '<%= globalConfigs.src %>/modules/users/services/authentication.client.service.js',
                    '<%= globalConfigs.src %>/modules/users/services/users.client.service.js'
                ],
                dest: '<%= globalConfigs.dist %>/app.js'
            },


            vendor: {
                src: [
                    //'<%= globalConfigs.src %>/lib/angular/angular.min.js',
                    //'<%= globalConfigs.src %>/lib/angular-resource/angular-resource.min.js',
                    //'<%= globalConfigs.src %>/lib/angular-animate/angular-animate.min.js',
                    //'<%= globalConfigs.src %>/lib/angular-ui-router/release/angular-ui-router.min.js',
                    //'<%= globalConfigs.src %>/lib/angular-ui-utils/ui-utils.min.js',
                    //'<%= globalConfigs.src %>/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                    //'<%= globalConfigs.src %>/lib/angular-sanitize/angular-sanitize.js',
                    '<%= globalConfigs.src %>/lib/ng-csv/build/ng-csv.js',
                    '<%= globalConfigs.src %>/lib/ng-file-upload/angular-file-upload.js',
                    '<%= globalConfigs.src %>/lib/ui-utils/ui-utils.js',
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
        },


        /**
         * NODE SERVER
         */

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    //nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    //'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },

        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        }

    });


    // A Task for loading the configuration object
    grunt.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
        
        var init = require('./config/init')();
        var config = require('./config/config');
        
        grunt.config.set('applicationJavaScriptVendors', config.assets.lib.js);
        grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        grunt.config.set('applicationCSSFiles', config.assets.css);
    });

    //grunt.registerTask('build', ['clean', 'concat', 'copy', 'uglify', 'usebanner' ]);
    grunt.registerTask('testOnly',  ['jasmine']);
    grunt.registerTask('codequalityOnly', ['jshint']);

    grunt.registerTask('default', ['build', 'concurrent:default']);
    grunt.registerTask('serve', ['default', 'watchFiles']);
    grunt.registerTask('test',  ['build', 'jasmine']);
    grunt.registerTask('codeQuality',  ['build', 'jshint']);


    grunt.registerTask('build', ['clean', 'loadConfig', 'concat:app', 'concat:vendor', 'cssmin', 'uglify']);//, 'compress']);

}