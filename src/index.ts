import express from 'express';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import imageRoute from './routes/image';
import { getImageList } from './routes/helpers/imageProcessing';
import { thumbnailPath, port } from './apiconstants';

const app = express();

// Check if a thumbnails folder exists and create one if not
try {
  if (!existsSync(thumbnailPath)) {
    mkdirSync(thumbnailPath);
  }
} catch (err) {
  console.log(
    'An error occurred while checking thumbnail path or making new thumbnail directory'
  );
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));

// Set up root
app.get('/', async (req: express.Request, res: express.Response) => {
  // Get a list of available images
  app.locals.imageList = await getImageList();
  app.locals.baseUrl = req.protocol + '://' + req.hostname + ':' + port;
  res.render('index');
});

// Set up image endpoint
app.use('/image', imageRoute);

// Start server
app.listen(port);
console.log(`Server is running on port ${port}`);

export default app;
