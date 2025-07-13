const { expect } = require('@playwright/test');

class RegistrationIndividualPage{
    constructor(page){
        this.page=page;
        this.url = 'https://carshare.yomafleet.com/account/register' ;
        this.fullNameInput = page.locator('#fullName');
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.confirmPasswordInput = page.locator('#confirmPassword')
        this.registerButton = page.locator('button[type="submit"]');
        this.errorMessages = this.page.locator('label.text-red-500');
    
    }
    async goto() {
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(this.url);
      }

    async register(fullName, email, password, confirmPassword)
    {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
      }
    async getAllErrors() {
        return await this.errorMessages.allTextContents(); 
      }

}
module.exports = { RegistrationIndividualPage };