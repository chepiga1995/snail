'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Tree = mongoose.model('Tree');

/**
 * Globals
 */
var user, tree;

/**
 * Unit tests
 */
describe('Tree Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			tree = new Tree({
				name: 'My tree',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return tree.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should show an error when try to save tree with not valid name', function(done) {
			tree.name = '+8878.,%$#@';

			return tree.save(function(err){
				err.should.be.ok.and.be.an.Object.and.have.ownProperty('errors').have.ownProperty('name');
				done();
			})
		});
	});

	afterEach(function(done) {
		Tree.remove().exec(function() {
			User.remove().exec(done);
		});
	});
});
