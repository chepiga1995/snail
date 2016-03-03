'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Tree = mongoose.model('Tree'),
	Question = mongoose.model('Question'),
	_ = require('lodash');


/**
 * Check has access
 */
exports.hasAccess = function(req, res, next) {
	var tree = req.tree;
	var user = req.user;
	if(tree.owner && user._id && tree.owner == user._id.toString()){
		return next();
	} else {
		return res.status(403).send({message: "Haven't access"});
	}
};



/**
 * Create a tree
 */
exports.create = function(req, res) {
	var tree = new Tree(req.body);
	tree.owner = req.user._id;

	tree.save(function(err) {
		if (err) return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		res.json(tree);
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
};

/**
 * Update a tree
 */
exports.update = function(req, res) {
	var tree = req.tree;

	tree = _.extend(tree, req.body);

	tree.save(function(err) {
		if (err) return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		res.json(tree);
	});
};

/**
 * Delete an tree
 */
exports.delete = function(req, res) {
	var tree = req.tree;

	tree.remove(function(err) {
		if (err) return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		res.json(tree);
	});
};

/**
 * Get the tree
 */
exports.get = function(req, res) {
	var tree = req.tree;
	Question.find({root: tree._id}).sort('-parent').select('selected name selected_options parent created').exec(function(err, questions) {
		if (err) return res.status(400).send({message: errorHandler.getErrorMessage(err)});
		tree.questions = questions;
		res.json(tree);

	});
};

/**
 * Tree middleware
 */
exports.populateTree = function(req, res, next) {
	var id = req.params.treeId;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({message: 'Tree is invalid'});

	Tree.findOne({_id: id}).exec(function(err, tree){
		if(err) return res.status(500).send({message: errorHandler.getErrorMessage(err)});
		if(!tree) return res.status(404).send({message: "Not fount"});
		req.tree = tree;
		next();
	});
};


