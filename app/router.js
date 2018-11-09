
// Define the handlers
var handlers = {};

// Hello handler
handlers.hello =function(data, callback){
    // Callback a http status code, and a payload object
    callback(200,{'assignment1': 'assignment fulfilled'});
}

// Ping handler
handlers.ping =function(data, callback){
    // Callback a http status code, and a payload object
    callback(200,'pong');
}

// Not found handler
handlers.notFound = function(data, callback){
    callback(404);
}

// Define a request router
var router = {
    'hello' : handlers.hello,
    'ping' : handlers.ping,
    'notFound' : handlers.notFound
}

module.exports = router;