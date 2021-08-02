import { readdirSync, unlinkSync, existsSync, statSync } from 'fs';
import {
  serveImage,
  thumbnailExists,
  createImage,
  findImage,
  thumbPath
} from '../imageProcessing';

const thumbDir = __dirname + '/../thumbnails/';
const thumbFile = thumbDir + 'fjord_200x100.png';
const imageFile = __dirname + '/../images/fjord.jpeg';

function emptyThumbDir() {
  // Empty the thumbnails directory
  const files = readdirSync(thumbDir);
  files.forEach((file) => {
    unlinkSync(thumbDir + file);
  });
}

describe('imageProcessing', () => {
  describe('thumbPath', () => {
    it('should return a well-formed filename', () => {
      expect(thumbPath('test', 'png', 400, 200)).toMatch(/test_400x200.png$/);
    });
  });

  describe('findImage', () => {
    it('should return an empty string if the image name is not matched', async () => {
      const output = await findImage('nosuchimage');
      expect(output).toBe('');
    });

    it('should return a filename if the image name is matched', async () => {
      const output = await findImage('fjord');
      expect(output).toMatch(/fjord.jpeg$/);
    });
  });

  describe('createImage', () => {
    it('should create a thumbnail', async () => {
      emptyThumbDir();
      await createImage(
        imageFile,
        { width: 200, height: 100, fit: 'fill' },
        'png',
        thumbFile
      );
      expect(existsSync(thumbFile)).toBe(true);
    });
  });

  describe('thumbnailExists', () => {
    beforeAll(() => {
      emptyThumbDir();
    });

    it('should return false if a thumbnail does not exist for the given path', async () => {
      const result = await thumbnailExists(thumbFile);
      expect(result).toBe(false);
    });

    it('should return true if a thumbnail exists for the given path', async () => {
      await createImage(
        imageFile,
        { width: 200, height: 100, fit: 'fill' },
        'png',
        thumbFile
      );
      const result = await thumbnailExists(thumbFile);
      expect(result).toBe(true);
    });
  });

  describe('serveImage', () => {
    const imageName = 'fjord';

    beforeEach(() => {
      emptyThumbDir();
    });

    it('should return a path to a raw image when no size or format parameters are included', async () => {
      const imagePath = await serveImage(imageFile, imageName, '', 0, 0);
      expect(imagePath).toMatch(/\/images\/fjord.jpeg$/);
    });

    it('should return a path to a thumbnail when size or format parameters are included', async () => {
      const imagePath = await serveImage(imageFile, imageName, '', 200, 0);
      expect(imagePath).toMatch(/\/thumbnails\/fjord_200x0.jpeg$/);
    });

    it('should create a thumbnail when no previous thumbnail exists', async () => {
      const imagePath = await serveImage(imageFile, imageName, '', 200, 0);
      expect(existsSync(imagePath)).toBe(true);
    });

    it('should not create a thumbnail when a previous thumbnail exists', async () => {
      let imagePath = await serveImage(imageFile, imageName, '', 200, 0);
      const fileStats = statSync(imagePath);
      imagePath = await serveImage(imageFile, imageName, '', 200, 0);
      const fileStats2 = statSync(imagePath);
      expect(fileStats).toEqual(fileStats2);
    });
  });
});
