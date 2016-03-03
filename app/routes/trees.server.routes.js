'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	trees = require('../../app/controllers/trees.server.controller');

module.exports = function(app) {
	// Tree Routes
	app.route('/api/v1/trees/:treeId')
		.all(trees.populateTree)
		.get(trees.get)
		.post(users.requiresLogin, trees.hasAccess, trees.update)
		.delete(users.requiresLogin, trees.hasAccess, trees.delete);
	app.route('/api/v1/trees')
		.put(users.requiresLogin, trees.create);
};
