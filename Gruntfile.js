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
				src: ['js/source/bootstrap.js', 'js/source/scripts.js'],
				dest: 'js/scripts.js'
			},
			css: {
				src: ['css/source/bootstrap.css', 'css/source/front.css'],
				dest: 'css/style.css'
			}
		},
		/*connect: {
			server: {
				options: {
					port: 9001,
					base: '',
					livereload: true,
					keepalive: true
				}
			}
		},*/
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
						ENV: 'dev'
					}
				},
				src: 'templates/index.html',
				dest: 'index.html'
			},
			production: {
				options: {
					context: {
						ENV: 'production',
						RELEASE_TIME: Math.round(Date.now() / 1000)
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
			less: {
				files: ['less/*.less'],
				tasks: ['less', 'concat', 'cssmin'],
			},
		},
	});

	grunt.loadNpmTasks('assemble-less');
	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-preprocess');


	grunt.registerTask('default', ['less', 'concat', 'cssmin:dev', 'jshint:dev', 'uglify:dev', 'preprocess:dev', 'watch']);
	grunt.registerTask('summon', ['clean:build', 'less', 'concat', 'cssmin:production', 'uglify:production', 'preprocess:production']);

};