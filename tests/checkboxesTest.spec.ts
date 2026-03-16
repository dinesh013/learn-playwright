import ManagePage from "../pages/ManagePage";
import { test, expect } from '@playwright/test';

test.describe('Checkboxes scenarios', () => {

    let mp: ManagePage;
    test.beforeEach(({page}) => {
        mp = new ManagePage(page);
    })

    test('Validate checkboxes state', async() => {
        await mp.checkboxesPage.openCheckboxesPage();
        await mp.checkboxesPage.checkFirstCheckbox();
        await mp.checkboxesPage.checkSecondCheckbox();
        await mp.checkboxesPage.assertCheckboxesState(true, true);
        await mp.checkboxesPage.uncheckFirstCheckbox();
        await mp.checkboxesPage.assertCheckboxesState(false, true);
    })

});