import { browser, logging } from 'protractor';

import { DataHelper } from '../helpers/dataHelper';
import { FavoritesPage } from '../pages/favoritesPage.po';
import { HomePage } from '../pages/homePage.po';
import { NavigationBar } from '../pages/navigationBar.po';

const dataHelper = new DataHelper();

const homePage = new HomePage();
const favoritesPage = new FavoritesPage();
const navigationBar = new NavigationBar();

describe('Smoke testing', () => {

  beforeEach(async ()=> {
    await homePage.navigateToPage();
  });

  it('Should navigate between pages', async () => {

  });

  it('Should search using Search By Query functionality', async () => {
    //Open Home page and check visibility of main elements
    await navigationBar.isBarVisible()
    await homePage.isPageVisible();

    //Insert first word into Search By Query input
    await homePage.fillSearchByQueryInput(dataHelper._searchibleWordFirst);

    //Check valid results are displayed and call to action text is missing
    await homePage.resultsAreDisplayed();
    await homePage.ctaTextIsNotVisible();
    expect(await homePage.getResultsText()).toContain(dataHelper._searchibleWordFirst);

    //Insert second word into Search By Query input
    await homePage.fillSearchByQueryInput(dataHelper._searchibleWordSecond);

    //Check valid results are displayed and call to action text is missing
    await homePage.resultsAreDisplayed();
    await homePage.ctaTextIsNotVisible();
    expect(await homePage.getResultsText()).toContain(dataHelper._searchibleWordSecond);

    //Clear Search By Query input
    await homePage.clearSearchByQueryInput();

    //Check results are not displayed and call to action text is appeared
    await homePage.resultsAreNotDisplayed();;
    await homePage.ctaTextIsVisible();
  });

  afterAll(async ()=> {
    await browser.quit();
  });



  // let page: BasePage;

  // beforeEach(() => {
  //   page = new BasePage();
  // });



  // // it('should display welcome message', () => {
  // //   page.navigateTo();
  // //   expect(page.getTitleText()).toEqual('verenia-test app is running!');
  // // });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
