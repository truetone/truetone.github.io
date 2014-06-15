/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/main.min.css' : 'css/sass/main.scss'
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            base: {
                files: {
                    '<%= pkg.jsMinDest %>base.min.js': [
                            '<%= pkg.libDir %>handlebars-v1.3.0.js',
                    ]
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                //unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    Handlebars: true,
                    moment: true,
                    $: true,
                    console: true,
                    google: true,
                    alert: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            weather: {
                src: 'js/src/weather.js'
            }
        },
        watch: {
            gruntfile: {
                files: [
                    '<%= jshint.gruntfile.src %>',
                    'css/sass/*.scss',
                ],
                //tasks: ['jshint:gruntfile','jshint:weather', 'sass', 'concat']
                tasks: ['jshint:gruntfile','sass',]
            },
            weather: {
                files: [
                    'js/src/weather.js',
                ],
                tasks: ['jshint:weather',]
            }
        },
        concat: {
            dist: {
                src: [
                    '<%= pkg.libDir %>moment.min.js',
                    '<%= pkg.libDir %>picker.js',
                    '<%= pkg.libDir %>picker.date.js',
                ],
                dest: '<%= pkg.jsMinDest %>lib.min.js'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task.
    grunt.registerTask('default', ['jshint', 'uglify', 'watch', 'concat']);

};
