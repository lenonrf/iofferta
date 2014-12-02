'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var rsvps = require('../../app/controllers/rsvps');

	// Emails Routes
	app.route('/rsvps')
		.get(rsvps.list)
		.post(rsvps.create);


	app.route('/rsvps/:rsvpId')
		.get(rsvps.read)
		.put(users.requiresLogin, rsvps.hasAuthorization, rsvps.update)
		.delete(users.requiresLogin, rsvps.hasAuthorization, rsvps.delete);

	// Finish by binding the Email middleware
	app.param('rsvpId', rsvps.rsvpByID);
};
