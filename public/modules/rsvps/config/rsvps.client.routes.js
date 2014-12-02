'use strict';

//Setting up route
angular.module('rsvps').config(['$stateProvider',
	function($stateProvider) {
		// Emails state routing
		$stateProvider.
		state('listRsvps', {
			url: '/rsvps',
			templateUrl: 'modules/rsvps/views/list-rsvps.client.view.html'
		}).
		state('createRsvp', {
			url: '/rsvps/create',
			templateUrl: 'modules/rsvps/views/create-rsvp.client.view.html'
		}).
		state('viewRsvp', {
			url: '/rsvps/:rsvpId',
			templateUrl: 'modules/rsvps/views/view-rsvp.client.view.html'
		}).
		state('editRsvp', {
			url: '/rsvps/:rsvpId/edit',
			templateUrl: 'modules/rsvps/views/edit-rsvp.client.view.html'
		});
	}
]);