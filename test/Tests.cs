using System.Net.Http.Json;
using FluentAssertions;
using Newtonsoft.Json;
using infrastructure.datamodels;
using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;

namespace testDir;

public class Tests
{
    private HttpClient _httpClient;

    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }

    [TestCase("http://localhost:5081/TaxaApis/GetTaxaPrices/5,5,1", 125)]
    [TestCase("http://localhost:5081/TaxaApis/GetTaxaPrices/8,10,1", 199)]
    public async Task Test1(string address, int expected)
    {
        //Arrange
        var response = await _httpClient.GetStringAsync(address);
        var taxiDTOs = JsonConvert.DeserializeObject<TaxiDTO[]>(response);

        //Act
        var falseTaxi = Array.Find(taxiDTOs, taxi => taxi.CompanyName == "FalseTaxi");

        //Assert
        Assert.NotNull(falseTaxi, "FalseTaxi not found in the response");
        Assert.AreEqual(expected, falseTaxi.TaxiPrice, "Incorrect taxi price for FalseTaxi");
    }

    /* Virker ikke pga. en global variable med GOOGLEAPIKEY
     public class PlayWrightTest : PageTest
    {
        [Test]
        public async Task MyTest()
        {
            await Page.GotoAsync("http://localhost:4200/home");

            await Page.GetByText("Amount of people").ClickAsync();

            await Page.GetByRole(AriaRole.Radio, new() { Name = "3" }).ClickAsync();

            await Page.GetByRole(AriaRole.Button, new() { Name = "OK" }).ClickAsync();

            await Page.GetByRole(AriaRole.Button, new() { Name = "Search" }).ClickAsync();

            await Page.GetByRole(AriaRole.Img, new() { Name = "logo of FalseTaxi" }).ClickAsync();

            await Expect(Page.GetByText("Price: 375 DKK")).ToBeVisibleAsync();


        }
    }*/
}