export default class Page {

    get listProduct () { return $$("//div[starts-with(@class,'MuiContainer-root')]/div//a//img")}

    get lblCheckResult () { return $('div[data-test-check-result] p') }

    get btnAddCart () { return $(`button[data-test-cart-button]`) }

    get btnAddToCart () { return $(`button[data-test-add-to-cart]`) }

    get lblMinPrice () { return $('span[data-test-min-price]')}

    get lblMaxPrice () { return $('span[data-test-max-price]')}

    get btnShowAllChallenges () { return $(`button[data-test-show-all-challenges]`)}

    get btnMinimize() { return $(`button[data-test-minimize]`)}

    get btnMaximize () { return $(`button[data-test-maximize]`)}

    get btnCart () { return $(`#cart-button`)}

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        browser.url(`/${path}`)
        browser.maximizeWindow()
    }

    async selectChallenge (challenge) {
        await this.btnShowAllChallenges.click()
        await $(`//p[text()="${challenge}"]`).click()
    }

    async getNumberValue(element) { 
        let strText = await element.getText()
        return parseInt(strText.replace(/[^0-9]/g, ''))
    }

}