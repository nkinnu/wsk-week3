import sharp from 'sharp';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype.startsWith('video/')
    ) {
      cb(null, true);
    } else {
      const error = new Error('Only images and videos are allowed!');
      error.status = 400;
      cb(error, false);
    }
  },
});

async function createThumbnail(req, res, next) {
  if (!req.file || !req.file.mimetype.startsWith('image/')) {
    return next();
  }

  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(`${req.file.path}_thumb.png`);

    next();
  } catch (error) {
    next(error);
  }
}

export {upload, createThumbnail};
