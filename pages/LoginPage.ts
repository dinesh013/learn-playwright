import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage{

    async openLoginPage(){
        await this.goToUrl('/login');
    }

    async goToUrlEdgeCase(url: string){
        await this.goToUrl(url);
    }

    async goToUrlAndCheckStatus(url: string): Promise<number | null> {
        const response = await this.page.goto(url);
        return response?.status() ?? null;
    }

    async loginWithCreds(username: string, password: string){
        await this.basePageFill(this.page.getByLabel('Username'), username);
        await this.basePageFill(this.page.getByLabel('Password'), password);
        await this.basePageClick('//button[contains(., "Login")]');        
    }

    async assertSuccessLogin(){
        const banner = this.page.locator("#flash")
        await this.basePageExpectVisible(banner);
        await expect(banner).toContainText("You logged into a secure area!");
    }

    async assertFailedLogin(){
        const banner = this.page.locator("#flash")
        await this.basePageExpectVisible(banner);
        await expect(banner).toContainText("Your password is invalid!");
    }

    async logout(){
        await this.basePageClick(this.page.getByText('Logout'));
        await this.page.waitForURL('/login');       
    }

    async assertSuccessLogout(){
        const banner = this.page.locator("#flash")
        await this.basePageExpectVisible(banner);
        await expect(banner).toContainText("You logged out of the secure area!");
    }
}