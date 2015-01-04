var sys = require("sys"),

hydllpxexe = 'C:\\hydstra\\hyd\\sys\\run\\hydllpx.exe',

hydll,

childProcess = require('child_process'),

jsoncall = {

		"function":"get_site_list",

		"version": 1,

		"params": {"site_list": "GROUP(BORES,GEELONG)"}

		//"params": {"site_list": "TSFILES(DSOURCES(WORK))"}

	},

site = {},	

http = require("http"),

fs = require('fs'),

hydllLogin = ['/u=test', 

	'/p=test',

	'/hyaccess=c:\\hydstra\\hyd\\hyaccess.ini',

	'/hyconfig=c:\\hydstra\\hyd\\hyconfig.ini', 

	'/b=259767'],

port = process.env.PORT || 80;





var qs = require('querystring');



//http://stackoverflow.com/questions/15427220/how-to-handle-post-request-in-node-js

var formOutput = '<html><body>'

  + '<h1>Thiess Webservice Demo</h1>'

  + '<form method="post" action="." enctype="application/x-www-form-urlencoded"><fieldset>'

  + '<div><label for="Station">Station Search: </label><input type="text" id="Station" name="Station" /></div>'

  + '<input id="search" type="submit" value="Search" /></div></fieldset></form></body></html>';

//console.log("about to spawn");	

  

//hydll.stdout.pipe(process.stdout);

/*

sites = hydll.stdout;

var keys;

for (var key in sites) {

   var obj = sites[key];

   for (var prop in obj) {

      // important check that this is objects own property 

      // not from prototype prop inherited

      if(obj.hasOwnProperty(prop)){

        //alert(prop + " = " + obj[prop]);

      }

   }

   keys += key+"\n";

}

*/



var test = {

					"function":"get_db_info",

					"version": 3};

				



//var sites = JSON.parse(sites);

http.createServer(function (req, res) {

        

		

		if(req.method == "GET") {

			req.on('data', function(data) {

				console.log(data);

			});

			//res.writeHead(200, {'Content-Type': 'text/html'});

			res.writeHead(413, "Request Entity Too Large", {'Content-Type': 'text/html'});

			res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');

		

		}

		else if(req.method == "POST") {

			//console.log(req);

			/*

			var js = JSON.parse(req);

			fs.writeFile("postlog.txt", js, function(err) {

				if(err) {

					console.log(err);

				} else {

					console.log("The file was saved!");

				}

			}); 

			*/

			var requestBody = '';

			req.on('data', function(data) {

				requestBody += data;

				console.log(requestBody);

				if(requestBody.length > 1e7) {

					//res.writeHead(413, "Request Entity Too Large", {'Content-Type': 'text/html'});

					//res.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');

				}

				

			});

			req.on('end', function() {

				//var formData = JSON.parse(requestBody);

				//res.write(requestBody);

				//console.log('requestBody');

				//console.log(requestBody);

				

				var jsonCall = {

					"function":"get_db_info",

					"version": 3,

					"params":{

						"table_name": "site", 

						"return_type": "array", 

						"decodes":"yes",

						"field_list": ["station", "stname", "latitude", "longitude", "zone"],

						//"sitelist_filter":"GROUP(BORES,"+formData.Station+")"

						

						//"filter_values" :{	

						//	"station" : formData.Station

						//}

					}	

				};	

				res.writeHead(200, {'Content-Type': 'text/html'});

				//res.write('<!doctype html><html><head><title>res</title></head><body>');

				//res.write('Thanks for the data!<br />User Name: '+formData.Station);

				hydll = childProcess.spawn(hydllpxexe,hydllLogin);

				hydll.stdin.resume();

				hydll.stdin.setEncoding = 'utf-8';

				//hydll.stdin.write(JSON.stringify(jsonCall)+"\n");

				

				//hydll.stdin.write(JSON.parse(formData.Station)+"\n");

				hydll.stdin.write(requestBody+"\n");

				hydll.stdout.pipe(res);

				hydll.stderr.pipe(res);

				hydll.stdin.end();

				

				

				//res.end('</body></html>');

			});

			/*

			res.writeHead(200, { 'Content-Type': 'text/plain' });

			hydll = childProcess.spawn(hydllpxexe,hydllLogin);

			hydll.stdin.resume();

			hydll.stdin.setEncoding = 'utf-8';

			//hydll.stdin.write(JSON.stringify(jsoncall)+"\n");

			hydll.stdin.write(JSON.stringify(req)+"\n");

			hydll.stdout.pipe(res);

			hydll.stderr.pipe(res);

			hydll.stdin.end();

				*/

		}	

}).listen(port);





/*

http.createServer(function(req, res) {

  res.writeHead(200, { 'Content-Type': 'text/plain' });



  res.end('THIESS Cloud Hydstra\nArchive Sites\n');

  

  

}).listen(port);

*/



sys.puts("Server running on: ["+port+"]");