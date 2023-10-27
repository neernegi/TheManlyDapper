import multer from 'multer';
import { v4 as uuid } from 'uuid';

const upload = multer({
    storage:multer.diskStorage({
        destination:'product-data/images',
        filename:function(req, file, cb) {
            cb(null, uuid() + '-' +file.originalname);
        }
    })
});

const configuredMulterMiddleware = upload.single('image');


export default configuredMulterMiddleware;