/*
 * 1st assignment
 * 
 */
 
// Dependencies

 var http = require('http');
 var listener = require('./app/listener.js');
 var router = require('./app/router.js');
 var cluster = require('cluster');
 var os = require('os');

var server = http.createServer(function(req,res){
   listener(router,req,res);
})


// Application container
var app = {};

// Init function
app.init = ()=>{
    // If we're on the master thread, fork the proccess
    if (cluster.isMaster) {
        // ...
        // Fork the process
        for (var i = 0; i < os.cpus().length; i++) {
            cluster.fork();
        }
    } else {
        // If we're not on the master thread, start the HTTP server
        server.listen(3000,function(){
            console.log('The server is listening on port 3000')
        })    
    }
}

// Start the app
app.init();
