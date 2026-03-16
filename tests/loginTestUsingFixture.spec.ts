import { test, expect } from '../fixtures/pom.fixture';

test.describe('tests', () => {

    test('login with fixture extenstion', async({pm, userCreds}) => {
        await pm.loginPage.openLoginPage();
        await pm.loginPage.loginWithCreds(userCreds.username, userCreds.password);
        await pm.loginPage.assertSuccessLogin();
    })
})