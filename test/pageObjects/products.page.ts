import { uiButton, uiTextbox, uiCheckbox } from './controls';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ProductsPage extends Page {
    get lblRange() {
        return $('p[data-test-range]');
    }

    get sldPriceRange() {
        return $(`span[data-test-slider]`);
    }

    get sldMin() {
        return $('span[role=slider][data-index="0"]');
    }

    get sldMax() {
        return $('span[role=slider][data-index="1"]');
    }

    get lnkGoPage() {
        return $('(//ul/li/button)[last()-1]');
    }

    get lblCategory() {
        return $('#challenge-7-category');
    }

    get lblSize() {
        return $('#challenge-7-size');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('products');
    }

    async selectSliderValue(element, value: number) {
        await element.click();
        let strCurrentValue = await element.getAttribute('aria-valuenow');
        let iCurrentValue = parseInt(strCurrentValue);
        if (value >= iCurrentValue) {
            for (let i = 1; i <= value - iCurrentValue; i++) {
                await browser.keys('ArrowRight');
            }
        } else {
            for (let j = 1; j <= iCurrentValue - value; j++) {
                await browser.keys('ArrowLeft');
            }
        }
    }

    async setPriceValue(minPrice: number, maxPrice: number) {
        await this.sldPriceRange.dragAndDrop({ x: -100, y: 0 });
        await this.selectSliderValue(this.sldMax, maxPrice);
        await this.selectSliderValue(this.sldMin, minPrice);
    }

    async addToCart(index: number) {
        const product = this.listProduct[index];
        await product.scrollIntoView();
        await browser.pause(200);
        await product.moveTo();
        await this.btnAddCart.waitForClickable({ timeout: 3000 });
        await this.btnAddCart.click();
        await this.btnAddToCart.click();
        await browser.keys('Escape');
    }

    async addAllProductsToCart() {
        const iTotalProduct = await this.listProduct.length;
        for (let i = 0; i < iTotalProduct; i++) {
            await this.addToCart(i);
        }
    }

    async takeTheChallengePriceFilter() {
        await this.selectChallenge('5. Change the price filter');
        const iMinPrice = await this.getNumberValue(this.lblMinPrice);
        const iMaxPrice = await this.getNumberValue(this.lblMaxPrice);
        // Change Min and Max Price value
        await this.setPriceValue(iMinPrice, iMaxPrice);
        // Get total Products
        let iTotalProduct = await this.listProduct.length;
        const strTotalPage = await this.lnkGoPage.getProperty('textContent');

        // Count next page if have
        if (strTotalPage !== '') {
            const iTotalPage = parseInt(strTotalPage);
            iTotalProduct *= iTotalPage - 1;
            await this.lnkGoPage.click();
            const iLastestPage = await this.listProduct.length;
            iTotalProduct += iLastestPage;
        }
        // Set total Products
        await uiTextbox(`How many products are there ?`).setValue(iTotalProduct);
        await uiButton('CHECK').click();
    }

    async takeTheChallengeAddCart() {
        await this.selectChallenge('6. Add to cart');
        // Count next page if have
        const strTotalPage = await this.lnkGoPage.getProperty('textContent');
        // Add All Products to Cart
        await this.addAllProductsToCart();
        if (strTotalPage !== '') {
            // Multiple pages
            const iTotalPage = parseInt(strTotalPage) - 1;
            for (let i = iTotalPage; i > 0; i--) {
                await $(`button[aria-label="Go to page ${i}"]`).click();
                await this.addAllProductsToCart();
            }
        }
        await uiButton('CHECK').click();
    }

    async takeTheChallengesSuiableProducts() {
        await this.selectChallenge('7. Find the suiable products');
        // Get products challenge
        const strCategory = await this.lblCategory.getText();
        const strSize = await this.lblSize.getText();
        const iMinPrice = await this.getNumberValue(this.lblMinPrice);
        const iMaxPrice = await this.getNumberValue(this.lblMaxPrice);
        // Select products information
        await this.lblCategory.dragAndDrop({ x: 300, y: 0 });
        await uiCheckbox(strCategory).click({ force: true });
        await uiCheckbox(strSize).click({ force: true });
        await this.setPriceValue(iMinPrice, iMaxPrice);
        await this.lblCategory.dragAndDrop({ x: -300, y: 0 });
        await uiButton('CHECK').click();
    }
}

export default new ProductsPage();
