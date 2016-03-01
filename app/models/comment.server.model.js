'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	likes: {
		type: Number,
		default: 0
	},
	dislikes: {
		type: Number,
		default: 0
	},
	title: {
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,30}$/i, 'Not valid comment title']
	},
	description: {
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,500}$/i, 'Not valid comment description']
	},
	reference: [{
		type: Schema.Types.ObjectId,
		ref: 'Advice'
	}],
	owner: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Comment', CommentSchema);
