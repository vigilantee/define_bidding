module.exports = function (app, model, controllers) {
	
	require('./front.js')(app, model, controllers.front);
	
	require('./admin.js')(app, model, controllers.admin);
}	