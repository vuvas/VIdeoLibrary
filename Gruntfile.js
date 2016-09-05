module.exports = function (grunt) {

    require('jit-grunt')(grunt,{
        useminPrepare: 'grunt-usemin'
    });
    require('time-grunt')(grunt);

    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project build settings
        config: {
            // Configurable paths
            src: 'src',
            dist: 'build',
            tmp: '.tmp'
        },
        copy: {
            build: {
                cwd: 'src',
                src: ['**'],
                dest: '<%= config.dist %>',
                expand: true
            },
            fonts: {
                cwd: 'bower_components',
                src: ['**/*.{eot,svg,ttf,woff,otf}'],
                dest: '<%= config.dist %>/fonts',
                expand: true,
                filter: 'isFile',
                flatten: true
            }
        },
        clean: {
            build: {
                src: ['<%= config.dist %>', '<%= config.tmp %>']
            },
            stylesheets: {
                src: ['<%= config.dist %>/**/*.css', '!<%= config.dist %>/application.min.css']
            },
            scripts: {
                src: ['<%= config.dist %>/**/*.js', '!<%= config.dist %>/application.min.js']
            },
            app: {
                src: ['<%= config.dist %>/app/**/*.js', '!<%= config.dist %>/app/**/*.html']
            },
            assets: {
                src: ['<%= config.dist %>/assets/']
            }
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'build',
                src: ['**/*.css'],
                dest: '<%= config.dist %>'
            }
        },
        ngAnnotate: {
            options: {
                remove: true,
                add: true,
                singleQuotes: true
            },
            build: {
                files: [{
                    expand: true,
                    src: ['<%= config.dist %>/app/**/*.js']
                }]
            }
        },
        useminPrepare: {
            html: '<%= config.src %>/index.html',
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    steps: {
                        js: ['concat', 'uglify'],
                        css: ['concat', 'cssmin']
                    },
                    post: {}
                }
            }
        },
        usemin: {
            html: ['<%= config.dist %>/index.html']
        },
        cssmin:{
            options: {
                report: 'min'
            }
        },
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
                report: 'min',
                mangle: false
            }
        },
        htmlmin: {
            build: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['app/**/*.html'],
                    dest: '<%= config.dist %>'
                }]
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.src %>/{,*/}*.html',
                    '<%= config.src %>/{,*/}*.css',
                    '<%= config.src %>/{,*/}*.js',
                    '<%= config.src %>/resources/{,*/}*',
                    '.tmp/{,*/}*.css',
                    '.tmp/{,*/}*.js'
                ]
            }
        },
        connect: {
            options: {
                port: 9191,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.dist %>'
                    ]
                }
            }
        }
    });

    grunt.registerTask(
        'cleanBuild',
        'remove temporary files from build',
        ['clean:assets', 'clean:app','clean:scripts', 'clean:stylesheets']
    );

    grunt.registerTask(
        'html',
        'Compiles the htmls.',
        ['useminPrepare', 'htmlmin']
    );
    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.',
        ['autoprefixer', 'cssmin']
    );
    grunt.registerTask(
        'scripts',
        'Compiles the JavaScript files.',
        ['ngAnnotate', 'uglify']
    );

    //Run as => grunt
    grunt.registerTask('default', [
        'clean:build', 'copy','autoprefixer','ngAnnotate', 'useminPrepare','concat' , 'uglify', 'cssmin',  'htmlmin','usemin', 'cleanBuild'
    ]);

    //Run as => grunt build
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        ['clean:build','copy','html','concat','stylesheets','scripts','usemin','cleanBuild']
    );

    //Run as => grunt serve
    grunt.registerTask(
        'serve',
        'Watches the project for changes, automatically builds them and runs a server.',
        ['build', 'connect', 'watch']
    );
};

