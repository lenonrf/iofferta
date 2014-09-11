'use strict';

//Setting up route
angular.module('landingpages').config(['$stateProvider',
	function($stateProvider) {
		// Landingpages state routing
		$stateProvider.
		state('listLandingpages', {
			url: '/admin/landingpages',
			templateUrl: 'modules/landingpages/views/list-landingpages.client.view.html'
		}).
		state('createLandingpage', {
			url: '/admin/landingpages/create',
			templateUrl: 'modules/landingpages/views/create-landingpage.client.view.html'
		}).
		state('viewLandingpage', {
			url: '/admin/landingpages/:landingpageId',
			templateUrl: 'modules/landingpages/views/view-landingpage.client.view.html'
		}).
		state('editLandingpage', {
			url: '/admin/landingpages/:landingpageId/edit',
			templateUrl: 'modules/landingpages/views/edit-landingpage.client.view.html'
		});
	}
]);