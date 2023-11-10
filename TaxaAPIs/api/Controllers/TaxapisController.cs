using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public class TaxapisController : ControllerBase
{
    [HttpGet]
    [Route("/FalseTaxiPrice/{distance},{minutes},{persons}")]
    public object GetPriceFalseTaxi([FromRoute] int distance, int minutes, int persons)
    {
        return new
        {
            response = CalculatePrice(25, distance, 13, minutes, 7, persons)
        };
    }
    

    [HttpGet]
    [Route("/MockTaxiPrice/{distance},{minutes},{persons}")]
    public object GetPriceMockTaxi([FromRoute] int distance, int minutes, int persons)
    {
        return new
        {
            response = CalculatePrice(15 ,distance ,15, minutes, 9,persons)
        };
    }

    [HttpGet]
    [Route("/DefinetlyNotTaxaPrice/{distance},{minutes},{persons}")]
    public object GetPriceDefenetlyNotTaxa([FromRoute] int distance, int minutes, int persons)
    {
        return new
        {
            response = CalculatePrice(25 ,distance ,15, minutes, 9,persons)
        };
    }
    
    private object CalculatePrice(int startPrice, int distance, int kmPrice, int minutes, int minutePrice, int persons)
    {
        return startPrice + distance * kmPrice + minutes * minutePrice * persons;
    }
}