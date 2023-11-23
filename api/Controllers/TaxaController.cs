using System.Text.Json;
using api.Models;
using api.TransferModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using service;
using JsonSerializer = System.Text.Json.JsonSerializer;


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
    public async Task<ResponseDto<TaxiPricesDto>> GetTaxaPrices(int km, int min, int per)
    {
        try
        {
            var taxiPricesDto = await _taxaService.GetTaxaPricesAsync(km, min, per);
       

            return new ResponseDto<TaxiPricesDto>()
            {
                MessageToClient = "Successfully fetched",
                ResponseData = taxiPricesDto
            };
        }
        catch (Exception ex)
        {
            HttpContext.Response.StatusCode = 500;
            return new ResponseDto<TaxiPricesDto>()
            {
                MessageToClient = $"Error: {ex.Message}",
                ResponseData = null
            };
        }
    }

}