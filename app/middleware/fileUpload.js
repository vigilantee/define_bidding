const { exit } = require("process");
const path = require('path');
var fs = require('fs');

module.exports = function(model) {
    var module = {};

    module.fileUpload = (files) => {

        var pic = (files && files) ? files : [];
        if (pic.mimetype == "image/png" || pic.mimetype == "image/jpg" || pic.mimetype == "image/jpeg") {
            
            var dir = './public/pics/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            var fileName = pic.md5 + Date.now() + path.extname(pic.name);
            var newpath = "./public/pics/" + fileName;
            pic.mv(newpath, function (err) {
                if (err) { res.status(400).send(err); return; }
            });
            return fileName;
        }
        else {
            return false
    
        }
    };

    module.videoUpload = (files) => {

        var pic = (files && files) ? files : [];
        if (pic.mimetype == "video/mp4") {
            
            var dir = './public/videos/';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            var fileName = pic.md5 + Date.now() + path.extname(pic.name);
            var newpath = "./public/videos/" + fileName;
            pic.mv(newpath, function (err) {
                if (err) { res.status(400).send(err); return; }
            });
            return fileName;
        }
        else {
            return false
    
        }
    };

    module.docUpload = (files) => {

        var pic = (files && files) ? files : [];
        if (pic.mimetype != "application/pdf") {
            return false
        }
        else {
            if (typeof pic.length === "undefined") {
                var dir = './public/pics/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                var fileName = pic.md5 + path.extname(pic.name);
                var newpath = "./public/pics/" + fileName;
                pic.mv(newpath, function (err) {
                    if (err) { res.status(400).send(err); return false; }
                });
                return fileName;
            }
        }
    };

    return module;
}