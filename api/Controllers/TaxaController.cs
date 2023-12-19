using api.TransferModels;
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
    private readonly MailService _mailService;

    public TaxaController(ILogger<TaxaController> logger,
        TaxaService taxaService, MailService mailService)
    {
        _logger = logger;
        _taxaService = taxaService;
        _mailService = mailService;
    }

    [HttpGet]
    [Route("/TaxaApis/GetTaxaPrices/{km},{min},{per}")]
    public List<TaxiDTO> GetTaxaPrices(double km, int min, int per)
    {
        var taxiPricesDto = _taxaService.GetTaxiPrices(km, min, per);


        return taxiPricesDto;
    }

    [HttpPost]
    [Route("/TaxaApis/ConfirmationEmail")]
    public async Task<object> ConfirmationEmail(ConfirmationEmailDTO dto)
    {
        _mailService.SendEmail(dto);
        return new
        {
            message = "Order has been placed - an Email has been sent to you!"
        }; //This should then be shown to the client in the UI
    }
}