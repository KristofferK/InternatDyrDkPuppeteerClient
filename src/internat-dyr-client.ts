import * as puppeteer from 'puppeteer';
import { Animal } from './animal';

export class InternatDyrClient {

  private constructor(private browser: puppeteer.Browser, private page: puppeteer.Page) {
  }

  static async initialize(width: number = 1280, height: number = 800): Promise<InternatDyrClient> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({width: width, height: height});
    return Promise.resolve(new InternatDyrClient(browser, page));
  }

  async search(zip: number, species: Animal[], distance: number) {
    await this.page.goto("https://internat-dyr.dk/index/");

    await this.page.type('#postal', zip.toString());
    await this.page.evaluate((distance: number, species: number[]) => {
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

  async screenshot(path: string, fullPage: boolean) {
    await this.page.screenshot({path: path, fullPage: fullPage})
  }
}