const { test, expect } = require('@playwright/test');
const { RegistrationIndividualPage } = require('../pages/registrationIndividualPage');
const { getValidUser, invalidUser, mismatchedPassword } = require('../test-data/users');

test('should register successfully and redirect to OTP input page', async ({ page }) => {
  const registerPage = new RegistrationIndividualPage(page);
  const user = getValidUser(); // ✅ Get fresh user with random full name

  await registerPage.goto();
  await registerPage.register(user.fullName, user.email, user.password, user.confirmPassword);
  await registerPage.clickRegisterButton();

  // ✅ Verify OTP screen appears
  const otpInput = page.locator('input[aria-label*="Digit"]');
  await expect(otpInput.first()).toBeVisible();
});

test('should show error messages for invalid user input', async ({ page }) => {
   const registerPage = new RegistrationIndividualPage(page);
   const user = invalidUser;
  
   await registerPage.goto();
   await registerPage.register(user.fullName, user.email, user.password, user.confirmPassword);
   await registerPage.clickRegisterButton();
  
   // ✅ Assert that error messages are visible
   const errors = await registerPage.getAllErrors();
   console.log('❌ Errors:', errors);
   
   // Assert specific messages
   expect(errors).toContain('Please enter valid email address.');
   expect(errors).toContain('Please enter your full name.');
   await page.pause();
});