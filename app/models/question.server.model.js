'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	selected: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,30}$/i, 'Not valid question name']
	},
	description: {
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,500}$/i, 'Not valid question description']
	},
	tags: [{
		type: String,
		match: [/^[a-z\ !\?\.,\-]{1,20}$/i, 'Not valid tag name']
	}],
	selected_options: {
		name: {
			type: String,
			match: [/^[a-z\ !\?\.,\-]{1,30}$/i, 'Not valid question name']
		},
		pattern: {
			type: String,
			enum: ['meting', 'course', 'book', 'video', 'other']
		},
		advice: {
			type: Schema.Types.ObjectId,
			ref: 'Advice'
		}
	},
	parent: {
		type: Schema.Types.ObjectId
	},
	root: {
		type: Schema.Types.ObjectId,
		ref: 'Tree'
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	advices: [{
		type: Schema.Types.ObjectId,
		ref: 'Advice'
	}],
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date
	}
});

mongoose.model('Question', QuestionSchema);
