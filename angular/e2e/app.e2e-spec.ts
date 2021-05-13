import { AngularTemplatePage } from './app.po';

describe('Angular App', function() {
  let page: AngularTemplatePage;

  beforeEach(() => {
    page = new AngularTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
