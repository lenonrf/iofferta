'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Landingpage = mongoose.model('Landingpage'),
	_ = require('lodash');




exports.upload = function(file){
    console.log('chegooou chegoou ta na hor da alegriaaa');
};





/**
 * Create a Landingpage
 */
exports.create = function(req, res) {
	var landingpage = new Landingpage(req.body);
	landingpage.user = req.user;

	landingpage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(landingpage);
		}
	});
};

/**
 * Show the current Landingpage
 */
exports.read = function(req, res) {
	res.jsonp(req.landingpage);
};

/**
 * Update a Landingpage
 */
exports.update = function(req, res) {
	var landingpage = req.landingpage ;

	landingpage = _.extend(landingpage , req.body);

	landingpage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(landingpage);
		}
	});
};

/**
 * Delete an Landingpage
 */
exports.delete = function(req, res) {
	
    var landingpage = req.landingpage ;

	landingpage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(landingpage);
		}
	});
};

/**
 * List of Landingpages
 */
exports.list = function(req, res) { Landingpage.find().sort('-created').populate('user', 'displayName').exec(function(err, landingpages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(landingpages);
		}
	});
};

/**
 * Landingpage middleware
 */
exports.landingpageByID = function(req, res, next, id) { Landingpage.findById(id).populate('user', 'displayName').exec(function(err, landingpage) {
		if (err) return next(err);
		if (! landingpage) return next(new Error('Failed to load Landingpage ' + id));
		req.landingpage = landingpage ;
		next();
	});
};

/**
 * Landingpage authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.landingpage.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};