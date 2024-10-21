import { diskStorage } from 'multer';
import { randomBytes } from 'crypto';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploadedFile',
    filename:(req, file, cb) => {
      // const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
      // const ext = extname(file.originalname);
      // cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)

      //Another way ....
      randomBytes(6, function (err, bytes){
        if (err) {
          return cb(err, null);
        } else {
          const fn = bytes.toString('hex') + extname(file.originalname);
          cb(null, `${Date.now()}-${fn}`);
        }
      });
    },
  }),
};
