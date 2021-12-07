import { expect } from 'chai';
import HomePage from '../pageObjects/home.page';
import ProductsPage from '../pageObjects/products.page';
import CartPage from '../pageObjects/cart.page';

describe('Take the challenge', () => {
    it('Take the challenge: 1. Find the discount', async () => {
        HomePage.open();
        await HomePage.takeTheChallengeDiscount();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });

    it('Take the challenge: 2. Count the products', async () => {
        await HomePage.takeTheChallengeNewArrivals();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });

    it('Take the challenge: 3. Reveal the deal', async () => {
        await HomePage.takeTheChallengeRevealTheDeal();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });

    it('Take the challenge: 4. Shop now', async () => {
        await HomePage.takeTheChallengeProducts();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });

    it('Take the challenge: 5. Change the price filter', async () => {
        await ProductsPage.takeTheChallengePriceFilter();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });

    it('Take the challenge: 6. Add to cart', async () => {
        await ProductsPage.takeTheChallengeAddCart();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });

    it('Take the challenge: 7. Find the suiable products', async () => {
        await ProductsPage.takeTheChallengesSuiableProducts();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });

    it('Take the challenge: 8. Update the cart', async () => {
        await CartPage.takeTheChallengeUpdateCart();
        expect(await HomePage.getCheckResult()).to.equal(
            'Your answer is correct!'
        );
    });
});
