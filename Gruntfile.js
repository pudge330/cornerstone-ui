var timer = require("grunt-timer");

var csModules = [
	'src/js/components/Breakpoint.js'
	,'src/js/components/Accordion.js'
	,'src/js/components/Close.js'
	,'src/js/components/Modal.js'
	,'src/js/components/Dropdown.js'
	,'src/js/components/PriorityPlus.js'
	,'src/js/components/Pagination.js'
	,'src/js/components/Tabs.js'
];
var csFullModules = [
	'src/js/wrap-start.js'
	,'src/js/deps/bglib.js'
	,'src/js/Cornerstone.js'
].concat(csModules).concat(['src/js/wrap-end.js']);
var csNoDepsModules = [
	'src/js/wrap-start.js'
	,'src/js/Cornerstone.js'
].concat(csModules).concat(['src/js/wrap-end.js']);
var csBareModules = [
	'src/js/Cornerstone.js'
].concat(csModules);

var htmlConcats = {
	htmlIndex: {
		src: ['src/html/parts/directory.html'],
		dest: 'examples/index.html'
	}
	,htmlGeneral: {
		src: ['src/html/parts/columns.html', 'src/html/parts/typography.html'],
		dest: 'examples/general.html'
	}
	,htmlForms: {
		src: ['src/html/parts/forms.html'],
		dest: 'examples/forms.html'
	}
	,htmlAlerts: {
		src: ['src/html/parts/alerts.html'],
		dest: 'examples/alerts.html'
	}
	,htmlBadges: {
		src: ['src/html/parts/badges.html'],
		dest: 'examples/badges.html'
	}
	,htmlTables: {
		src: ['src/html/parts/tables.html'],
		dest: 'examples/tables.html'
	}
	,htmlAccordion: {
		src: ['src/html/parts/accordion.html'],
		dest: 'examples/accordion.html'
	}
	,htmlDropdown: {
		src: ['src/html/parts/dropdown.html'],
		dest: 'examples/dropdown.html'
	}
	,htmlPriorityPlus: {
		src: ['src/html/parts/priority-plus.html'],
		dest: 'examples/priority-plus.html'
	}
	,htmlTabs: {
		src: ['src/html/parts/tabs.html'],
		dest: 'examples/tabs.html'
	}
	,htmlModals: {
		src: ['src/html/parts/modals.html'],
		dest: 'examples/modals.html'
	}
	,htmlPagination: {
		src: ['src/html/parts/pagination.html'],
		dest: 'examples/pagination.html'
	}
	,htmlToasts: {
		src: ['src/html/parts/toasts.html'],
		dest: 'examples/toasts.html'
	}
};

for (var key in htmlConcats) {
	if (htmlConcats.hasOwnProperty(key)) {
		if (key != 'htmlIndex') {
			htmlConcats[key].src.unshift('src/html/parts/examples-menu.html');	
		}
		htmlConcats[key].src.unshift('src/html/wrap-start.html');
		htmlConcats[key].src.push('src/html/wrap-end.html');
	}
}

module.exports = function(grunt) {
	timer.init(grunt, { deferLogs: true });
	//--configuration
	grunt.initConfig({
		sass: {
			dev: {
				options: {
					style: 'expanded'
					,sourcemap: 'none'
				}
				,files: {
					'dist/css/cornerstone.css': 'src/scss/cornerstone.scss'
				}
			}
			,prod: {
				options: {
					style: 'compressed'
					,sourcemap: 'none'
				}
				,files: {
					'dist/css/cornerstone.min.css': 'src/scss/cornerstone.scss'
				}
			}
		}
		,autoprefixer: {
			options: {
				browsers: ['last 3 versions']
			}
			,dev: {
				'dist/css/cornerstone.css': 'dist/css/cornerstone.css'
			}
			,prod: {
				'dist/css/cornerstone.min.css': 'dist/css/cornerstone.min.css'
			}
		}
		,concat: Object.assign({
			options: {
				separator: "\n",
			}
			,deps: {
				src: [
					'src/js/deps/bglib.js'
				]
				,dest: 'dist/js/cornerstone-deps.js',
			}
			,dist: {
				src: csFullModules,
				dest: 'dist/js/cornerstone.js',
			}
			,'dist-only': {
				src: csNoDepsModules,
				dest: 'dist/js/cornerstone-nodeps.js',
			}
			,'bare': {
				src: csBareModules
				,dest: 'dist/js/cornerstone-bare.js'
			}
		}, htmlConcats)
		,uglify: {
			options: {
				mangle: true
			},
			dist: {
				files: {
					'dist/js/cornerstone.min.js': ['dist/js/cornerstone.js']
					,'dist/js/cornerstone-deps.min.js': ['dist/js/cornerstone-deps.js']
					,'dist/js/cornerstone-nodeps.min.js': ['dist/js/cornerstone-nodeps.js']
					,'dist/js/cornerstone-bare.min.js': ['dist/js/cornerstone-bare.js']
				}
			}
		}
		,copy: {
			'sortablejs': {
				expand: true,
				cwd: 'node_modules/sortablejs',
				src: ['Sortable.js', 'Sortable.min.js'],
				dest: 'dist/js/'
			},
			'jquery': {
				expand: true,
				cwd: 'node_modules/jquery/dist',
				src: ['jquery.js', 'jquery.min.js'],
				dest: 'dist/js/'
			}
		}
		,jshint: {
			options: {
				laxcomma: true
			}
            ,all: [
            	'src/js/Cornerstone.js'
            	,'src/js/components/*.js'
            ]
        }
	});
	//--load
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//--tasks
	grunt.registerTask('default', [
		'sass'
		,'autoprefixer'
		,'concat'
		,'uglify'
		,'copy'
	]);
	grunt.registerTask('build:css', [
		'sass'
		,'autoprefixer'
	]);
	grunt.registerTask('build:css:dev', [
		'sass:dev'
		,'autoprefixer:dev'
	]);
	grunt.registerTask('build:css:prod', [
		'sass:prod'
		,'autoprefixer:prod'
	]);
	grunt.registerTask('build:js', [
		'concat'
		,'uglify'
		,'copy'
	]);
	grunt.registerTask('build:html', [
		'concat:html'
	]);
};