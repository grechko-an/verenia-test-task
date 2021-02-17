import { ElementArrayFinder, ElementFinder, browser, by, element, protractor } from 'protractor';

import { BrowserHelper } from '../helpers/browserHelper';

const browserHelper = new BrowserHelper();

export class BasePage {

  public async openPage(url: string): Promise<void> {
    await browser.get(url);
  };

  public async isCorrectPageVisible(urlPart: string, element1?: ElementFinder, element2?: ElementFinder): Promise<void> {
    await browserHelper.waitUrlIsCorrect(urlPart);
    await browserHelper.waitElementIsVisible(element1);
    await browserHelper.waitElementIsVisible(element2);
  };


  public async click(element: ElementFinder): Promise<void> {
    await browserHelper.waitElementIsClikable(element);
    await element.click();
  };

  public async fillInput(element: ElementFinder, val: string | number): Promise<void> {
    this.click(element);
    await element.clear();
    await element.sendKeys(val);
  };

  public async selectItemInDropDownList(input: ElementFinder, list: ElementFinder, item: ElementFinder): Promise<void>{
    await this.click(input);
    await browserHelper.waitElementIsVisible(list);
    await this.click(item);
  };

  public async getText(element: ElementFinder): Promise<string> {
    let text = await element.getText();
    return text;
  };

  public async elementsAreDisplayed (elements: ElementArrayFinder): Promise<void> {
    await browserHelper.waitElementsAreVisible(elements);
  };

  public async elementsAreNotDisplayed (elements: ElementArrayFinder): Promise<void> {
    await browserHelper.waitElementsAreNotVisible(elements);
  };

  public async elementIsVisible(element: ElementFinder): Promise<void> {
    await browserHelper.waitElementIsVisible(element);
  };

  public async elementIsNotVisible(element: ElementFinder): Promise<void> {
    await browserHelper.waitElementIsNotVisible(element);
  };

  public async clearInput (element: ElementFinder): Promise<void> {
    // element.clear();
    await element.click();
    for (let i = 0; i < 4; i++) {
      await element.sendKeys(protractor.Key.BACK_SPACE);
  }
  }

  // navigateTo(): Promise<unknown> {
  //   return browser.get(browser.baseUrl) as Promise<unknown>;
  // }

  // getTitleText(): Promise<string> {
  //   return element(by.css('app-root .content span')).getText() as Promise<string>;
  // }
}
