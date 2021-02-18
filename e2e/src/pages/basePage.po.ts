import { ElementArrayFinder, ElementFinder, browser, by, element, protractor } from 'protractor';

import { BrowserHelper } from '../helpers/browserHelper';

const browserHelper = new BrowserHelper();

export class BasePage {

  public async openPage(url: string): Promise<void> {
    await browser.get(url);
  };

  public async isCorrectPageVisible(url: string, element1?: ElementFinder, element2?: ElementFinder): Promise<void> {
    await browserHelper.waitUrlIsCorrect(url);
    await browserHelper.waitElementIsVisible(element1);
    await browserHelper.waitElementIsVisible(element2);
  };

  public async urlIsCorrect(url: string): Promise<void> {
    await browserHelper.waitUrlIsCorrect(url);
  }

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

  // Clear() method does not work so I had to awoid this with another approach
  public async clearInput (element: ElementFinder): Promise<void> {
    // element.clear();
    await element.click();
    for (let i = 0; i < 4; i++) {
      await element.sendKeys(protractor.Key.BACK_SPACE);
    }
  };

  public async alertIsDisplayed(): Promise<void> {
    await browserHelper.waitAlertIsDisplayed();
  };

  public async handleAlert(password: string) : Promise<void> {
    await browser.waitForAngularEnabled(true);
    await browser.switchTo().alert().then(function (alert) {
       alert.sendKeys(password);
       alert.accept();
     });
  }

  public async buttonIsDisplayedInResultItem(elements: ElementArrayFinder, index: number, button: ElementFinder): Promise<void> {
    let element: ElementFinder = await elements.get(index).element(button);
    browserHelper.waitElementIsVisible(element);
  }

  public async buttonIsNotDisplayedInResultItem(elements: ElementArrayFinder, index: number, button: ElementFinder): Promise<void> {
    let element: ElementFinder = await elements.get(index).element(button);
    browserHelper.waitElementIsNotVisible(element);
  }

}
