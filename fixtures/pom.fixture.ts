import { test as base } from '@playwright/test';
import PomManger from '../pages/ManagePage';
import user from '../test-data/credentials.json'

type MyFixture = {
    pm: PomManger,
    userCreds: { username: string, password: string };
}

export const test = base.extend<MyFixture>({
    pm: async ({ page }, use) => {
        await use(new PomManger(page));
    }, 
    userCreds: user
});
export { expect } from '@playwright/test';