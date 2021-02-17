import { $, $$, ElementArrayFinder, ElementFinder, browser, by, element } from "protractor";

import { BasePage } from "./basePage.po";
import { BrowserHelper } from '../helpers/browserHelper';
import { DataHelper } from '../helpers/dataHelper';

const browserHelper = new BrowserHelper();
const dataHelper = new DataHelper();


export class FavoritesPage extends BasePage {

  public _page: ElementFinder;

  constructor() {
    super();
    this._page = element(by.xpath('//div[@id="main-wrapper"]'));

  };

  public async isPageVisible(): Promise<void> {
    await this.isCorrectPageVisible(dataHelper._favoritesPageUrl);
  };

}
