import { $, $$, ElementArrayFinder, ElementFinder, browser, by, element } from "protractor";

import { BasePage } from "./basePage.po";
import { BrowserHelper } from '../helpers/browserHelper';
import { DataHelper } from '../helpers/dataHelper';
import { inflateRaw } from "zlib";

const browserHelper = new BrowserHelper();
const dataHelper = new DataHelper();


export class HomePage extends BasePage {

  public _filtersModule: ElementFinder;
  public _ctaText: ElementFinder;
  public _searchByQueryInput: ElementFinder;
  public _languageSelect: ElementFinder;
  public _listOfLanguages: ElementFinder;
  public _desiredLanguage: ElementFinder;
  public _addToFavoritesButton: ElementFinder;
  public _removeFromFavoritesButton: ElementFinder;
  public _results: ElementArrayFinder;
  public _resultTitles: ElementArrayFinder;
  public _resultLanguages: ElementArrayFinder;

  constructor() {
    super();
    this._filtersModule = element(by.xpath('//h3[text()="FILTERS"]//parent::mat-card'));
    this._ctaText = element(by.xpath(`//span[text()="${dataHelper._ctaText}"]`));
    this._searchByQueryInput = element(by.xpath('//input[@id="mat-input-0"]'));
    this._languageSelect = element(by.xpath('//mat-select[@role="listbox"]'));
    this._listOfLanguages = element(by.xpath('//div[@id="mat-select-0-panel"]'));
    this._desiredLanguage = element(by.xpath(`//mat-option//span[text()="${dataHelper._desiredLanguage}"]`));
    this._addToFavoritesButton = element(by.xpath('//app-favorite-btn[@ng-reflect-is-favorite = "false"]'));
    this._removeFromFavoritesButton = element(by.xpath('//app-favorite-btn[@ng-reflect-is-favorite = "true"]'));
    this._results = element.all(by.xpath('//mat-card[contains(@class,"repo-list__item")]'));
    this._resultTitles = element.all(by.xpath('//mat-card[contains(@class,"repo-list__item")]//span[@class="repo-list__name"]'))
    this._resultLanguages = element.all(by.xpath('//table[@class="repo-list__table"]//tr[1]//td'));
  };

  public async navigateToPage(): Promise<void> {
    await this.openPage(dataHelper._baseUrl)
  };

  public async isPageVisible(): Promise<void> {
    await this.isCorrectPageVisible(dataHelper._baseUrl, this._filtersModule, this._ctaText);
  };

  public async fillSearchByQueryInput(val: string): Promise<void> {
    await this.fillInput(this._searchByQueryInput, val)
  };

  public async selectDesiredLanguage(): Promise<void> {
    await this.selectItemInDropDownList(this._languageSelect, this._listOfLanguages, this._desiredLanguage);
  };

  public async resultsAreDisplayed(): Promise<void> {
    await this.elementsAreDisplayed(this._results);
  };

  public async resultsAreNotDisplayed(): Promise<void> {
    await this.elementsAreNotDisplayed(this._results);
  };

  public async getResultsTtitleText(): Promise<string> {
     return this._resultTitles.getText();
  };

  public async getResultsLanguageText(): Promise<string> {
    return this._resultLanguages.getText();
  };

  public async ctaTextIsVisible(): Promise<void> {
    await this.elementIsVisible(this._ctaText)
  };

  public async ctaTextIsNotVisible(): Promise<void> {
    await this.elementIsNotVisible(this._ctaText)
  };

  public async clearSearchByQueryInput(): Promise<void> {
    await this.clearInput(this._searchByQueryInput);
  };

  public async getTitleOfSearchedItem(index: number): Promise<string> {
    let item = await this._resultTitles.get[index];
    let title = await this.getText(item);
    return title;
  };

  public async clickAddToFavoritesButtonOfItem(index: number) : Promise<void> {
    let element = await this._results.get[index].element(this._addToFavoritesButton);
    await this.click(element);
  };

  public async addToFavoritesButtonIsDispalyed(index: number): Promise<void> {
    await this.buttonIsDisplayedInResultItem(this._results, index, this._addToFavoritesButton);
  };

  public async addToFavoritesButtonIsNotDispalyed(index: number): Promise<void> {
    await this.buttonIsNotDisplayedInResultItem(this._results, index, this._addToFavoritesButton);
  };

  public async removeFromFavoritesButtonIsDispalyed(index: number): Promise<void> {
    await this.buttonIsDisplayedInResultItem(this._results, index, this._removeFromFavoritesButton);
  };

  public async removeFromFavoritesButtonIsNotDispalyed(index: number): Promise<void> {
    await this.buttonIsNotDisplayedInResultItem(this._results, index, this._removeFromFavoritesButton);
  };
}
