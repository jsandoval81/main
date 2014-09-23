
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //=====================================
        //== Run blocking tasks concurrently ==
        //=====================================
        concurrent: {
            //== Automate the dev environment
            dev: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['watch', 'nodemon:dev']
            }
        },

        //======================
        //== Node app control ==
        //======================
        nodemon: {
            //== Monitor the dev Node app for Node file updates
            dev: {
                script: './bin/www',
                options: {
                    ignore: [ '.git/**',
                              'node_modules/**',
                              'public/**',
                              'test/**',
                              'Gruntfile.js',
                              'npm_debug.log',
                              'README.md'
                            ]
                }
            }
        },

        //=================
        //== Watch files ==
        //=================
        watch: {
            //== Rebuild the CSS min file after CSS edits
            css: {
                files: ['public/stylesheets/*.css', '!public/stylesheets/application.css', '!public/stylesheets/application.min.css'],
                tasks: ['concat:css', 'cssmin'],
                options: {
                    spawn: true
                }
            },
            //== Rebuild the JS min file after JS edits
            js: {
                files: ['public/javascripts/*.js', '!public/javascripts/application.js', '!public/javascripts/application.min.js'],
                tasks: ['concat:js', 'uglify'],
                options: {
                    spawn: true
                }
            },
            livereload: {
                options: { livereload: true },
                files: ['public/main/**/*', 'views/*.ejs', 'views/*.html']
            }
        },

        //========================
        //== File concatination ==
        //========================
        concat: {
            //== Concat the CSS files
            css: {
                src: [
                    'public/stylesheets/style.css',
                    'public/stylesheets/style-mq.css'
                ],
                dest: 'public/stylesheets/application.css'
            },
            //== Concat the JS files
            js: {
                src: [
                    'public/javascripts/jquery-1.8.3.min.js',
                    'public/javascripts/masonry.min.js',
                    'public/javascripts/TweenMax.min.js',
                    'public/javascripts/script.js'
                ],
                dest: 'public/javascripts/application.js'
            }
        },

        //======================
        //== CSS minification ==
        //======================
        cssmin: {
            minify: {
                expand: true,
                cwd:   'public/stylesheets/',
                src:  ['application.css'],
                dest:  'public/main/stylesheets/',
                ext:   '.min.css'
            }
        },

        //=============================
        //== Javascript minification ==
        //=============================
        uglify: {
            build: {
                src:  'public/javascripts/application.js',
                dest: 'public/main/javascripts/application.min.js'
            }
        },

        //=========================================
        //== Clear the Production-like directory ==
        //=========================================
        clean: {
            options: { force: true },
            prod:    ['../../production/main']
        },

        //====================================================
        //== Copy server files to Production-like directory ==
        //====================================================
        copy: {
            //== Node server files
            bin: {
                expand: true,
                src:    'bin/**',
                dest:   '../../production/main/'
            },
            routes: {
                expand: true,
                src:    'routes/**',
                dest:   '../../production/main/'
            },
            views: {
                expand: true,
                src:    'views/**',
                dest:   '../../production/main/'
            },
            appjs: {
                expand: true,
                src:    'app.js',
                dest:   '../../production/main/'
            },
            pkgjson: {
                expand: true,
                src:    'package.json',
                dest:   '../../production/main/'
            },
            //== Asset files
            images: {
                expand: true,
                cwd:    'public/main/images/',
                src:    '**',
                dest:   '../../production/main/public/main/images/'
            },
            applicationcss: {
                expand: true,
                cwd:    'public/main/stylesheets/',
                src:    'application.min.css',
                dest:   '../../production/main/public/main/stylesheets/'
            },
            applicationjs: {
                expand: true,
                cwd:    'public/main/javascripts/',
                src:    'application.min.js',
                dest:   '../../production/main/public/main/javascripts/'
            },
            fonts: {
                expand: true,
                cwd:    'public/main/fonts/',
                src:    '**',
                dest:   '../../production/main/public/main/fonts/'
            }
        },
 
        //====================
        //== Shell commands ==
        //====================
        shell: {
            //== Run NPM install in Production-like directory (Evening)
            prodNpmInstalleve: {
                command: [
                    'cd C:/Users/Sandoval/Desktop/Development/John/Javascript/production/main',
                    'npm cache clean',
                    'npm install --production'
                ].join('&&')
            },
            //== Run NPM install in Production-like directory (Daylight)
            prodNpmInstallday: {
                command: [
                    'cd C:/Users/jsandoval/Desktop/Development/Javascript/production/main',
                    'npm cache clean',
                    'npm install --production'
                ].join('&&')
            }
        }

    });

    //=============================
    //== Load Grunt NPM packages ==
    //=============================
    require('load-grunt-tasks')(grunt);

    //====================
    //== Register tasks ==
    //====================
    //== Default task (blank for now)
    grunt.registerTask('default', ['']);
    //== Dev task (Automate the dev environment)
    grunt.registerTask('dev', ['concurrent:dev']);
    //== Production build (Create fresh production-like build)
    grunt.registerTask('build-evening',  ['concat', 'cssmin', 'uglify', 'clean', 'copy', 'shell:prodNpmInstalleve']);
    grunt.registerTask('build-daylight', ['concat', 'cssmin', 'uglify', 'clean', 'copy', 'shell:prodNpmInstallday']);
};