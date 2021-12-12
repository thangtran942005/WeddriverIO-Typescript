/* eslint-disable import/no-unresolved */
import { uiButton, uiRadio, uiMenu, uiTextbox } from './controls';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    get lblDiscount() {
        return $('h2[data-test-discount]');
    }

    get lblCategory() {
        return $(`#challenge-2-category`);
    }

    get lblGiftCode() {
        return $(`h6[data-test-gift-code]`);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('');
    }

    async takeTheChallengeDiscount() {
        await uiButton('TAKE THE CHALLENGE').click();
        await this.selectChallenge('1. Find the discount');
        const iDiscount = await this.getNumberValue(this.lblDiscount);
        await uiRadio(`${iDiscount}%`).click();
        await uiButton('CHECK').click();
    }

    async takeTheChallengeNewArrivals() {
        await this.selectChallenge('2. Count the products');
        const strCategory = await this.lblCategory.getText();
        await uiButton(strCategory).click();
        const iTotalProduct = await this.listProduct.length;
        await uiRadio(iTotalProduct).click();
        await uiButton('CHECK').click();
    }

    async takeTheChallengeRevealTheDeal() {
        await this.selectChallenge('3. Reveal the deal');
        await uiButton('Reveal the deal').click();
        let strGiftCode = await this.lblGiftCode.getText();
        strGiftCode = strGiftCode.split('"')[1];
        await uiTextbox(
            `Scroll down to Deal of The Week, click on REVEAL THE DEAL, copy the code, then paste it here.`
        ).setValue(strGiftCode);
        await uiButton('CHECK').click();
    }

    async takeTheChallengeProducts() {
        await this.selectChallenge('4. Shop now');
        await uiMenu('Products').click();
        await uiButton('CHECK').click();
    }
}

export default new HomePage();
