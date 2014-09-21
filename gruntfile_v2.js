module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Unified Watch Object
    var watchFiles = {
        serverViews: ['app/views/**/*.*'], 
        serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
        clientViews: ['public/modules/**/views/**/*.html'],
        clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
        clientCSS: ['public/modules/**/*.css'],
        mochaTests: ['app/tests/**/*.js']
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            build: {
                src: ['dist', '.tmp']
            },

            trash: {
                src: ['dist', '.tmp']
            }
        },

        useminPrepare: {
            src: ['app/views/layout.server.view.html', 'dist/views/layout.server.view.html'],
            options: {
                dest: 'dist'
            }
        },

        usemin: {
            html: 'dist/views/layout.server.view.html',
            options: {
                assetsDirs: ['dist']
            }
        },

        cssmin: {
            combine: {
                files: {
                    'dist/css/output.css': [
                        'lib/bootstrap/dist/css/bootstrap.css',
                        'lib/bootstrap/dist/css/bootstrap-theme.css',
                        'modules/core/css/1024.css',
                        'modules/core/css/1280.css',
                        'modules/core/css/1440.css',
                        'modules/core/css/800.css',
                        'modules/core/css/base.css',
                        'modules/core/css/core.css',
                        'modules/users/css/users.css'
                    ]
                }
            }
        },

        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            dist: {
                files: {
                    src: [
                        'dist/app/resources/js/app.min.js',
                        'dist/app/resources/css/style.min.css'
                    ]
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        cwd: 'app/',
                        expand: true,
                        src: ['**/*.html', '**/*.json', '**/*.png'],
                        dest: 'dist'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.html'],
                    dest: 'dist'
                }]
            }
        },

        compress: {
            main: {
                options: {
                    archive: 'site.zip'
                },
                files: [{
                        src: ['**'],
                        dest: 'zip/',
                        cwd: 'dist/',
                        expand: true
                }]
            }
        },


        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },

        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: watchFiles.serverViews.concat(watchFiles.serverJS)
                }
            }
        },

        watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true,
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: watchFiles.clientCSS,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Load NPM tasks 
    require('load-grunt-tasks')(grunt);

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);



    grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {

        var init = require('./config/init')();
        var config = require('./config/config');

        grunt.config.set('applicationJavaScriptFiles', config.assets.js);
        grunt.config.set('applicationCSSFiles', config.assets.css);
    });

    grunt.registerTask('default', ['concurrent:default']);

    grunt.registerTask('dist', [
        'clean',
        'useminPrepare',
        'concat:generated',
        //'cssmin:generated',
        'uglify:generated',
        'rev',
        'copy:dist',
        'usemin',
        'htmlmin:dist',
        //'clean:trash'
    ]);
};