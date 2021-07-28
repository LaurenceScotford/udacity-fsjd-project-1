import express from 'express';
import imageRoute from './routes/image';
import { existsSync, mkdirSync } from 'fs';
import { thumbnailPath, port } from './apiconstants';

const app = express();

// Check if a thumbnails folder exists and create one if not
try {
  if (!existsSync(thumbnailPath)) {
    mkdirSync(thumbnailPath);
  }
} catch(err) {
  console.log("An error occurred while checking thumbnail path or making new thumbnail directory")
}

// Set up root
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Set up image endpoint
app.use('/image', imageRoute);

// Start server
app.listen(port);
console.log(`Server is running on port ${port}`);

export default app;
