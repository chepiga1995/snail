'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Advice Schema
 */
var AdviceSchema = new Schema({
	difficulty: {
		type: String,
		enum: ['low', 'medium', 'high', 'advanced']
	},
	estimation: {
		type: Number,
		min: 1
	},
	title: {
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,30}$/i, 'Not valid advice title']
	},
	description: {
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,500}$/i, 'Not valid advice description']
	},
	price: {
		type: String,
		enum: ['free', 'paid']
	},
	likes: {
		type: Number,
		default: 0
	},
	selected: {
		type: Boolean,
		default: false
	},
	owner: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date
	}
});

mongoose.model('Advice', AdviceSchema);
