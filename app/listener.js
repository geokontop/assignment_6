

var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var bufferPayload = function(req,callback){
    // Get the payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data',function(data){
        buffer += decoder.write(data);
    });
    req.on('end',function(){
        buffer += decoder.end();
        callback(buffer)
    })
}

var listenerMethod   = function(router,req,res){
     
    // Get the URL and parse it
    var parsedUrl = url.parse(req.url,true);

    // Get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the querry string as an object
    var querryStringObject = parsedUrl.query;

    // Get the http method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Construct the data-object to send to the handler
    var data = {
        'trimmedPath' : trimmedPath,
        'querryStringObject' : querryStringObject,
        'method': method,
        'headers': headers
    };

    // Choose the handler the request should go to. If one is not found, use the notFound handler.
    var chosenHandler = typeof(router[trimmedPath])!= 'undefined'? router[trimmedPath]:router['notFound'];

    bufferPayload(req,function(buffer){
        
        data.buffer = buffer
        // Route the request to the chosen handler  
        chosenHandler(data, function(statusCode, payload){
            // Use the status code called back by the handler or default to 200
            statusCode= typeof(statusCode) == 'number'? statusCode:200;

            // Use the payload called back by the handler or default to empty object
            payload= typeof(payload) == 'object' || typeof(payload) == 'string'? payload:data.buffer;

            // Convert the payload to a string
            payloadString = JSON.stringify(payload);

            // Write response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString)

            // Log activity
            console.log('method:', data.method, 'request received on path:', data.trimmedPath)

        })
    });
}

module.exports = listenerMethod;