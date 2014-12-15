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
		required: 'Insira o nome',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Insira o email',
		trim: true
	},
	presenca: {
		type: String,
		default: '',
		required: 'Insira o presenca',
		trim: true
	},
	mensagem: {
		type: String,
		default: '',
		required: false,
		trim: true
	}
});

mongoose.model('Rsvp', RsvpSchema);