import * as puppeteer from 'puppeteer';
import { Animal } from './animal';
import { Distance } from './distance';

export class InternatDyrClient {

  private constructor(private browser: puppeteer.Browser, private page: puppeteer.Page) {
  }

  static async initialize(width: number = 1280, height: number = 800): Promise<InternatDyrClient> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: width, height: height});
    return Promise.resolve(new InternatDyrClient(browser, page));
  }

  async acceptCookies() {
    await this.page.evaluate(() => {
      const cookieButton = <HTMLButtonElement>document.querySelector('.cookie.alert.alert-info button');
      if (cookieButton != null) {
        cookieButton.click();
      }

      const cookieDiv = <HTMLDivElement>document.querySelector('.cookie-wrap');
      if (cookieDiv != null) {
        cookieDiv.remove();
      }
    });
  }

  async search(zip: number, species: Animal[], distance: Distance) {
    await this.page.goto("https://internat-dyr.dk/index/");

    await this.page.type('#postal', zip.toString());
    await this.page.evaluate((distance: Distance, species: Animal[]) => {
      species.forEach(speciesId => {
        const speciesElement = <HTMLAnchorElement>document.querySelector('[data-original-index="'+speciesId+'"] a');
        if (speciesElement != null) {
          speciesElement.click();
        }
      })
      const distanceElement = <HTMLOptionElement>document.querySelector('select#distance option[value="'+distance+'"]');
      if (distanceElement != null) {
        distanceElement.selected = true;
      }
    }, distance, species);

    await this.page.click('#search-zip button[type="submit"]');
    await this.page.waitForNavigation();
  }

  async loadMoreResults(timeInMillisecondsToWaitForResponse: number = 1000) {
    const rowsBeforeLoadingMore = await this.page.evaluate(() => document.querySelectorAll('#animallist .row').length);
    await this.page.evaluate(() => {
      const loadMoreButton = <HTMLButtonElement>document.querySelector('#load-more');
      if (loadMoreButton != null) {
        loadMoreButton.click();
      }
    });
    await this.page.waitFor(timeInMillisecondsToWaitForResponse);
    const rowsAfterLoadingMore = await this.page.evaluate(() => document.querySelectorAll('#animallist .row').length);
    return rowsAfterLoadingMore - rowsBeforeLoadingMore;
  }

  async screenshot(path: string, fullPage: boolean) {
    await this.page.screenshot({path: path, fullPage: fullPage})
  }
}