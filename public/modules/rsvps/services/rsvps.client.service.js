'use strict';

//Rsvps service used to communicate Rsvps REST endpoints
angular.module('rsvps').factory('Rsvps', ['$resource',
	function($resource) {
		return $resource('rsvps/:rsvpId',
            {
                rsvpId: '@_id'
		    }, {
			update: {
				method: 'PUT'
			}
		});
	}
]);