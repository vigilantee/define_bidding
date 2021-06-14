var dateformat = require('dateformat');
var currentDate = new Date();
module.exports = function (model) {

	var module = {};

	module.index = async function (req, res) {
		try {
			var query = {};
			var broker_list =  await model.Broker.findAll({ where: query, order: [['id', 'DESC']],  raw: true });
			res.render('backend/broker',{
				config: process.env,
				alias: 'Broker',	
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
				broker_list: broker_list		
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};

    return module;
}