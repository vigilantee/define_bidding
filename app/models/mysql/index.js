module.exports = function (Sequelize, Schema) {
	var module = {};

	module.Admin 	= require('./admin')(Sequelize, Schema);
	module.Broker 	= require('./broker')(Sequelize, Schema);
	module.Farmer 	= require('./farmer')(Sequelize, Schema);
	module.Trader 	= require('./trader')(Sequelize, Schema);
	module.EnquiryForm 	= require('./enquiryform')(Sequelize, Schema);
	module.ContactForm 	= require('./contactform')(Sequelize, Schema);
	module.Bidding 	= require('./bidding')(Sequelize, Schema);

	return module;
}