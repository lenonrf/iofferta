'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('sucesso', {
			url: '/sucesso',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('roupas', {
			url: '/roupas',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('eletronicos', {
			url: '/eletronicos',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('top', {
			url: '/top',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
        state('admin', {
			url: '/admin',
			templateUrl: 'modules/landingpages/views/list-landingpages.client.view.html'
		})
        ;
	}
]);