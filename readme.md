# Create the README.md content and save it as a downloadable file

readme_content = """
# 🛻 Yoma Car Share - Playwright Automation

This repository contains Playwright end-to-end tests for validating core workflows on [https://carshare.yomafleet.com](https://carshare.yomafleet.com). The project follows the **Page Object Model (POM)** pattern and includes dynamic test data, calendar interactions, and Allure reporting integration.

---

## 📦 Tech Stack

- ✅ [Playwright](https://playwright.dev) — End-to-end testing framework
- 📘 JavaScript (ES6+)
- 🧱 Page Object Model (POM)
- 📊 [Allure Report](https://docs.qameta.io/allure/) — Rich HTML test reporting
- 🧪 Jest-style test assertions with `@playwright/test`

---

## 📁 Folder Structure

playwright_yomaCarShare/
├── pages/ # Page Object classes (e.g., FindCarPage)
├── tests/ # Test specs (e.g., car-search.spec.js)
├── utils/ # Date helpers or utilities
├── allure-results/ # Raw test results (auto-generated)
├── allure-report/ # Final HTML test report (after generation)
├── playwright.config.js # Test configuration
└── README.md

## 🚀 Test Scenarios

### ✅ Static Pages (from root site)

- About Us
- Contact Us
- FAQ
- Terms and Conditions
- Privacy Policy
- Yoma Fleet Limited
- Yoma Group
- Why Yoma Car Share?
- How it works
- Self-Drive Tips
- Starter Pack
- Feedback

### ✅ Find A Car Flow

- Select pick-up location dynamically
- Use date picker to select pickup & return dates (flatpickr)
- Set pickup & return times reliably
- Click "Find A Car"
- Assert vehicle search results load

---

## 🧪 How to Run Tests

1. **Install dependencies:**

```bash
npm install

npx playwright test

npx playwright show-report

📊 Allure Reporting
1. Run Tests (Allure results auto-saved):
npx playwright test

2. Generate Allure HTML Report:

npx allure generate allure-results --clean -o allure-report

3. Open Allure Report in Browser:
npx allure open allure-report

📅 Dynamic Date Handling
Dynamic pickup & return dates are generated with:


const { addDays } = require('../utils/dateHelper');

const pickupDate = addDays(3);  // Today + 3
const returnDate = addDays(5);  // Today + 5
🧪 Sample Test Case

test('Search car with calendar and verify results', async ({ page }) => {
  const findCar = new FindCarPage(page);
  await findCar.goto();
  await findCar.selectPickupLocation('Yangon');

  const pickupDate = addDays(3);
  const returnDate = addDays(5);

  await findCar.fillDateAndTime({
    pickupDate,
    returnDate,
    pickupTime: '10:00',
    returnTime: '12:00',
  });

  await findCar.clickFindCar();
  await findCar.verifyResults(); // Assert at least one car is returned
});

👨‍💻 Author
Panji Indrajit
🌐 https://www.linkedin.com/in/panji-indrajit-9133b262/
📧 panji.indrajit@gmail.com
