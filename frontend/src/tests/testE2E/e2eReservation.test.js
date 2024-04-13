// Importer les dépendances
const { Builder, By, until } = require("selenium-webdriver");

describe("Test E2E de l'application", function () {
  this.timeout(10000);
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  // Teste la connexion avec succès
  it("devrait reserver avec succès", async function () {

    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.id("pseudo")).sendKeys("nolannd");
    await driver.findElement(By.id("password")).sendKeys("nolannd");
    await driver.findElement(By.id("connexion")).click();

    await driver.sleep(1000);

    await driver.get("http://localhost:3000/hotels/65e5041e3dbbdc5ea66a1237");

    // Cliquer sur le bouton "Réserver"
    await driver.findElement(By.id("reserver")).click();

    // Remplir les champs de dates de réservation
    const startDateField = await driver.findElement(By.id("startDate"));
    startDateField.sendKeys("2025-03-27");
    const endDateField = await driver.findElement(By.id("EndDate"));
    endDateField.sendKeys("2025-03-27");

    // Cliquer sur le bouton "Valider"
    await driver.findElement(By.id("valider")).click();

    // Attendre que la page soit chargée après la réservation
    await driver.wait(until.urlContains("/mybook"), 5000);
  });

});
