const path=require('path');
const multer=require('multer');

var storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, '../public/uploads');
    }, 
    filename:function(req, file, cb){
        let ext=path.extname(file.originalname);
        let fileName=path.basename(file.originalname, ext);
        cb(null,fileName+'-'+ Date.now()+ext);
    }
})

var upload=multer({
    storage:storage,
    fileFilter:function(req, file, callback){
        if(
            file.mimetype==="image/png" ||
            file.mimetype==="image/jpg" ||
            file.mimetype==="image/jpeg"
        ){
            callback(null, true)
        }else{
            console.log('only jpg & jpeg & png file supported');
            callback(null, false)
        }
    },
    limits:{
        fileSize:1024*1024*6
    }
})

module.exports=upload