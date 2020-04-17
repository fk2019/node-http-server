

  


function fetchImageMetadata (id){
 return {
    id:id,
    title:'Sunset',
    description:'Taken in Kenya - may be useful in an advertisement',
    creator:'Ben C. Muiruri',
    date:new Date()
 }
}
const createUser=(userName)=>{
    console.log('saving..');
    console.log(`user "${userName}" created`)
}
exports.fetchImageMetadata=fetchImageMetadata;
exports.createUser=createUser;