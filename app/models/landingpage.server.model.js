'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Landingpage Schema
 */
var LandingpageSchema = new Schema({
    
     categoria: {
        type: String,
        required: true,
        trim: true
      },
      nome: {
        type: String,
        required: true,
        trim: true
      },
      descricao: {
        type: String,
        required: true,
        trim: true
      },
     precoPara: {
        type: String,
        required: true,
        trim: true
      },
    precoDe: {
        type: String,
        required: true,
        trim: true
      },
    imagem: {
        type: String,
        required: true,
        trim: true
      },
    link: {
        type: String,
        required: true,
        trim: true
      },
    
    desconto: {
        type: String,
        required: true,
        trim: true
      },

      novidade: {
        type: Boolean,
        required: false,
        trim: true
      },

      top: {
        type: Boolean,
        required: false,
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

mongoose.model('Landingpage', LandingpageSchema);