module.exports = function(grunt) {

    // Task Configuration:
    grunt.initConfig({

        // Make SASS into CSS and move it to WWW
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '../www/web/styling/main.css': 'assets/scss/main.scss',
                }
            }
        },

        // Give JavaScript Cross-Browser-Compatibility
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    '../www/web/js/scripts.js': 'assets/js/**/*.js'
                }
            }
        },

        // Make basic Copies out of node_modules to WWW
        copy: {
            dist: {
                files: [
                    // PHP Unminified
                    {src: ['assets/php/index.php'], dest: '../www/web/php/index.php'},
                    // Bootstrap
                    {src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: '../www/web/styling/vendor/bootstrap.min.css'},
                    {src: ['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'], dest: '../www/web/js/vendor/bootstrap.bundle.min.js'},
                    // jQuery
                    {src: ['node_modules/jquery/dist/jquery.min.js'], dest: '../www/web/js/vendor/jquery.min.js'},
                    // Parsley
                    {src: ['node_modules/parsleyjs/dist/parsley.min.js'], dest: '../www/web/js/vendor/parsley.min.js'},
                    // Fontawesome
                    {src: ['node_modules/@fortawesome/fontawesome-free/js/brands.min.js'], dest: '../www/web/js/vendor/brands.min.js'},
                    {src: ['node_modules/@fortawesome/fontawesome-free/js/solid.min.js'], dest: '../www/web/js/vendor/solid.min.js'},
                    {src: ['node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js'], dest: '../www/web/js/vendor/fontawesome.min.js'},
                    {src: ['node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css'], dest: '../www/web/styling/vendor/fontawesome.min.css'},
                ],
            },
        },

        // HTML Minification
        htmlmin: {
            disthtml: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                  expand: true,
                  cwd: 'assets/markup/',
                  src: ['**/*.html'],
                  dest: '../www/web/'
                }]
            },
        },

        // CSS Minification
        cssmin: {
            options: {
                mergeIntoShorthands: false,
            },
            target: {
                files: {
                    '../www/web/styling/main.min.css': '../www/web/styling/main.css'
                }
            }
        },

        // Other Minifications
        uglify: {
            js: {
                src: '../www/web/js/scripts.js',
                dest: '../www/web/js/scripts.min.js'
            },
        },

        watch: {
            // Uglify all JavaScripts after every Change
            js: {
                files: ['assets/js/**/*.js'],
                tasks: ['babel:dist', 'uglify:js'],
                options: {
                    debounceDelay: 1000,
                    spawn: false,
                    watchTask: true
                },
            },
            // Uglify all SCSS after every Change
            scss: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass:dist', 'cssmin'],
                options: {
                    debounceDelay: 1000,
                    spawn: false,
                    watchTask: true
                },
            },
            // Uglify all HTML after every Change
            html: {
                files: ['assets/markup/**/*.html'],
                tasks: ['htmlmin:disthtml'],
                options: {
                    debounceDelay: 1000,
                    spawn: false,
                    watchTask: true
                },
            },
        },
    });

    // Load plugins to provide tasks:
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-babel');

    // Dist
    grunt.registerTask('dist', ["babel", "sass", "uglify", "htmlmin", "cssmin", "copy"]);
    // Watch
    grunt.registerTask("w", ["watch"]);
};