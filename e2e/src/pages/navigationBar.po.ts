import { ElementFinder, by, element } from "protractor";

import { BasePage } from "./basePage.po";
import { BrowserHelper } from '../helpers/browserHelper';

const browserHelper = new BrowserHelper();

export class NavigationBar extends BasePage {

  public _bar: ElementFinder;
  public _homeButton: ElementFinder;
  public _favoritesButton: ElementFinder;

  constructor() {
    super();
    this._bar = element(by.xpath('//nav'));
    this._homeButton = element(by.xpath('//a[text()="Home"]'));
    this._favoritesButton = element(by.xpath('//a[text()="Favorites"]'));
  };

  public async isBarVisible(): Promise<void> {
    await browserHelper.waitElementIsVisible(this._bar);
    await browserHelper.waitElementIsVisible(this._homeButton);
    await browserHelper.waitElementIsVisible(this._favoritesButton);
  };

  public async clickHomeButton(): Promise<void> {
    await this.click(this._homeButton);
  };

  public async clickFavoritesButton(): Promise<void> {
    await this.click(this._favoritesButton);
  };
}
