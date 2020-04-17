const http=require('http');
const url=require('url');
const server= http.createServer();
const fs=require('fs');
const data= {
    'username':'Francis20',
    'location':'kenya'
}
server.on('request', (request, response)=>{
    const parsedUrl=url.parse(request.url, true);
    if(request.method==='POST' && parsedUrl==='/user'){
        const JSONdata=JSON.stringify(data);
        response.setHeader('Content-Type','application/json');
        response.statusCode;
        response.write(JSONdata);
        response.end();
        

    }
  fs.createReadStream('./index.html').pipe(response);
});
server.listen(3500);


