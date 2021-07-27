import express from 'express';
import imageRoute from './routes/image';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/image', imageRoute);

app.listen(port);
console.log(`Server is running on port ${port}`);

export default app;
