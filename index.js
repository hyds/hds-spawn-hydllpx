var sys = require("sys"),
http = require("http"),
AWS = require('aws-sdk'),
childProcess = require('child_process'),
     	//hyenv = 'C:\\hydstra\\hyd\\sys\\run\\hydllpx.exe /u=test /p=test /hyaccess=c:\\hydstra\\hyd\\hyaccess.ini /hyconfig=c:\\hydstra\\hyd\\hyconfig.ini /b=5000',
hyenv = 'C:\\hydstra\\hyd\\sys\\run\\hyxplore.exe /u=test /p=test',
	hydllpx = 'C:\\hydstra\\hyd\\sys\\run\\hydllpx.exe ',
	hydll;

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




/*
var spawn = require('child_process').spawn,
    child = spawn(hyenv);

child.stdin.write = '';
child.stdout.pipe(process.stdout);

*/	