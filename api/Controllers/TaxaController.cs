using api.TransferModels;
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
    public ResponseDto GetTaxaPrices(int km, int min, int per)
    {
        HttpContext.Response.StatusCode = 200;
        return new ResponseDto()
        {
            MessageToClient = "Successfully fetched",
            ResponseData = _taxaService.GetTaxaPrices(km,min,per)
        };
    }
}