import findImage from '../imageProcessing';

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
});