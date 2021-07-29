import express from 'express';
import { findImage, serveImage } from '../imageProcessing';
import { validTypes } from '../apiconstants';

const router = express.Router();

router.get('/', async (req, res) => {

  const name = req.query.name ? (req.query.name as string).toLowerCase() : '';
  const type = req.query.type ? (req.query.type as string).toLowerCase() : '';
  const width = req.query.width ? parseInt(req.query.width as string) : 0;
  const height = req.query.height ? parseInt(req.query.height as string) : 0;

  if (name.length == 0 || isNaN(width) || width < 0 || isNaN(height) || height < 0 || (type.length > 0 && !Object.values(validTypes).includes(type))) {
    res.status(401).send('Malformed query');
  } else {
    const imageFile = await findImage(req.query.name as string);
    if (imageFile.length > 0) {
      const outFile = await serveImage(imageFile, name, type, width, height)
      res.sendFile(outFile);
    } else {
      res.status(404).send('Requested image not found');
    }
  }
 
});

export default router;