import multer from "multer";

export const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "images/");
    },
    filename: (req, file, cb) =>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, uniqueSuffix + '-' + file.originalname)
        cb(null, file.originalname);
    }
  });

