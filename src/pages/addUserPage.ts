import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import exp = require("constants");

export default class AddUserPage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }


    async navigateToAddUserPage() {
        await this.base.goto("https://www.way2automation.com/angularjs-protractor/webtables/")
    }

    async clickAddUser() {
        const addUser = this.page.getByRole('button', { name: 'Add User' });
        await addUser.click();
    }

    async addUser(firstName: string, lastName: string, userName: string, password: string, role: string, email: string, mobile: string) {
        await this.page.fill("input[name='FirstName']", firstName);
        await this.page.fill("input[name='LastName']", lastName);
        await this.page.fill("input[name='UserName']", userName);
        await this.page.fill("input[name='Password']", password);
        await this.page.getByLabel('Company AAA').check();
        await this.page.getByRole('combobox').selectOption('1');
        await this.page.fill("input[name='Email']", email);
        await this.page.fill("input[name='Mobilephone']", mobile);
        await this.page.getByRole('button', { name: 'Save' }).click();

    }
    
    async validateUser(userName: string) {
        const row = await this.page.locator('//tr[@class="smart-table-data-row ng-scope"]//td')
        const rowTexts = await row.locator(':scope').allInnerTexts()
        rowTexts.forEach((text) => {
            if (text === userName) {
                console.log(`User ${userName} has been added successfully`);
            }
        });
    }

    async deleteUser(userName: string) {

        await this.page.waitForTimeout(2000);
        const _userNovak = await this.page.locator(`xpath=.//*[contains(.,'${userName}')]/following-sibling::*/button[contains(@ng-click,'delUser()')]`)
        await _userNovak.click();
        expect (this.page.locator('//div[@class="modal-header"]/h3')).toContainText('Confirmation Dialog');
        expect (this.page.locator('//div[@class="modal-body"]/p')).toContainText('Do you really want to delete the user?');
        const _buttonOk = this.page.locator('//button[contains(text(), "OK")]')
        await _buttonOk.click();
        //expect(await this.page.locator(`.//*[contains(.,'${userName}')]/following-sibling::*/button[contains(@ng-click,'delUser()')]`).count()).toBe(0);
        
    }

    async validateUserIsDeleted(userName: string) {

        const row = await this.page.locator('//tr[@class="smart-table-data-row ng-scope"]//td')
        const rowTexts = await row.locator(':scope').allInnerTexts()
        rowTexts.forEach((text) => {
            if (text === userName) {
                console.log(`User ${userName} has not bee deleted successfully`);
            }
        });
 
    }

}

