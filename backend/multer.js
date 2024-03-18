const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "upload/");         
    },
    filename: function (req, res, cb) {
        const uniqueSuffix = Data.now() + "_" + Math.round(Math.random() * 1e9);
        const filename = file.originalname.split(".")[0];
        cb(null, filename + "_" + uniqueSuffix + ".png");
    },
});

exports.upload = multer({storage: storage});