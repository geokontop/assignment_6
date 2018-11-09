# Assignment_1

## Steps
1. Create an http server
1. Server listens on port 3010
1. Inside createServer 
    - Get URL and parse it
    - Extract path from URL
    - Trimm '/' from begining and end of path
    - Initialize variable buffer that will accumulate the incoming stream - decoded
    - Bind to  event 'data' that the request object emmits
        - In the event callback we collect the incoming payload stream, if any
    - Bind to  event 'end' that the request object emmits
        - it's callback is called when the incoming stream compleets. In it we will handle the response and log the activity
1. Define a request router object
    - In it define path (key) 'hello' with the appropriate hello handler as value
1. Define a handlers object with
    - hello handler function, returns statusCode 200 and a payload
    - notFound handler function, returns statusCode 404
1. Write the server response inside request's end event callback. 
    - Choose the handler 
    - Construct the response data
    - Route accordingly calling the chosen handler
        - Pass the constructed response data to be used by the handler (just in case)
        - Use the statusCode if provided by the handler, otherways define some default
        - Use the payload if provided, otherways define some default
        - Convert payload to string
        - Write response object
        - In the response header set Content-Type, application/json