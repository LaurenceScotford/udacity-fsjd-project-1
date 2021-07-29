interface TypesObject {
  [key: string]: string
}

const port = 3000;
const thumbnailPath = __dirname + '/thumbnails/';
const imagePath = __dirname + '/images/';
const validTypes : TypesObject = {
    'avif': 'avif',
    'gif': 'webp',
    'jpg': 'jpeg',
    'jpeg': 'jpeg', 
    'png': 'png',
    'svg': 'webp',
    'tiff': 'tiff',
    'webp': 'webp'};

export { port, thumbnailPath, imagePath, validTypes };