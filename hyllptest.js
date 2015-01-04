

var sys = require("sys"),

http = require("http"),

AWS = require('aws-sdk'),

childProcess = require('child_process'),

exec = require('child_process').exec,

     	//hyenv = 'C:\\hydstra\\hyd\\sys\\run\\hydllpx.exe /u=test /p=test /hyaccess=c:\\hydstra\\hyd\\hyaccess.ini /i=c:\\test\\json.txt /o=c:\\test\\out.txt /hyconfig=c:\\hydstra\\hyd\\hyconfig.ini /b=58739',

	hyenv = 'C:\\hydstra\\hyd\\sys\\run\\hyxplore.exe',// /u=test /p=test',

	hydllpx = 'C:\\hydstra\\hyd\\sys\\run\\hydllpx.exe /u=test /p=test /hyaccess=c:\\hydstra\\hyd\\hyaccess.ini /i=c:\\test\\json.txt /o=c:\\test\\out.txt /hyconfig=c:\\hydstra\\hyd\\hyconfig.ini /b=58739\n',

	hydllpxexe = 'C:\\hydstra\\hyd\\sys\\run\\hydllpx.exe',

	setup = '/u=test /p=test /hyaccess=c:\\hydstra\\hyd\\hyaccess.ini /i=c:\\test\\json.txt /o=c:\\test\\out.txt /hyconfig=c:\\hydstra\\hyd\\hyconfig.ini /b=58739\n',

	hydll, 

	child = hydllpx+setup,

	jsoncall = {

		"function":"get_site_list",

		"version": 1,

		"params": {"site_list": "TSFILES(DSOURCES(ARCHIVE))"}

	};

		

console.log("about to spawn");	

hydll = childProcess.spawn(hydllpxexe,[

	'/u=test', 

	'/p=test',

	'/hyaccess=c:\\hydstra\\hyd\\hyaccess.ini',

	'/hyconfig=c:\\hydstra\\hyd\\hyconfig.ini', 

	'/b=58739']);



hydll.stdin.resume();

hydll.stdin.setEncoding = 'utf-8';

hydll.stdin.write(JSON.stringify(jsoncall)+"\n");

hydll.stdout.pipe(process.stdout);

hydll.stderr.pipe(process.stderr);

hydll.stdin.end();



/*

http.createServer(function(request,response){

	sys.puts("I god kicked");

	hydll = childProcess.exec(hyenv, function (error, stdout, stderr) {

   if (error) {

     console.log(error.stack);

     console.log('Error code: '+error.code);

     console.log('Signal received: '+error.signal);

   }

   console.log('Child Process STDOUT: '+stdout);

   console.log('Child Process STDERR: '+stderr);

 });



 hydll.on('exit', function (code) {

   console.log('Child process exited with exit code '+code);

 });

	response.writeHeader(200,{"Content-Type":"text/plain"});

	response.write("Hello World");

	response.end();	



}).listen(8080);



sys.puts("Server running on 8080");

*/





/*

var spawn = require('child_process').spawn,

    child = spawn(hyenv);



child.stdin.write = '';

child.stdout.pipe(process.stdout);



*/	





 

