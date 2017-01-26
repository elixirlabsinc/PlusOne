import { WebPlusOnePage } from './app.po';

describe('web-plus-one App', function() {
  let page: WebPlusOnePage;

  beforeEach(() => {
    page = new WebPlusOnePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
