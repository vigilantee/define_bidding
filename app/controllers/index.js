module.exports = function (model) {
	var module = {};

	module.front = require('./front.js')(model);
	module.admin = require('./admin.js')(model);

	return module;
}