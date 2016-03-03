'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tree Schema
 */
var TreeSchema = new Schema({
	name: {
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,30}$/i, 'Not valid tree name'],
		required: 'Please fill in a tree name'
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Tree'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Tree', TreeSchema);
