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
	isRoot: {
		type: Boolean,
		default: false
	},
	options: {
		name: {
			type: String,
			match: [/^[a-z\ !\?\.,\-]{1,30}$/i, 'Not valid tree name']
		}
	},
	question: {
		type: Schema.Types.ObjectId,
		ref: 'Question'
	},
	root: {
		type: Schema.Types.ObjectId,
		ref: 'Tree'
	},
	trees: [{
		type: Schema.Types.ObjectId,
		ref: 'Tree'
	}],
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date
	}
});

mongoose.model('Tree', TreeSchema);
