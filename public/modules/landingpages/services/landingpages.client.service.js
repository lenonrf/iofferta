'use strict';

//Landingpages service used to communicate Landingpages REST endpoints
angular.module('landingpages').factory('Landingpages', ['$resource',
	function($resource) {
		return $resource('admin/landingpages/:landingpageId/:novidade', { 
            landingpageId: '@_id',
            novidade: '@novidade'
		}, {
			update: {
				method: 'PUT'
			},
            upload :{
                method: 'POST'
            }
		});
	}
]);