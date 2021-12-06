import HomePage from "../pageObjects/home.page"
import ProductsPage from "../pageObjects/products.page"
import CartPage from "../pageObjects/cart.page"

describe('Take the challenge', () => {
    it('Take the challenge: 1. Find the discount', async () => {
        HomePage.open()
        await HomePage.takeTheChallengeDiscount()
        await expect(HomePage.lblCheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge: 2. Count the products', async () => {
        await HomePage.takeTheChallengeNewArrivals()
        await expect(HomePage.lblCheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge: 3. Reveal the deal', async () => {
        await HomePage.takeTheChallengeRevealTheDeal()
        await expect(HomePage.lblCheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge: 4. Shop now', async () => {
        await HomePage.takeTheChallengeProducts()
        await expect(ProductsPage.lblCheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge: 5. Change the price filter', async () => {
        await ProductsPage.takeTheChallengePriceFilter()
        await expect(ProductsPage.lblCheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge: 6. Add to cart', async () => {
        await ProductsPage.takeTheChallengeAddCart()
        await expect(ProductsPage.lblCheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge: 7. Find the suiable products', async () => {
        await ProductsPage.takeTheChallengesSuiableProducts()
        await expect(ProductsPage.lblCheckResult).toHaveText('Your answer is correct!')
    })

    it('Take the challenge: 8. Update the cart', async () => {
        await CartPage.takeTheChallengeUpdateCart()
        await expect(CartPage.lblCheckResult).toHaveText('Your answer is correct!')
    })
})