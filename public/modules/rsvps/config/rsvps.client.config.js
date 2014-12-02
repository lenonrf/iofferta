'use strict';

// Configuring the Articles module
angular.module('rsvps').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Emails', 'emails', 'dropdown', '/emails(/create)?');
		//Menus.addSubMenuItem('topbar', 'emails', 'download', 'emails');
//		Menus.addSubMenuItem('topbar', 'emails', 'novo email', 'emails/create');
	}
]);