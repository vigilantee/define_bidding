var dateformat = require('dateformat');
var currentDate = new Date();
module.exports = function (model) {

	var module = {};

	module.index = async function (req, res) {
		try {
			var query = {};
			var farmer_list =  await model.Farmer.findAll({ where: query, order: [['id', 'DESC']],  raw: true });
			res.render('backend/farmer',{
				config: process.env,
				alias: 'Farmer',	
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
				farmer_list: farmer_list
			});
		} catch (error) {
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};

	module.status = async function (req, res){
		try {
			var id = req.params.id
			var status = req.params.status
			console.log(id+"---"+status);
		} catch (error) {
			console.log("catch");
			req.flash('error', "Something went wrong.");
			res.redirect('/backend');
		}
	};

    return module;
}