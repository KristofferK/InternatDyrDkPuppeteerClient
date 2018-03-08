import * as puppeteer from 'puppeteer';

const search = async(page: puppeteer.Page, zip: number, species: number[], distance: number) => {
    await page.goto("https://internat-dyr.dk/index/");

    await page.type('#postal', zip.toString());
    await page.evaluate((distance: number, species: number[]) => {
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

    await page.click('#search-zip button[type="submit"]');
    await page.waitForNavigation();
}

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width:1280, height:800});
    await search(page, 5000, [4,5], 50);

    
    await page.screenshot({path:'ss.jpg',fullPage:true})
})();