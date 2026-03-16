import ManagePage from "../pages/ManagePage";
import { test, expect } from '@playwright/test';


test.describe('test', () => {

    let mp: ManagePage;

    test.beforeEach(({page}) => {
        mp = new ManagePage(page);
    })

    test('Login with valid creds', async() => {
        await mp.loginPage.openLoginPage();
        await mp.loginPage.loginWithCreds('tomsmith', 'SuperSecretPassword!');
        await mp.loginPage.assertSuccessLogin();
    })

    test('Login with invalid password', async() => {
        await mp.loginPage.openLoginPage();
        await mp.loginPage.loginWithCreds('tomsmith', 'invalid');
        await mp.loginPage.assertFailedLogin();
    })

});

