import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PacBioAppComponent } from '../app/pac-bio.component';

beforeEachProviders(() => [PacBioAppComponent]);

describe('App: PacBio', () => {
  it('should create the app',
      inject([PacBioAppComponent], (app: PacBioAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'pac-bio works!\'',
      inject([PacBioAppComponent], (app: PacBioAppComponent) => {
    expect(app.title).toEqual('pac-bio works!');
  }));
});
