import request from 'supertest';
import app from '../../../src/index';

describe('image.ts : route to request an image', () => {
  describe('app.get', () => {
    it('should return an image and http status of 200 if the image exists', (done) => {
      request(app)
        .get('/image?name=fjord')
        .expect('Content-Type', /jpeg/)
        .expect(200)
        .end((error) => (error ? done.fail(error) : done()));
    });

    it('should return a status of 400 for a malformed query', (done) => {
      request(app)
        .get('/image?name=fjord&width=fifty')
        .expect(400)
        .end((error) => (error ? done.fail(error) : done()));
    });

    it('should return a status of 404 if a matching image is not found', (done) => {
      request(app)
        .get('/image?name=nothing')
        .expect(404)
        .end((error) => (error ? done.fail(error) : done()));
    });
  });
});
