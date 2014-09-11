'use strict';

//Landingpages service used to communicate Landingpages REST endpoints
angular.module('landingpages').factory('Landingpages', ['$resource',
	function($resource) {
		return $resource('admin/landingpages/:landingpageId', { 
            landingpageId: '@_id'
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