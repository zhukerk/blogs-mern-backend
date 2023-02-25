import multer from 'multer';
import fs from 'fs';
import * as uuid from 'uuid';


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('static')) {
            fs.mkdirSync('static');
        }
        cb(null, 'static');
    },
    filename: (_, file, cb) => {
        const fileName = uuid.v4() + '.' + file.originalname.split('.').at(-1);
        cb(null, fileName);
    },
});

export const upload = multer({ storage });
