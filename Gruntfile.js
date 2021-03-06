module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			dev: {
				src: 'css/style.css',
				dest: 'css/style.min.css'
			},
			production: {
				src: 'css/style.css',
				dest: 'build/css/style.min.css'
			}
		},
		clean: {
			build: ['build']
		},
		concat: {
			js: {
				src: ['js/source/jquery.js', 'js/source/bootstrap.js', 'js/source/plugins.js', 'js/source/scripts.js'],
				dest: 'js/scripts.js'
			},
			css: {
				src: ['css/source/bootstrap.css', 'css/source/front.css'],
				dest: 'css/style.css'
			}
		},
		imagemin: {
			production: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						cwd: 'img/',
						src: ['**/*.{png,jpg,gif}'],
						dest: 'build/img'
					}
				]
			}
		},
		jshint: {
			dev: [
				'js/source/scripts.js',
				'Gruntfile.js'
			]
		},
		less: {
			dev: {
				options: {
					concat: false
				},
				src:  'less/*.less',
				dest: 'css/source/front.css'
			}
		},
		preprocess: {
			dev: {
				options: {
					context: {
						ENV: 'dev',
						CHARLAS: '0',
					}
				},
				src: 'templates/index.html',
				dest: 'index.html'
			},
			production: {
				options: {
					context: {
						ENV: 'production',
						CHARLAS: '0',
						RELEASE_TIME: Math.round(Date.now() / 1000) // El hast para usar como cachebuster en los archivos CSS y JS.
					}
				},
				src: 'templates/index.html',
				dest: 'build/index.html'
			}
		},
		uglify: {
			dev: {
				files: {
					'js/scripts.min.js': ['js/scripts.js']
				}
			},
			production: {
				files: {
					'build/js/scripts.min.js': ['js/scripts.js']
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			all: {
				files: ['less/*.less', 'templates/*.html', 'js/source/*.js'],
				tasks: ['less', 'concat', 'cssmin:dev', 'uglify:dev', 'preprocess:dev'],
			},
			less: {
				files: ['less/*.less'],
				tasks: ['less', 'concat', 'cssmin:dev'],
			},
		},
	});


	grunt.loadNpmTasks('assemble-less');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-preprocess');

	grunt.registerTask('default', ['less', 'concat', 'cssmin:dev', 'jshint:dev', 'uglify:dev', 'preprocess:dev', 'watch:all']);
	grunt.registerTask('summon', ['clean:build', 'less', 'concat', 'cssmin:production', 'uglify:production', 'preprocess:production', 'imagemin:production']);

};