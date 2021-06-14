module.exports = function (model) {
	var module = {};

	module.admin = require('./backend/admin')(model);
	module.farmer = require('./backend/farmer')(model);
	module.trader = require('./backend/trader')(model);
	module.broker = require('./backend/broker')(model);
	module.bidding = require('./backend/bidding')(model);
	
	return module;
}
