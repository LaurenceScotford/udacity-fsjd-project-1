// import express from 'express';
import sharp from 'sharp';
//
// const app = express();
// const port = 3000;
//
// app.get('/', (req, res) => {
//   res.send("Server is running!");
// });
//
// app.listen(port);
// console.log(`Server is running on port ${port}`);
console.log('converting...');
sharp(__dirname + '/images/fjord.jpg')
  .resize(300, 200)
  .toFile(__dirname + '/images/output.jpg', function(err) {
    console.log(`Sharp reported: ${err}`);
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
  });
  console.log('Done!');
