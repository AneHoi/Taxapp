using infrastructure.datamodels;
using Microsoft.AspNetCore.Mvc;
using service;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class TaxaController : ControllerBase
{
    private readonly ILogger<TaxaController> _logger;
    private readonly TaxaService _taxaService;

    public TaxaController(ILogger<TaxaController> logger,
        TaxaService taxaService)
    {
        _logger = logger;
        _taxaService = taxaService;
    }

    [HttpGet]
    [Route("/TaxaApis/GetTaxaPrices/{km},{min},{per}")]
    public List<TaxiDTO> GetTaxaPrices(int km, int min, int per)
    {
        var taxiPricesDto = _taxaService.GetTaxiPrices(km, min, per);


        return taxiPricesDto;
    }
}