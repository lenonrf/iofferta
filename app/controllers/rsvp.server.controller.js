'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Rsvp = mongoose.model('Rsvp'),
	_ = require('lodash');

/**
 * Create a Email
 */
exports.create = function(req, res) {
	var rsvp = new Rsvp(req.body);
	//rsvp.user = req.user;

	rsvp.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rsvp);
		}
	});
};

/**
 * Show the current Email
 */
exports.read = function(req, res) {
	res.jsonp(req.rsvp);
};

/**
 * Update a Email
 */
exports.update = function(req, res) {
	var rsvp = req.rsvp ;

	rsvp = _.extend(rsvp , req.body);

	rsvp.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rsvp);
		}
	});
};

/**
 * Delete an Email
 */
exports.delete = function(req, res) {
	var rsvp = req.rsvp ;

	rsvp.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rsvp);
		}
	});
};

/**
 * List of Emails
 */
exports.list = function(req, res) {


    Rsvp.find().sort('-created').populate('user', 'displayName').exec(function(err, emails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rsvp);
		}
	});
};



exports.listLimit = function(req, res, limitArg) {

    console.log(limitArg);

    var limit = (!limitArg) ? limitArg : 0;

    Rsvp.find().sort('-created').populate('user', 'displayName').limit(limitArg).exec(function(err, rsvp) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rsvp);
		}
	});
};






/**
 * Email middleware
 */
exports.rsvpByID = function(req, res, next, id) { Rsvp.findById(id).populate('user', 'displayName').exec(function(err, rsvp) {
		if (err) return next(err);
		if (! rsvp) return next(new Error('Failed to load rsvp ' + id));
		req.rsvp = rsvp ;
		next();
	});
};

/**
 * Email authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rsvp.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};