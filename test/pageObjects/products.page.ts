import { uiButton, uiTextbox, uiCheckbox } from "./controls"
import Page from './page'

/**
 * sub page containing specific selectors and methods for a specific page
 */
 class ProductsPage extends Page {

    get lblRange () { return $('p[data-test-range]')}

    get sldPriceRange () { return $(`span[data-test-slider]`)}

    get sldMin () { return $('span[role=slider][data-index="0"]')}

    get sldMax () { return $('span[role=slider][data-index="1"]')}

    get lnkGoPage () { return $('(//ul/li/button)[last()-1]')}

    get lblCategory () { return $('#challenge-7-category')}

    get lblSize () { return $('#challenge-7-size')}
    

    /**
     * overwrite specific options to adapt it to page object
     */
     open () {
        return super.open('products');
    }

    async setPriceValue (element, value) {
        await element.click()
        let iCurrentValue = await element.getAttribute('aria-valuenow')
        iCurrentValue = parseInt(iCurrentValue)
        if(value >= iCurrentValue) {
            for(let i=1 ; i<=value - iCurrentValue; i++){
                await browser.keys('ArrowRight') 
            }
        } else {
            for(let j=1 ; j<=iCurrentValue - value; j++){
                await browser.keys('ArrowLeft')
            } 
        }
         iCurrentValue = await element.getAttribute('aria-valuenow')
    }

    async addToCart (index) {
        const product = this.listProduct[index]
        await product.scrollIntoView()
        await browser.pause(500)
        await product.moveTo()
        await this.btnAddCart.waitForClickable({ timeout: 3000 })
        await this.btnAddCart.click()
        await this.btnAddToCart.click()
        await browser.keys('Escape')
    }

    async addAllProductsToCart () {
        let iTotalProduct = await this.listProduct.length
        for(let i=0; i<iTotalProduct; i++) {
            await this.addToCart(i)
        }
    }

    async takeTheChallengePriceFilter () {
        await this.selectChallenge("5. Change the price filter")
        let iMinPrice = await this.getNumberValue(this.lblMinPrice)
        let iMaxPrice = await this.getNumberValue(this.lblMaxPrice)
        // Move to Slider and change Min and Max value
        await this.sldMin.dragAndDrop({x:5, y:5})
        await this.setPriceValue(this.sldMax, iMaxPrice)
        await this.setPriceValue(this.sldMin, iMinPrice)
        // Get total Products
        let iTotalProduct = await this.listProduct.length
        let strTotalPage = await this.lnkGoPage.getProperty('textContent')
        
        // Count next page if have
        if(strTotalPage != '') {
            let iTotalPage = parseInt(strTotalPage)
            iTotalProduct = iTotalProduct*(iTotalPage-1)
            await this.lnkGoPage.click()
            let iLastestPage = await this.listProduct.length
            iTotalProduct = iTotalProduct + iLastestPage
        }
        // Set total Products
        await uiTextbox(`How many products are there ?`).setValue(iTotalProduct)
        await uiButton('CHECK').click()
    }

    async takeTheChallengeAddCart () {
        await this.selectChallenge("6. Add to cart")
        // Count next page if have
        let strTotalPage = await this.lnkGoPage.getProperty('textContent')
        // Add All Products to Cart
        await this.addAllProductsToCart()
        if(strTotalPage != '') { // Multiple pages
            let iTotalPage = parseInt(strTotalPage) - 1
            for(let i=iTotalPage ; i>0; i--){
                await $(`button[aria-label="Go to page ${i}"]`).click()
                await this.addAllProductsToCart()
            }
        }
        await uiButton('CHECK').click()
    }

    async takeTheChallengesSuiableProducts () {
        await this.selectChallenge("7. Find the suiable products")
        // Get products challenge
        let strCategory = await this.lblCategory.getText()
        let strSize = await this.lblSize.getText()
        let iMinPrice = await this.getNumberValue(this.lblMinPrice)
        let iMaxPrice = await this.getNumberValue(this.lblMaxPrice)
        // Select products information
        await this.btnMinimize.dragAndDrop(await this.btnCart)
        await uiCheckbox(strCategory).scrollIntoView(false)
        await uiCheckbox(strCategory).click()
        await uiCheckbox(strSize).click()
        await this.sldMin.dragAndDrop({x:5, y:5})
        await this.setPriceValue(this.sldMin, 50)
        await this.setPriceValue(this.sldMax, iMaxPrice)
        await this.setPriceValue(this.sldMin, iMinPrice)
        await this.btnShowAllChallenges.dragAndDrop(await this.sldMin)
        await this.btnMaximize.click()
        await uiButton('CHECK').click()
    }    
 }

export default new ProductsPage()