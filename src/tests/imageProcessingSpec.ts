import { findImage, thumbPath } from '../imageProcessing';

describe('imageProcessing', () => {
    describe('findImage', () => {
        it('should return an empty string if the image name is not matched', async () => {
            const output = await findImage('nosuchimage');
            expect(output).toBe('');
        });

        it('should return a filename if the image name is matched', async () => {
            const output = await findImage('fjord');
            expect(output).toMatch(/fjord.jpg$/);
        });
    });

    describe('thumbPath', () => {
        it('should return a well-formed filename', () => {
            expect(thumbPath('test', 'png', 400, 200)).toMatch(/test_400x200.png$/);
        });
    });
});