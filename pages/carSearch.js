const { expect } = require('@playwright/test');

export class FindCarPage {
    constructor(page) {
      this.page = page;
  
      this.pickupLocationInput = page.locator('#react-select-pickup_location-input');
      this.pickupLocationOption = page.locator('div.select__option'); // dynamic option
      this.pickupDateInput = page.locator(`input[placeholder='Select Pick-up Date']`);
      this.pickupTimeInput = page.locator(`input[placeholder='Select Pick-up Time']`);
      this.returnDateInput = page.locator(`input[placeholder='Select Return Date']`);
      this.returnTimeInput = page.locator(`input[placeholder='Select Return Time']`);
      this.findCarButton = page.locator('button:has-text("Find A Car")');
      this.resultSection = page.locator('section:has-text("Available Cars"), div:has-text("results")');
    }
  
    async goto() {
      await this.page.goto('https://carshare.yomafleet.com/findacar', {
        waitUntil: 'domcontentloaded',
      });
    }
  
    async selectPickupLocation(locationPartialText) {
      await this.pickupLocationInput.click();
      await this.pickupLocationInput.fill(locationPartialText);
      await this.page.waitForTimeout(1000); // allow dropdown to populate
      await this.pickupLocationOption.first().click();
    }
  
    async openDatePickerAndSelectDate(inputPlaceholder, ariaLabel, clickNextMonth = false) {
        const input = this.page.locator(`input[placeholder='${inputPlaceholder}']`);
        await input.waitFor({ state: 'visible' });
        await input.click();
      
        // Wait for fresh calendar to appear
        const calendar = this.page.locator('.flatpickr-calendar.open');
        await calendar.waitFor({ state: 'visible', timeout: 3000 });
      
        // Optional: click to next month if requested
        if (clickNextMonth) {
          const nextBtn = calendar.locator('.flatpickr-next-month');
          // Use `.first()` to avoid strict mode violation
          await nextBtn.first().waitFor({ state: 'visible' });
          await nextBtn.first().click();
          await this.page.waitForTimeout(300); // Allow calendar to update
        }
      
        // Select the visible date that matches the label
        const visibleDate = calendar.locator(`.flatpickr-day[aria-label='${ariaLabel}']:not(.prevMonthDay):not(.nextMonthDay)`);
        await visibleDate.first().waitFor({ state: 'visible', timeout: 5000 });
        await visibleDate.first().click();
      }

      async fillDateAndTime({ pickupDate, returnDate, pickupTime, returnTime }) {
        // Dates (via calendar popup)
        await this.openDatePickerAndSelectDate('Select Pick-up Date', pickupDate,false);
        await this.openDatePickerAndSelectDate('Select Return Date', returnDate, false);
      
        // Time (flatpickr time inputs must be clicked first, then typed)
        await this.page.evaluate((value) => {
            const el = document.querySelector('input[name="pickup_time"]');
            el.removeAttribute('readonly');
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, pickupTime);
        
          // 3. Set return time
          await this.page.evaluate((value) => {
            const el = document.querySelector('input[name="return_time"]');
            el.removeAttribute('readonly');
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, returnTime);
          const filledPickupTime = await this.pickupTimeInput.inputValue();
          const filledReturnTime = await this.returnTimeInput.inputValue();
          console.log(`⏰ Pickup Time filled: ${filledPickupTime}`);
          console.log(`⏰ Return Time filled: ${filledReturnTime}`);
        
          expect(filledPickupTime).toBe(pickupTime);
          expect(filledReturnTime).toBe(returnTime);
      }
  
    async clickFindCar() {
      await this.findCarButton.click();
    }
    async verifyResults() {
        const allCars = this.page.locator('a[href*="/vehicle"] >> h2');
        await allCars.first().waitFor({ state: 'visible', timeout: 8000 });
        const count = await allCars.count();

        console.log(`🔍 ${count} cars found`);
        expect(count).toBeGreaterThan(0);
      
      }
    
  }
  