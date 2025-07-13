class OtpPage {
    constructor(page) {
      this.page = page;
      this.otpInput = page.locator('input[name="otp"], input[placeholder*="OTP"]');
      this.verifyButton = page.locator('#verifiying');
      this.errorText = page.locator('.text-error');
    }
  
    async enterOtp(code) {
      await this.otpInput.fill(code);
      await this.verifyButton.click();
    }
  
    async isOtpFieldVisible() {
      return this.otpInput.isVisible();
    }
  
    async getOtpError() {
      return this.errorText.textContent();
    }
  }
  
  module.exports = { OtpPage };