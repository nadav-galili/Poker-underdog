const path=require('path');
const multer=require('multer');

var storage=multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads/');
    }, 
    filename:function(req, file, cb){
        let ext=path.extname(file.originalname);
        let fileName=path.basename(file.originalname, ext);
        cb(null,fileName+'-'+ Date.now()+ext);
    }
})

var upload=multer({
    storage:storage,
    fileFilter:function(req, file, cb){
        var filetypes = /jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
        if (mimetype && extname) {
            return cb(null, true);
          }
          cb("Error: File upload only supports the following filetypes - " + filetypes);       
    },
    limits:{
        fileSize:1024*1024*6
    }
})

module.exports=upload