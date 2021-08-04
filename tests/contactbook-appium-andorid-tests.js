let wd = require("selenium-webdriver"),
	By = wd.By;
let driver;

before(async function() {
	this.timeout(30000);
	let appiumCaps = { 
		platformName: "Android",
		app: "C:/Projects/Appium-JS-Example/contactbook-androidclient.apk",
		browserName: ''
	};
	driver = await new wd.Builder().usingServer("http://[::1]:4723/wd/hub")
		.withCapabilities(appiumCaps).build();

	await driver.manage().setTimeouts( { implicit: 5000 } );
	//await driver.manage().timeouts().implicitlyWait(1);
	//await driver.manage().setTimeouts({"type":"implicit", "ms":5000});	
});

after(async function() {
	await driver?.quit();
});

const assert = require('assert');

describe('ContactBook Android app', function() {
	it('Search contacts should find "steve" successfully', async function() {
		this.timeout(30000);

		// Connect to the RESTful service
		let editTextApiUrl = await driver.findElement(By.id(
			"contactbook.androidclient:id/editTextApiUrl"));
		await editTextApiUrl.clear();
		await editTextApiUrl.sendKeys("https://contactbook.nakov.repl.co/api");

		let buttonConnect = await driver.findElement(By.id(
			"contactbook.androidclient:id/buttonConnect"));
		await buttonConnect.click();

		// Search for "steve"
		let editTextKeyword = await driver.findElement(By.id(
			"contactbook.androidclient:id/editTextKeyword"));
		await editTextKeyword.clear();
		await editTextKeyword.sendKeys("steve");

		let buttonSearch = await driver.findElement(By.id(
			"contactbook.androidclient:id/buttonSearch"));
		await buttonSearch.click();

		// Assert that one or several contacts are displayed
		let textViewSearchResult = await driver.findElement(By.id(
			"contactbook.androidclient:id/textViewSearchResult"));

		// Wait until contacts are displayed
		await driver.wait(async function() {
			let searchResult = await textViewSearchResult.getText();
			return searchResult.includes("Contacts found:");
		}, 5000);

		// Assert that the first contact in the list is "Steve Jobs"
		let textViewFirstName = await driver.findElement(By.id(
			"contactbook.androidclient:id/textViewFirstName"));
		let firstName = await textViewFirstName.getText();
		assert.ok(firstName == "Steve");

		let textViewLastName = await driver.findElement(By.id(
			"contactbook.androidclient:id/textViewLastName"));
		let lastName = await textViewLastName.getText();
		assert.ok(lastName == "Jobs");
	});
});
