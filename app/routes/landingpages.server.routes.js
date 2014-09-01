'use strict';

module.exports = function(app) {
	
    var users = require('../../app/controllers/users');
	var landingpages = require('../../app/controllers/landingpages');

	// Landingpages Routes
	app.route('/admin/landingpages')
		.get(landingpages.list)
		.post(users.requiresLogin, landingpages.create);

	app.route('/admin/landingpages/:landingpageId')
		.get(landingpages.read)
		.put(users.requiresLogin, landingpages.hasAuthorization, landingpages.update)
		.delete(users.requiresLogin, landingpages.hasAuthorization, landingpages.delete);

	// Finish by binding the Landingpage middleware
	app.param('landingpageId', landingpages.landingpageByID);
};