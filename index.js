var express = require('express');
var multer = require('multer');
var app = express();
var storage = multer.diskStorage({
    destination:function(req,fike,callback){
        callback(null,'./uploads');
    },
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
});

var upload = multer({storage:storage}).single('myfile');

app.get('/',(req,res,next)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post('/uploadfile',(req,res,next)=>{
    upload(req,res,function(err){
        if(err){
            return res.end("Error while uploading the file");
        }else{
            res.end("File Uploaded Succesfully");
        }
    });
});

app.listen(5000,()=>{
    console.log(`server is running on port 5000`);
})