module.exports = function (model) {
	var module = {};

	module.front = require('./front')(model);
	module.uploadFile = require('./fileUpload')(model);
	
	return module;
}