'use strict';


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Email Schema
 */
var RsvpSchema = new Schema({
	nome: {
		type: String,
		default: '',
		required: 'Insira o Rsvp',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Insira o Rsvp',
		trim: true
	},
	presenca: {
		type: String,
		default: '',
		required: 'Insira o Rsvp',
		trim: true
	},
	mensagem: {
		type: String,
		default: '',
		required: 'Insira o Rsvp',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Rsvp', RsvpSchema);