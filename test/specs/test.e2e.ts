// import { expect } from '@wdio/globals'
// import LoginPage from '../pageobjects/login.page'
// import SecurePage from '../pageobjects/secure.page'

// describe('My Login application', () => {
//     it('should login with valid credentials', async () => {
//         await LoginPage.open()

//         await LoginPage.login('tomsmith', 'SuperSecretPassword!')
//         await expect(SecurePage.flashAlert).toBeExisting()
//         await expect(SecurePage.flashAlert).toHaveText(
//             expect.stringContaining('You logged into a secure area!'))
//     })
// })
describe('My Login application', () => {
    it('should login with valid credentials', async () => {
    const nextButton = $('//android.widget.Button[@resource-id="org.simple.clinic.staging:id/nextButton"]');
    await expect(nextButton).toBeDisplayed();
    await nextButton.click();

    const getStartedButton = $('//android.widget.Button[@resource-id="org.simple.clinic.staging:id/getStartedButton"]');
    await expect(getStartedButton).toBeDisplayed();
    await getStartedButton.click();
    })
})



