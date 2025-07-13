const { test } = require('@playwright/test');
const { FindCarPage } = require('../pages/carSearch');
const { addDays } = require('../utils/dateHelper');


test('Search car with calendar and verify results', async ({ page }) => {
  const findCar = new FindCarPage(page);
  await findCar.goto();

  await findCar.selectPickupLocation('Yangon');

  const pickupDate = addDays(3);  // Today + 3
  const returnDate = addDays(5);  // Today + 5

  console.log(`📅 Pickup: ${pickupDate}, Return: ${returnDate}`);
  
  await findCar.fillDateAndTime({
    pickupDate,
    returnDate,
    pickupTime: '10:00',
    returnTime: '12:00',
  });

  await findCar.clickFindCar();
  await findCar.verifyResults();
});