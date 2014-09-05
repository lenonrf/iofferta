'use strict';

// Configuring the Articles module
angular.module('landingpages').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Landingpage Items', 'landingpages', 'dropdown', 'admin/landingpages(/create)?');
		Menus.addSubMenuItem('topbar', 'landingpages', 'listar', 'admin/landingpages');
		Menus.addSubMenuItem('topbar', 'landingpages', 'novo', 'admin/landingpages/create');
	}
]);