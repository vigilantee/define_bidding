module.exports = function (model) {
	var module = {};

	module.home = require('./front/home')(model);
	
	return module;
}
