(function() {

	var fs = require("fs");
	var path = require('path');
	var Handlebars = require("handlebars");
	var moment = require("moment");

	function render(resume) {

		var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
		var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
		var partialsDir = path.join(__dirname, 'partials');
		var filenames = fs.readdirSync(partialsDir);

		filenames.forEach(function (filename) {

			var matches = /^([^.]+).hbs$/.exec(filename);
			if (!matches) {
				return;
			}
			var name = matches[1];
			var filepath = path.join(partialsDir, filename)
			var template = fs.readFileSync(filepath, 'utf8');

			Handlebars.registerPartial(name, template);
		});

		return Handlebars.compile(tpl)({
			css: css,
			resume: resume
		});

	}  

	module.exports = {
		render: render
	};  

	Handlebars.registerHelper('toLowerCase', function(str) {
		return str.toLowerCase();
	});   
	
	Handlebars.registerHelper('MY', function(date) {
		return moment(date.toString(), ['YYYY-MM-DD']).format('MMMM YYYY');
	});

}());
