const mongodb = require(`mongodb`).MongoClient;
let dbuser = 'ketan';
let dbpassword = 'ketan18710';
let dbname = 'taklist';
let collection = 'tasks';
let url  = `mongodb://${dbuser}:${dbpassword}@ds011278.mlab.com:11278/taklist`

function connect(cb) {
    mongodb.connect(url, function(err, client){
        if(err) throw err;
        let db = client.db(dbname);
        collection = db.collection('tasks');
        // insertDoc();
        //console.log(db);
        cb();
    })
}

function insertDoc(data){
   collection.insertOne(data,function(err, result){
       if (err) throw err;
       console.log(result); 
   })
}
function delDoc(val){
    collection.deleteOne({'data' : val })
}
function udtDoc(o_data,u_data){
    collection.updateOne(
        {'data' : o_data},
        {$set : {'data': u_data}}
        ,function(err,result){
            if (err) throw err;
            
            console.log('updated');
        }
    )
}
function getValues(cb){
    arr = [];
    collection.find({}).toArray(function(err, docs) {
        if (err) throw err ;
        for(i=0;i<docs.length;i++)
        {
            arr.push(docs[i].data);
        }
        cb(arr);
      });
     
}

module.exports = {
    connect,
    insertDoc,
    delDoc,
    udtDoc,
    getValues
}