const { test, expect } = require('@playwright/test');
const { StaticPage } = require('../pages/staticPage');

const staticPages = [
  { name: 'About Us', path: '/about-us', text: 'About Us' },
  { name: 'Contact Us', path: '/contact-us', text: 'Contact Us' },
  { name: 'FAQ', path: '/faqs', text: 'What is Yoma Car Share?' },
  { name: 'Terms and Conditions', path: '/terms-and-conditions', text: 'Terms and Conditions' },
  { name: 'Policy', path: '/privacy', text: 'Privacy Policy' },
  { name: 'Yoma Fleet Limited', path: '/yoma-fleet', text: 'Yoma Fleet' },
  { name: 'Yoma Group', path: '/yoma-group', text: 'Yoma Group' },
  { name: 'Why Yoma Car Share?', path: '/why-car-share', text: 'Why Yoma Car Share' },
  { name: 'How Yoma Car Share Works', path: '/how-it-works', text: 'How Yoma Car Share Works' },
  { name: 'Self-Drive Tips', path: '/self-drive-tips', text: 'Self-Drive Tips' },
  { name: 'Starter Pack', path: '/starter-pack', text: 'Starter Pack' },
  { name: 'Feedback', path: '/feedback', text: 'Feedback' },
];

test.describe('Static Page POM Verification', () => {
  for (const { name, path, text } of staticPages) {
    test(`✅ Verify "${name}" page loads`, async ({ page }) => {
      const staticPage = new StaticPage(page);
      await staticPage.navigateTo(path);
      const locator = page.locator(`text=${text}`);
      await expect(locator.first()).toBeVisible();
    });
  }
});
