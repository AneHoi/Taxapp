using Microsoft.AspNetCore.Mvc;

namespace definitelyNotATaxi.Controllers;

public class DefenetlyNotTaxaController : ControllerBase
{

    [HttpGet]
    [Route("/DefenetlyNotTaxaPrice/{distance},{minutes}")]
    public int GetPrice([FromRoute] int distance, int minutes)
    {
        Price price = new Price();
        return 25 + distance * 13 + minutes * 7;
    }
}
