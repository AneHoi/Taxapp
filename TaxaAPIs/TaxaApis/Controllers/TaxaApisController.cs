using api.Models;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers;

public class TaxaApisController : ControllerBase
{

    [HttpGet]
    [Route("/FalseTaxiPrice/{distance},{minutes},{persons}")]
    public async Task<double> GetPriceFalseTaxi([FromRoute] int distance, int minutes, int persons)
    {
        return await CalculatePrice(25, distance, 13, minutes, 7, persons);
    }


    [HttpGet]
    [Route("/MockTaxiPrice/{distance},{minutes},{persons}")]
    public async Task<double> GetPriceMockTaxi([FromRoute] int distance, int minutes, int persons)
    {
        return await CalculatePrice(15, distance, 15, minutes, 9, persons);
    }

    [HttpGet]
    [Route("/DefinitelyNotATaxaPrice/{distance},{minutes},{persons}")]
    public async Task<double> GetPriceDefinitelyNotATaxa([FromRoute] int distance, int minutes, int persons)
    {
        return await CalculatePrice(25, distance, 15, minutes, 9, persons);
    }

    private Task<double> CalculatePrice(int startPrice, int distance, int kmPrice, int minutes, int minutePrice, int persons)
    {
        double result = startPrice + distance * kmPrice + minutes * minutePrice * persons;
        return Task.FromResult(result);
    }

    [ProducesResponseType(typeof(TaxiPricesDto), 200)]
    [HttpGet]
    [Route("/GetTaxaPrices/{km},{min},{per}")]
    public async Task<TaxiPricesDto> GetTaxaPrices([FromRoute] int km, int min, int per)
    {
        var taxiPricesDto = new TaxiPricesDto();

        taxiPricesDto.AddTaxiCompany("FalseTaxi");
        var priceFalseTaxi = await GetPriceFalseTaxi(km, min, per);
        taxiPricesDto.SetTaxiCompanyPrice("FalseTaxi", priceFalseTaxi);

        taxiPricesDto.AddTaxiCompany("MockTaxi");
        var priceMockTaxi = await GetPriceMockTaxi(km, min, per);
        taxiPricesDto.SetTaxiCompanyPrice("MockTaxi", priceMockTaxi);

        taxiPricesDto.AddTaxiCompany("DefinitelyNotATaxi");
        var priceDefinitelyNotATaxi = await GetPriceDefinitelyNotATaxa(km, min, per);
        taxiPricesDto.SetTaxiCompanyPrice("DefinitelyNotATaxi", priceDefinitelyNotATaxi);

        return taxiPricesDto;
        
    }
    
  
}
