var dateformat = require('dateformat');
var currentDate = new Date();
module.exports = function (model) {

	var module = {};

	module.index = async function (req, res) {
		try {
			res.render('backend/login',{
				config: process.env,
				alias: 'Admin-Login',	
				action: '/backend/admin-authenticate',
				error: 	req.flash('error'),
				success: req.flash('success'),
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};
	 
    module.dashboard = async function (req, res) {
		try {
			res.render('backend/dashboard',{
				config: process.env,
				alias: 'Dashboard',	
				error: 	req.flash('error'),
				success: req.flash('success'),
				currYear: dateformat("yyyy"),
				css: [],
				script: [],
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};

	module.contact = async function (req, res) {
		var query = {};
		var contact_list =  await model.ContactForm.findAll({ where: query, order: [['id', 'DESC']],  raw: true });
		try {
			res.render('backend/contact',{
				config: process.env,
				alias: 'Contact',	
				error: 	req.flash('error'),
				success: req.flash('success'),
				currYear: dateformat("yyyy"),
				css: ['bundles/datatables/datatables.min.css','bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css'],
				script: [
							"bundles/datatables/datatables.min.js",
							"bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js",
							"bundles/datatables/export-tables/dataTables.buttons.min.js",
							"bundles/datatables/export-tables/buttons.flash.min.js",
							"bundles/datatables/export-tables/jszip.min.js",
							"bundles/datatables/export-tables/pdfmake.min.js",
							"bundles/datatables/export-tables/vfs_fonts.js",
							"bundles/datatables/export-tables/buttons.print.min.js",
							"js/page/datatables.js"
						],
				contact_list: contact_list,
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};
	
	module.contact_delete = async function (req, res) {
		var Id = req.params.id;
		if (Id != "" && Id != 0) {
			try {
				var contactData = await model.ContactForm.destroy({ where: { id: Id } });
				if(contactData)
				{
					req.flash('success', "Contact delete successfully.");
					res.redirect('/backend/contact-form');
				}
				else
				{
					req.flash('error', "Something went wrong.");
					res.redirect('/backend/contact-form');
				}
			} catch (err) {

				req.flash('error', "Contact not delete.");
				res.redirect('/backend/contact-form');
			}
		} else {
			req.flash('error', "Contact not deleted.");
			res.redirect('/backend/contact-form');
		}
	};
	
	module.enquiry = async function (req, res) {
		var query = {};
		var enquiry_list =  await model.EnquiryForm.findAll({ where: query, order: [['id', 'DESC']],  raw: true });
		try {
			res.render('backend/enquiry',{
				config: process.env,
				alias: 'Enquiry',	
				error: 	req.flash('error'),
				success: req.flash('success'),
				currYear: dateformat("yyyy"),
				css: ['bundles/datatables/datatables.min.css','bundles/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css'],
				script: [
					"bundles/datatables/datatables.min.js",
					"bundles/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js",
					"bundles/datatables/export-tables/dataTables.buttons.min.js",
					"bundles/datatables/export-tables/buttons.flash.min.js",
					"bundles/datatables/export-tables/jszip.min.js",
					"bundles/datatables/export-tables/pdfmake.min.js",
					"bundles/datatables/export-tables/vfs_fonts.js",
					"bundles/datatables/export-tables/buttons.print.min.js",
					"js/page/datatables.js"
				],
				enquiry_list: enquiry_list,
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};

	module.enquiry_delete = async function (req, res) {
		var Id = req.params.id;
		if (Id != "" && Id != 0) {
			try {
				var enquiryData = await model.EnquiryForm.destroy({ where: { id: Id } });
				if(enquiryData)
				{
					req.flash('success', "Enquiry delete successfully.");
					res.redirect('/backend/enquiry-form');
				}
				else
				{
					req.flash('error', "Something went wrong.");
					res.redirect('/backend/enquiry-form');
				}
			} catch (err) {

				req.flash('error', "Enquiry not delete.");
				res.redirect('/backend/enquiry-form');
			}
		} else {
			req.flash('error', "Enquiry not deleted.");
			res.redirect('/backend/enquiry-form');
		}
	};

	module.authenticate = async function (req, res) {
		try {
			console.log(req.body.email);
			console.log(req.body.password);
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};
	
	return module;
}