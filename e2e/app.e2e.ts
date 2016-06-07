import { PacBioPage } from './app.po';

describe('pac-bio App', function() {
  let page: PacBioPage;

  beforeEach(() => {
    page = new PacBioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('pac-bio works!');
  });
});
