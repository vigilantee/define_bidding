module.exports = function (app, model, controller) {

    var middleware = require('../app/middleware/index')(model);
    
    // admin login
    app.get('/backend', controller.admin.index);
    
    // admin authenticate
    app.post('/backend/admin-authenticate', controller.admin.authenticate);
    
    // admin dashboard
    app.get('/backend/dashboard', controller.admin.dashboard);
    
    // admin enquiry form
    app.get('/backend/enquiry-form', controller.admin.enquiry);
    app.get('/backend/delete-enquiry/:id', controller.admin.enquiry_delete);
    
    // admin contact form
    app.get('/backend/contact-form', controller.admin.contact);
    app.get('/backend/delete-contact/:id', controller.admin.contact_delete);

    // admin farmer form
    app.get('/backend/farmer', controller.farmer.index);
    app.get('/farmer-status/:id/:status', controller.farmer.status);
    
    // admin trader form
    app.get('/backend/trader', controller.trader.index);
    
    // admin broker form
    app.get('/backend/broker', controller.broker.index);

    // admin add bidding
    app.get('/backend/add-bidding', controller.bidding.index);
    app.post('/backend/create-bidding', controller.bidding.create_bid);
    app.get('/backend/show-bidding', controller.bidding.show);
}
    