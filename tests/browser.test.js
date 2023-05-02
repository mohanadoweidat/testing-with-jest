const Jasmine = require("jasmine");
const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
Jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5; // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
   await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
	let stack = await driver.findElement(By.id('top_of_stack')).getText();
	expect(stack).toEqual("n/a");
});


test('Pushing and popping elements from the stack should update the top of stack', async () => {
  // Hitta elementen på sidan
  let pushButton = await driver.findElement(By.id('push'));
  let popButton = await driver.findElement(By.id('pop'));
  let peekButton = await driver.findElement(By.id('peek'));
  let topOfStack = await driver.findElement(By.id('top_of_stack'));

  // Klicka på push-knappen och skriv in värdet i promptrutan
  await pushButton.click();
  let prompt = await driver.switchTo().alert();
  await prompt.sendKeys('1'); // Rättat felet
  await prompt.accept();

  // Verifiera att stacken uppdaterades korrekt
  expect(await topOfStack.getText()).toBe("1");

  // Klicka på peek-knappen och verifiera att toppelementet returneras korrekt
  await peekButton.click();
  expect(await topOfStack.getText()).toContain("1");


  // Klicka på push-knappen igen och verifiera att stacken uppdateras korrekt
  await pushButton.click();
  prompt = await driver.switchTo().alert();
  await prompt.sendKeys('2');
  await prompt.accept();
  expect(await topOfStack.getText()).toBe("2");

  // Klicka på pop-knappen och verifiera att det översta elementet tas bort korrekt
  await popButton.click();
  prompt = await driver.switchTo().alert();
  expect(await prompt.getText()).toBe("Tog bort 2");
  await prompt.accept();
  
  // Klicka på peek-knappen och verifiera att toppelementet returneras korrekt
  await peekButton.click();
  expect(await topOfStack.getText()).toBe("1");
});


  


describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
		let push = await driver.findElement(By.id('push'));
		await push.click();
		let alert = await driver.switchTo().alert();
		await alert.sendKeys("Bananer");
		await alert.accept();
	});
});