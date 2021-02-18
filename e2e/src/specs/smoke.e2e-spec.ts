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
    //Open Home page and check visibility of main elements
    await homePage.navigateToPage();
    await navigationBar.isBarVisible();
    await homePage.isPageVisible();
  });

  xit('Should navigate between pages', async () => {
    // Navigate to Favorites page
    await navigationBar.clickFavoritesButton();
    // Handle alert with invalid password
    await favoritesPage.promptIsDisplayed();
    await favoritesPage.handlePageAlertWithInvalidPassword();
    // Check opened page
    await navigationBar.isBarVisible();
    await homePage.isPageVisible();
    // Navigate to Favorites page once again
    await navigationBar.clickFavoritesButton();
    // Handle alert with valid password
    await favoritesPage.promptIsDisplayed();
    await favoritesPage.handlePageAlertWithValidPassword();
    // Check opened page
    await navigationBar.isBarVisible();
    await favoritesPage.pageUrlCorect();
    // Navigate back to Home page
    await navigationBar.clickHomeButton();
    // Check opened page
    await navigationBar.isBarVisible();
    expect (await homePage.isPageVisible()).toBeTrue;
  });

  xit('Should search using Search By Query functionality', async () => {
    //Insert first word into Search By Query input
    await homePage.fillSearchByQueryInput(dataHelper._searchibleWordFirst);
    //Check valid results are displayed and call to action text is missing
    await homePage.resultsAreDisplayed();
    await homePage.ctaTextIsNotVisible();
    expect(await homePage.getResultsTtitleText()).toContain(dataHelper._searchibleWordFirst);
    //Insert second word into Search By Query input
    await homePage.fillSearchByQueryInput(dataHelper._searchibleWordSecond);
    //Check valid results are displayed and call to action text is missing
    await homePage.resultsAreDisplayed();
    await homePage.ctaTextIsNotVisible();
    expect(await homePage.getResultsTtitleText()).toContain(dataHelper._searchibleWordSecond);
    //Clear Search By Query input
    await homePage.clearSearchByQueryInput();
    //Check results are not displayed and call to action text is appeared
    await homePage.resultsAreNotDisplayed();
    await homePage.ctaTextIsVisible();
  });

  xit('Should search with addition Language filter functionality', async () => {
    //Insert first word into Search By Query input
    await homePage.fillSearchByQueryInput(dataHelper._searchibleWordThird);
    //Check results are displayed and call to action text is missing
    await homePage.resultsAreDisplayed();
    await homePage.ctaTextIsNotVisible();
    //select language via appropriate filter
    await homePage.selectDesiredLanguage();
    // Check are results valid after filtering
    expect(await homePage.getResultsTtitleText()).toContain(dataHelper._searchibleWordThird);
    expect(await homePage.getResultsLanguageText()).toContain(dataHelper._desiredLanguage);
  });

  it('Should add and delete filtered item to/from Favorites page ', async () => {
    //Insert first word into Search By Query input
    await homePage.fillSearchByQueryInput(dataHelper._searchibleWordThird);
    //Check results are displayed and call to action text is missing
    await homePage.resultsAreDisplayed();
    await homePage.ctaTextIsNotVisible();
    //Press Add To Favorites button of the first searched item
    await homePage.addToFavoritesButtonIsDispalyed(dataHelper._indexOfFirstButton);
    await homePage.clickAddToFavoritesButtonOfItem(dataHelper._indexOfFirstButton);
    await homePage.addToFavoritesButtonIsNotDispalyed(dataHelper._indexOfFirstButton);
    await homePage.removeFromFavoritesButtonIsDispalyed(dataHelper._indexOfFirstButton);
    // Get title of the first searched item
    let itemTitleOnHomePageBefore: string = await homePage.getTitleOfSearchedItem(dataHelper._indexOfFirstButton);
    // Navigate to Favorites page
    await navigationBar.clickFavoritesButton();
    // Handle alert with valid password
    await favoritesPage.promptIsDisplayed();
    await favoritesPage.handlePageAlertWithValidPassword();
    // Check opened Favorites page
    await navigationBar.isBarVisible();
    await favoritesPage.pageUrlCorect();
    await favoritesPage.favoritesItemsAreDisplayed();
    // Check number of favorite items
    expect(favoritesPage.getNumberOfFavoriteItems()).toEqual(dataHelper._numberOfAddedToFavoritesItems);
    // Check title of favorite item
    let itemTitleOnFavoritesPage: string = await favoritesPage.getTitleOfFavoriteItem(dataHelper._indexOfFirstItem);
    expect(itemTitleOnFavoritesPage).toEqual(itemTitleOnHomePageBefore);
    // Check favorite item has Remove From Favorites button
    await favoritesPage.removeFromFavoritesButtonIsDispalyed(dataHelper._indexOfFirstButton);
    // Press Remove From Favorites button
    await favoritesPage.clickRemoveFromFavoritesButtonOfItem(dataHelper._indexOfFirstButton);
    // Check Favorites page does not contain any Favorites item
    await favoritesPage.favoritesItemsAreNotDisplayed();
    // Navigate back to the Home page
    await navigationBar.clickHomeButton();
    // Check item which was added to favorites previously
    await homePage.removeFromFavoritesButtonIsNotDispalyed(dataHelper._indexOfFirstButton);
    await homePage.addToFavoritesButtonIsDispalyed(dataHelper._indexOfFirstButton);
    let itemTitleOnHomePageAfter: string = await homePage.getTitleOfSearchedItem(dataHelper._indexOfFirstButton);
    expect(itemTitleOnHomePageAfter).toEqual(itemTitleOnHomePageBefore);
  });

  afterAll(async ()=> {
    await browser.quit();
  });

});
