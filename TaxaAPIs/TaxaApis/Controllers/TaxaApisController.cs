using Microsoft.AspNetCore.Mvc;


namespace api.Controllers;

public class TaxaApisController : ControllerBase
{

    [HttpGet]
    [Route("/FalseTaxiPrice/{distance},{minutes},{persons}")]
    public double GetPriceFalseTaxi([FromRoute] int distance, int minutes, int persons)
    {
        return CalculatePrice(25, distance, 13, minutes, 7, persons);
    }


    [HttpGet]
    [Route("/MockTaxiPrice/{distance},{minutes},{persons}")]
    public double GetPriceMockTaxi([FromRoute] int distance, int minutes, int persons)
    {
        return CalculatePrice(15, distance, 15, minutes, 9, persons);
    }

    [HttpGet]
    [Route("/DefinitelyNotATaxaPrice/{distance},{minutes},{persons}")]
    public double GetPriceDefinitelyNotATaxa([FromRoute] int distance, int minutes, int persons)
    {
        return CalculatePrice(25, distance, 15, minutes, 9, persons);
    }

    private double CalculatePrice(int startPrice, int distance, int kmPrice, int minutes, int minutePrice, int persons)
    {
        return startPrice + distance * kmPrice + minutes * minutePrice * persons;
    }

    [HttpGet]
    [Route("/GetTaxaPrices/{km},{min},{per}")] 
    public double[] GetTaxaPrices([FromRoute] int km, int min, int per)
    {
        double priceFalseTaxi = GetPriceFalseTaxi(km, min, per);
        double priceMockTaxi = GetPriceMockTaxi(km, min, per);
        double priceDefinitelyNotATaxa = GetPriceDefinitelyNotATaxa(km, min, per);
    
        double[] prices = { priceFalseTaxi, priceMockTaxi, priceDefinitelyNotATaxa };
        return prices;
    }
    
  
}
