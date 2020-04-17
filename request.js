const https=require('https');
const data=JSON.stringify(
    {userName:'Francis20'}
)
const options= {
    hostname:'localhost',
    port:443,
    path:'/users',
    method:'POST',
    headers: {
        'Content-type': 'application/json',
        'Content-Length':'data.length',
        'Authorization':Buffer.from('myUserName' + ':'+ 'myPassword').toString('base64')
    }
};

const request=https.request(
options,
    (response)=>{
        console.log(`status code: ${response.statusCode}`);
        console.log(response.headers);

        response.on('data',(chunk)=>{
            console.log(' This is a chunk \n');
            console.log(chunk.toString());
        })
        
    }
);
request.on('error',(err)=>{
    console.error(err);
});
request.write(data);
request.end();