import ManagePage from "../pages/ManagePage";
import { test, expect } from '@playwright/test';

test.describe('Login Test - URL Edge Cases', () => {

    let mp: ManagePage;

    test.beforeEach(({page}) => {
        mp = new ManagePage(page);
    })

    // Edge case 1: Standard login URL
    test('Login with standard URL path (/login)', async() => {
        await mp.loginPage.goToUrlEdgeCase('/login');
        await mp.loginPage.loginWithCreds('tomsmith', 'SuperSecretPassword!');
        await mp.loginPage.assertSuccessLogin();
    })

    // Edge case 2: Login URL with trailing slash - should fail (404)
    test('Login with trailing slash returns 404', async() => {
        const response = await mp.loginPage.goToUrlAndCheckStatus('/login/');
        expect(response).toBe(404);
    })

    // Edge case 3: Login URL with uppercase - should fail (404 - case sensitive)
    test('Login with uppercase URL returns 404', async() => {
        const response = await mp.loginPage.goToUrlAndCheckStatus('/Login');
        expect(response).toBe(404);
    })

    // Edge case 4: Login URL with query parameters - should work
    test('Login with query parameters in URL', async() => {
        await mp.loginPage.goToUrlEdgeCase('/login?redirect=secure_area');
        await mp.loginPage.loginWithCreds('tomsmith', 'SuperSecretPassword!');
        await mp.loginPage.assertSuccessLogin();
    })

    // Edge case 5: Login URL with multiple query parameters
    test('Login with multiple query parameters', async() => {
        await mp.loginPage.goToUrlEdgeCase('/login?user=test&ref=automation&lang=en');
        await mp.loginPage.loginWithCreds('tomsmith', 'SuperSecretPassword!');
        await mp.loginPage.assertSuccessLogin();
    })

    // Bonus: Login URL with fragment - should work
    test('Login with fragment identifier in URL', async() => {
        await mp.loginPage.goToUrlEdgeCase('/login#form');
        await mp.loginPage.loginWithCreds('tomsmith', 'SuperSecretPassword!');
        await mp.loginPage.assertSuccessLogin();
    })

});
