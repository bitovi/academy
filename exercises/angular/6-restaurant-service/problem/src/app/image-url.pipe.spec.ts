import { ImageUrlPipe } from './image-url.pipe';

describe('ImageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ImageUrlPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns a string with proper assets path', () => {
    const pipe = new ImageUrlPipe();
    expect(pipe.transform('node_modules/place-my-order-assets/tacos.png')).toBe(
      './assets/tacos.png'
    );
  });
});
