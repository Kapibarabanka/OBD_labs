const video = require('../js/video');

describe('Video tests (spy functions demonstration)', () => {
    test('plays video', () => {
        const spy = jest.spyOn(video, 'play');
        const isPlaying = video.play();

        expect(spy).toHaveBeenCalled();
        expect(isPlaying).toBe(true);

        spy.mockRestore();
    });
})
