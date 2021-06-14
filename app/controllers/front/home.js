const {exit} = require("process");
const md5 = require('md5');
const { Op } = require("sequelize");
module.exports = function (model) {
	
	var middleware = require('../../middleware/index')(model);
	var module = {};

	// show home page
	module.index = async function (req, res) {
		var sessionData = "";
		if (req.session.user === undefined || req.session.user === null) {
			sessionData = "";
		} 
		else 
		{
			sessionData = req.session.user;
		}
		try {
			res.render('front/home',{
				config: process.env,
				alias: 'HOME',	
				sessionData : sessionData
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};
	
	// User Logout
	module.logout = async function(req, res) {
		delete req.session.user;
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.redirect("/");
	};
	
	// show about us
	module.aboutus = async function (req, res) {
		try {
			res.render('front/aboutus',{
				config: process.env,
				alias: 'ABOUT US',	
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};
	
	// show signin form
	module.signin = async function (req, res) {
		try {
			res.render('front/signin',{
				config: process.env,
				alias: 'SignIn',
				action: '/authenticate',
				error: req.flash('error'),	
				success: req.flash('success')	
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};

	module.authenticate = async function (req, res)
	{
		try {
			let username = req.body.username
			let password = req.body.password
			let userType = req.body.type
			if(userType == 'farmer')
			{
				var getUserData = await model.Farmer.findOne({where: { [Op.or]: [{ farmer_email_id: username }, { farmer_user_id: username }] }, raw: true})
				if (getUserData == null || getUserData == "") 
				{
					req.flash('error', "Entered Username is invalid.");
					res.redirect('/login');
				}
				if(getUserData.farmer_status == 0)
				{
					req.flash('error', "Currently your account is deactivate contact to admin to activate it.");
					res.redirect('/login');
				}
				if(getUserData.farmer_password != md5(password))
				{
					req.flash('error', "Entered Password is invalid");
					res.redirect('/login');
				}
				// create session
				req.session.user = {
					username	: getUserData.farmer_user_id,
					email		: getUserData.farmer_email_id,
					userid		: getUserData.id,
					isLoggedIn	: true,
					userType	: 'Farmer'
				};
				res.redirect('/');
			}	
			else if(userType == 'Trader')
			{

			}
			else if(userType == 'Broker')
			{

			}
			else
			{
				console.log("else");
			}
		} catch (error) {
			console.log("catch");
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};
	
	// show contact form
	module.contact = async function (req, res) {
		try {
			res.render('front/contact',{
				config: process.env,
				alias: 'CONTACT',
				action: '/submit-contact-form',
				error: req.flash('error'),	
				success: req.flash('success')	
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};
	
	// show enquiry form
	module.enquiryform = async function (req, res) {
		try {
			res.render('front/enquiryform',{
				config: process.env,
				alias: 'ENQUIRY FORM',
				action: '/submit-enquiry-form'	,
				error: 	req.flash('error'),
				success: req.flash('success')
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};

	// terms and conditions
	module.tandc = async function (req, res) {
		try {
			res.render('front/termsandcondition',{
				config: process.env,
				alias: 'TERMS AND CONDITIONS',	
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};
	
	// submit enquiry form
	module.submitEnquiry = async function (req, res) {
		try {
			let inputEnquiryData = {
				 buss_interest 	: req.body.business_interest,
				 name			: req.body.uname,
				 add			: req.body.add,
				 reason			: req.body.reason,
				 email			: req.body.email,
				 mobile			: req.body.mobile,
			}
			let enquiryData = await model.EnquiryForm.create(inputEnquiryData);	
			if(enquiryData != null)
			{
				req.flash('success', "Our marketing person contact you soon");
				res.redirect('/enquiry-form');	
			}
			else
			{
				req.flash('error', "Something went wrong.");
				res.redirect('/enquiry-form');	
			}
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/enquiry-form');
		}
	};
	
	// Suibmit contact form
	module.submitContact = async function (req, res) {
		try {
			let inputContactData = {
				fname			: req.body.fname,
				lname			: req.body.lname,
				email			: req.body.email,
				reason			: req.body.reason,
				message			: req.body.msg,
				 
			}
			let contactData = await model.ContactForm.create(inputContactData);	
			if(contactData != null)
			{
				req.flash('success', "Our support team contact you soon");
				res.redirect('/contact');	
			}
			else
			{
				req.flash('error', "Something went wrong.");
				res.redirect('/contact');	
			}
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/contact');
		}
	};

	// Farmer signup page
	module.farmerSignup = async (req, res) => {
		try {
			res.render('front/farmersignup',{
				config: process.env,
				alias: 'Farmer Signup',
				action: 'create-farmer',	
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};

	module.farmerCreate = async (req, res) => {
		try {
			var aadhaarImage = middleware.uploadFile.docUpload(req.files.adhImg)
			var panImage	 = middleware.uploadFile.fileUpload(req.files.panImg)
			var chequeImage	 = middleware.uploadFile.fileUpload(req.files.chqImg)
			var seven12		 = middleware.uploadFile.fileUpload(req.files.svn12Img)

			if(aadhaarImage == false) { req.flash('error', "Aadhaar PDF upload error"); }
			else if(panImage == false) { req.flash('error', "PAN Card image upload error"); }
			else if(chequeImage == false ) { req.flash('error', "Cheque/Passbook image upload error"); }
			else if(seven12 == false) { req.flash('error', "7/12 doument error"); }
			else
			{
				let farmerData = {
					farmer_name 		: req.body.fname,
					farmer_add 			: req.body.address,
					farmer_pin_code 	: req.body.pincode,
					farmer_contact_no 	: req.body.mobile,
					farmer_email_id 	: req.body.email,
					farmer_bank_acc_no 	: req.body.ac_no,
					farmer_ifsc 		: req.body.ifsc,
					farmer_branch 		: req.body.branch,
					farmer_pan_no 		: req.body.panno,
					farmer_aadhaar_no 	: req.body.adhno,
					farmer_user_id 		: req.body.userId,
					farmer_password 	: md5(req.body.pswd),
					aadhaar_image 		: aadhaarImage,
					pan_image 			: panImage,
					cheque_passbook_cpy : chequeImage,
					seven_12 			: seven12,
				}
				let farmerDataSubmit = await model.Farmer.create(farmerData);
				if(farmerDataSubmit)
				{
					var loginData = await model.Farmer.findOne({ where: { id: farmerDataSubmit.id }, raw: true });
					
					// create session
					req.session.user = {
						username	: loginData.farmer_user_id,
						email		: loginData.farmer_email_id,
						userid		: loginData.id,
						isLoggedIn	: true,
						userType	: 'Farmer'
					};
					res.redirect('/');	
				}
			}
		} catch (error) {
			console.log("catch 1");
			req.flash('error', "Something went wrong.");
			res.redirect('/');
		}
	};

	return module;
}