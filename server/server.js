var express = require('express');
var bodyParser = require('body-parser');
var app = express();

require('./dbcon');
var testModel = require('./test_schema');

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

//---อนุญาติสิทธิ์การเข้าถึง---//
app.all('*',function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    res.setHeader('Access-Control-Allow-Credentials', true); 
    next();
});
app.get('/',function(req,res){
    res.end('root page');
});
app.post('/api',function(req,res){
    var Fname = req.body.fname;
    var Lname = req.body.lname;
    testModel.create(req.body,function(err,doc){
        if(err){
            throw err;
            console.log('Error');
        }else{
            res.json({
                result:"Success",
                Fname:Fname,
                Lname:Lname
            })
        }
    });
});
app.get('/api',function(req,res){
    testModel.find(function(err,doc){
        if (err)
        console.log('error');
        res.json({
            rs:doc
        });
    });
});
app.delete('/delete/:id',function(req,res){
   testModel.findByIdAndRemove(req.params.id,function(err,success){
    if(err) return res.status(500).send(err);
    const response = {
        message:"Success Delete"
    }
    //return res.status(200).res.json(JSON.stringify(response));
    return res.json(response);
   });
});
app.put('/update',function(req,res){
    testModel.findById(req.body.id,function(err,success){
        const msgError = {
            mgs:"Error"
        }
        const msgSuccess = {
            mgs:"Success"
        }
        if(err) res.json(msgError);
        //update save
        testModel.save(req.body,function(err,rs){
            if(err) res.send("Update Error");
            res.json(msgSuccess);
        });
    });
});
var server = app.listen(3000,function(){
    var port = server.address().port;
    console.log("Server is starting... on port : " + port);
})