// e2e.test.js

// Importer les dépendances

const { Builder, By, until } = require('selenium-webdriver');

describe('Test E2E de l\'application', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });
//on verif si la page est la bonne 
    it('devrait charger la page d\'accueil', async function() {
        await driver.get('http://localhost:3000'); 
        const pageTitle = await driver.getTitle();
        (await import('chai')).expect(pageTitle).to.equal('Hotel-react');
    });
//on test les inputs
    it('devrait s enregistrer avec succès', async function() {
        await driver.get('http://localhost:3000/sign-up'); 
        await driver.findElement(By.id('pseudo')).sendKeys('test1');
        await driver.findElement(By.id('email')).sendKeys('test1@test.com');
        await driver.findElement(By.id('password')).sendKeys('test');
        await driver.findElement(By.id('cPassword')).sendKeys('test');
        await driver.findElement(By.id('sign-up')).click();
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl == 'http://localhost:3000/login'; // Attendre jusqu'à ce que l'URL change de la page de connexion
        }, 5000);

    });
//on test tous les inputs
    it('ne devrait pas devrait s enregistrer', async function() {
        await driver.get('http://localhost:3000/sign-up'); 
        await driver.findElement(By.id('pseudo')).sendKeys('test2');
        await driver.findElement(By.id('email')).sendKeys('test2');
        await driver.findElement(By.id('password')).sendKeys('test2');
        await driver.findElement(By.id('cPassword')).sendKeys('test2');
        await driver.findElement(By.id('sign-up')).click();
        await driver.wait(async () => {
            const currentUrl = await driver.getCurrentUrl();
            return currentUrl == 'http://localhost:3000/sign-up'; // Attendre jusqu'à ce que l'URL change de la page de connexion
        }, 5000);
    });
});
