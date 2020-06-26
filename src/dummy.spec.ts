import { REGIONS } from './constants';

describe('Dummy test', () => {
  it('1=1', async () => {
    // Inject anything you want to test
    // const props = await MyComponent.getInitialProps({
    //   query: { first: 'whatever' }
    // });

    expect(REGIONS.MOSCOW.id).toBe(10);
  });
});
