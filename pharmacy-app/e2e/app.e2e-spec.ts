import { PatientAppPage } from './app.po';

describe('patient-app App', () => {
  let page: PatientAppPage;

  beforeEach(() => {
    page = new PatientAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
