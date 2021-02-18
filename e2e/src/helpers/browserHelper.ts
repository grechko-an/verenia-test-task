import {ElementArrayFinder, ElementFinder, browser, element, protractor} from 'protractor'

const EC = protractor.ExpectedConditions;
const timeout = 10000;

export class BrowserHelper {

    public async waitElementIsClikable(element: ElementFinder): Promise<void>{
      await browser.wait(EC.elementToBeClickable(element), timeout);
    };

    public async waitElementIsVisible(element: ElementFinder): Promise<void>{
      await browser.wait(EC.visibilityOf(element), timeout);
    };

    public async waitElementIsNotVisible(element: ElementFinder): Promise<void>{
      await browser.wait(EC.invisibilityOf(element), timeout);
  };

    public async waitElementsAreVisible(elements: ElementArrayFinder): Promise<void>{
      await elements.all(element).each(function(element){
            browser.wait(EC.visibilityOf(element), timeout);
      });
    };

    public async waitElementsAreNotVisible(elements: ElementArrayFinder): Promise<void>{
      await elements.all(element).each(function(element){
           browser.wait(EC.invisibilityOf(element), timeout);
      });
    };


    public async waitUrlIsCorrect(url: string): Promise<void>{
      await browser.wait(EC.urlContains(url), timeout);
    };

    public async waitAlertIsDisplayed(): Promise<void>{
      await browser.wait(protractor.ExpectedConditions.alertIsPresent(), timeout);
  };


}
