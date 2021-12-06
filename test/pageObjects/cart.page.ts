import { uiButton } from "./controls"
import Page from './page'

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class CartPage extends Page {

    get lblSubtotal () { return $('#subtotal-price')}

    get btnRemove () { return $(`(//button[@data-test-remove])[1]`)}

    get btnMinus () { return $(`(//button[@data-test-minus])[1]`)}

    get btnAdd () { return $(`(//button[@data-test-add])[1]`)}
    

    /**
     * overwrite specific options to adapt it to page object
     */
     open () {
        return super.open('cart');
    }

    async takeTheChallengeUpdateCart () {
        await this.selectChallenge("8. Update the cart")
        await this.btnCart.click()
        await this.lblSubtotal.scrollIntoView(false)
        let iSubtotal = await this.getNumberValue(this.lblSubtotal)
        let iMinPrice = await this.getNumberValue(this.lblMinPrice)
        let iMaxPrice = await this.getNumberValue(this.lblMaxPrice)
        // Update Subtotal value
        while (iSubtotal > iMaxPrice) {
            await this.btnRemove.scrollIntoView()
            await this.btnRemove.click()
            browser.pause(500)
            iSubtotal = await this.getNumberValue(this.lblSubtotal)
        }
        while (iSubtotal < iMinPrice) {
            await this.btnAdd.click()
            browser.pause(500)
            iSubtotal = await this.getNumberValue(this.lblSubtotal)
        }
        await uiButton('CHECK').click()
    }
 }

export default new CartPage()