var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/meanstack',{useNewUrlParser:true});


mongoose.connection.on('connected', function(){
    console.log('Data base connected success !!');
});
mongoose.connection.on('error', function(){
    console.log('Connect error  !!');
});
mongoose.connection.on('disconnect', function(){
    console.log('Data base disconnected');
})
process.on('SIGINT', function(){ 
    mongoose.connection.close(function (){ //หากมีการปิด database
        console.log('disconnected');
    });
});
