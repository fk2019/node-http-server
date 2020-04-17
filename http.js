const http=require('http');
const url=require('url');
const services=require('./services');
const jsonBody=require('body/any');
const fs=require('fs');
const formidable=require('formidable');

const server=http.createServer({
    // key:fs.readFileSync('./key.pem'),
    // cert:fs.readFileSync('./cert.pem')
});
server.on('request',(request, response)=>{
    const parsedUrl=url.parse(request.url, true);

    if(request.method==='GET' && parsedUrl.pathname==='/metadata'){
        const {id}=parsedUrl.query
        const metadata=services.fetchImageMetadata(id);
        response.setHeader('Content-Type', 'application/json');
        response.statusCode;
        const serializedJSON=JSON.stringify(metadata);
        response.write(serializedJSON);
        response.end();
        
    }
    else if(request.method==='POST' && parsedUrl.pathname==='/users'){
        jsonBody(request, response, (err, body)=>{
            if(err){
                console.log(err)
            }
            console.log(body);
            services.createUser(body[0].userName)
         
    
        })
       
    } 
    else if(request.method==='POST' && parsedUrl.pathname==='/upload'){
        const form= new formidable.IncomingForm({
            uploadDir:'./uploads',
            KeepExtensions:true,
            maxFileSize: 5*1024*1024
        });
        form.parse(request)
        .on('fileBegin', (name,file)=>{
            console.log('Your upload has started!');
        })
        .on('file',(name,file)=>{
            console.log('Field + file pair has been received')
        })
        .on('field',(name,value)=>{
            console.log('Field received:');
            console.log(name,value);
        })
        .on('progress',(bytesReceived, bytesExpected)=>{
            console.log(bytesReceived +'/'+ bytesExpected);
        })
        .on('error',(err)=>{
            console.log(err);
            request.resume();
        })
        .on('aborted',()=>{
            console.log('Request aborted by user')
        })
        .on('end',()=>{
            console.log('Done, upload completed');
            response.end('Success');
        })
       
    }
    else{
        // response.statusCode=404;
        // response.writeHead(404, {
        //     'X-Powered-By':'Node'
        // })
        // response.end();
        fs.createReadStream('./index.html').pipe(response);
    }
  

   

});
server.listen(5000);