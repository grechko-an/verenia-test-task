import { $, $$, ElementArrayFinder, ElementFinder, browser, by, element } from "protractor";

import { BasePage } from "./basePage.po";
import { BrowserHelper } from '../helpers/browserHelper';
import { DataHelper } from '../helpers/dataHelper';

const browserHelper = new BrowserHelper();
const dataHelper = new DataHelper();


export class FavoritesPage extends BasePage {

  public _favorites: ElementArrayFinder;
  public _removeFromFavoritesButton: ElementFinder;

  constructor() {
    super();
    this._favorites = element.all(by.xpath('//mat-card[contains(@class,"repo-list__item")]'));
    this._removeFromFavoritesButton = element(by.xpath('//app-favorite-btn[@ng-reflect-is-favorite = "true"]'));
  };

  public async isPageVisible(): Promise<void> {
    await this.isCorrectPageVisible(dataHelper._favoritesPageUrl);
  };

  public async pageUrlCorect() : Promise<void> {
    await this.urlIsCorrect(dataHelper._favoritesPageUrl);
  };

  public async handlePageAlertWithValidPassword(): Promise<void> {
    await this.handleAlert(dataHelper._validPassword);
  };

  public async handlePageAlertWithInvalidPassword(): Promise<void> {
    await this.handleAlert(dataHelper._invalidPassword);
  };

  public async promptIsDisplayed(): Promise<void> {
    await this.alertIsDisplayed();
  };

  public async getNumberOfFavoriteItems(): Promise<number> {
    let number = await this._favorites.length;
    return number;
  }

  public async getTitleOfFavoriteItem(index: number): Promise<string> {
    let item = await this._favorites.get[index];
    let title = await this.getText(item);
    return title;
  };

  public async favoritesItemsAreDisplayed(): Promise<void> {
    await this.elementsAreDisplayed(this._favorites);
  }

  public async removeFromFavoritesButtonIsDispalyed(index: number): Promise<void> {
    await this.buttonIsDisplayedInResultItem(this._favorites, index, this._removeFromFavoritesButton);
  }

  public async clickRemoveFromFavoritesButtonOfItem(index: number): Promise<void> {
    let element = await this._favorites.get[index].element(this._removeFromFavoritesButton);
    await this.click(element);
  }

  public async favoritesItemsAreNotDisplayed(): Promise<void> {
    await this.elementsAreNotDisplayed(this._favorites);
  }
}
