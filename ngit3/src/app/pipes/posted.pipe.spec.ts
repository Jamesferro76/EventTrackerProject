import { PostedPipe } from './posted.pipe';

describe('PostedPipe', () => {
  it('create an instance', () => {
    const pipe = new PostedPipe();
    expect(pipe).toBeTruthy();
  });
});
