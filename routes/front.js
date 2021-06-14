module.exports = function (app, model, controller) {

    var middleware = require('../app/middleware')(model);

    app.get('/', controller.home.index);
    
    app.get('/about-us', controller.home.aboutus);
    
    app.get('/enquiry-form', controller.home.enquiryform);
    
    app.get('/contact', controller.home.contact);
    
    app.get('/terms-and-condition', controller.home.tandc);
    
    app.post('/submit-enquiry-form', controller.home.submitEnquiry);
    
    app.post('/submit-contact-form', controller.home.submitContact);
    
    app.get('/farmer-signup', controller.home.farmerSignup);
    
    app.post('/create-farmer', controller.home.farmerCreate);
    
    app.get('/logout', controller.home.logout);

    app.get('/login', middleware.front.sessionCheckerAuth, controller.home.signin);

    app.post('/authenticate', controller.home.authenticate);

}
    