const HomePage = require('../pageObjects/home.page')
const ProductsPage = require('../pageObjects/products.page')

describe('Take the challenge', () => {
    it('Take the challenge 1: Discount', async () =>{
        await HomePage.open()
        await HomePage.takeTheChallengeDiscount()
        await expect(HomePage.lbl_CheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge 2: Arrivals', async () =>{
        await HomePage.takeTheChallengeNewArrivals()
        await expect(HomePage.lbl_CheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge 3: Reveal The Deal', async () =>{
        await HomePage.takeTheChallengeRevealTheDeal()
        await expect(HomePage.lbl_CheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge 4: Products page', async () =>{
        await HomePage.takeTheChallengeProducts()
        await expect(ProductsPage.lbl_CheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge 5: Price filter', async () =>{
        await ProductsPage.takeTheChallengePriceFilter()
        await expect(ProductsPage.lbl_CheckResult).toHaveText('Your answer is correct!')
    })
})