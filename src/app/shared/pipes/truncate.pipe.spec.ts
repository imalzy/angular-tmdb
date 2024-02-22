import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return text shorter or equal to limit without ellipses', () => {
    const truncatePipe = new TruncatePipe();
    const text = 'Hello World';
    const length = 20;

    const result = truncatePipe.transform(text, length);
    expect(result).toBe(text);
  });
  it('should return text longer than limit with ellipses', () => {
    const truncatePipe = new TruncatePipe();
    const text =
      'Hello World, My name is imal for this moment i will create pipe unit testing with jasmine';
    const expectation = 'Hello World, My name...';
    const length = 20;

    const result = truncatePipe.transform(text, length);
    expect(result).toBe(expectation);
  });
});
