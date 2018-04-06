import Gravnic from './index';

describe('Gravnic', () => {
  it('Should initalize without exploding', () => {
    const gravnic = new Gravnic();

    expect(gravnic instanceof Gravnic).toBe(true);
  });
});
