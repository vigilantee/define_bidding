var dateformat = require('dateformat');
const { exit } = require('process');
var currentDate = new Date();
module.exports = function (model) {

	var module = {};

	module.index = async function (req, res) {
		try {
			res.render('backend/add-bidding',{
				config: process.env,
				alias: 'Add Bidding',	
				action: 'backend/create-bidding',
				error: 	req.flash('error'),
				success: req.flash('success'),
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};

	module.create_bid = async function (req, res) 
	{
		try {
			let inputbiddingData = {
				category		: req.body.category, 
				uom 			: req.body.uom,
				bid_date 		: req.body.bid_date,
				start_date_time : req.body.start_date+' '+req.body.start_time,
				end_date_time	: req.body.end_date+' '+req.body.end_time,
				price 			: req.body.price,
				product 		: req.body.product,
				qty  			: req.body.qty,
			}
			let biddingData = await model.Bidding.create(inputbiddingData);	
			if(biddingData != null)
			{
				req.flash('success', "Bid created successfully");
				res.redirect('/backend/add-bidding');	
			}
			else
			{
				req.flash('error', "Something went wrong.");
				res.redirect('/backend/add-bidding');	
			}
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend/add-bidding');
		}	
	};

	module.show = async function (req, res) {
		try {
			var query = {};
			var bid_list =  await model.Bidding.findAll({ where: query, order: [['id', 'DESC']],  raw: true });
			res.render('backend/show-bidding',{
				config: process.env,
				alias: 'Bidding',	
				error: 	req.flash('error'),
				success: req.flash('success'),
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
				bid_list: bid_list,	
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};
	
	return module;
}