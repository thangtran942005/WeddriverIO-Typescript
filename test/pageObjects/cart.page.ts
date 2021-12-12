import { uiButton } from './controls';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    get lblSubtotal() {
        return $('#subtotal-price');
    }

    get btnRemove() {
        return $(`(//button[@data-test-remove])[1]`);
    }

    get btnMinus() {
        return $(`(//button[@data-test-minus])[1]`);
    }

    get btnAdd() {
        return $(`(//button[@data-test-add])[1]`);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('cart');
    }

    async takeTheChallengeUpdateCart() {
        await this.selectChallenge('8. Update the cart');
        await this.btnCart.click();
        await this.lblSubtotal.scrollIntoView(false);
        let iSubtotal = await this.getNumberValue(this.lblSubtotal);
        const iMinPrice = await this.getNumberValue(this.lblMinPrice);
        const iMaxPrice = await this.getNumberValue(this.lblMaxPrice);
        // Update Subtotal value
        await this.btnAdd.scrollIntoView(false);
        while (iSubtotal > iMaxPrice) {
            await this.btnRemove.click();
            browser.pause(200);
            iSubtotal = await this.getNumberValue(this.lblSubtotal);
        }
        while (iSubtotal < iMinPrice) {
            await this.btnAdd.click();
            browser.pause(200);
            iSubtotal = await this.getNumberValue(this.lblSubtotal);
        }
        await uiButton('CHECK').click();
    }
}

export default new CartPage();
