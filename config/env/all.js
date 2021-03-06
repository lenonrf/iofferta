'use strict';

module.exports = {
	
	app: {
		title: 'iOfferta',
		description: 'Encontramos os melhores descontos!',
		keywords: 'iofferta'
	},
	
	port: process.env.PORT || 80,
	templateEngine: 'swig',
	sessionSecret: 'iofferta',
	sessionCollection: 'sessions',
	
	assets: {
	
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
			],
			js: [
				'public/lib/ng-file-upload/angular-file-upload-shim.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',                
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/ng-csv/build/ng-csv.js',
                'public/lib/ng-file-upload/angular-file-upload.js',
                'public/lib/ui-utils/ui-utils.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};