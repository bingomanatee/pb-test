export class PacBioPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pac-bio-app h1')).getText();
  }
}
