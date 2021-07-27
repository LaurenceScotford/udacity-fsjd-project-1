import request from 'supertest';
import app from '../../index';

describe('image.ts : route to request an image', () => {
    describe('app.get', () => {
        it('should return an image and http status of 200 if the image exists', (done) => {
            request(app)
            .get('/image?name=fjord')
            .expect('Content-Type', /jpeg/)
            .expect(200)
            .end((error) => (error ? done.fail(error) : done()));
        });
    });
});