using api.dtoModels;
using infrastructure.datamodels;
using Microsoft.AspNetCore.Mvc;
using service;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class MapsController : ControllerBase
{
    private readonly ILogger<MapsController> _logger;
    private readonly MapsService _mapsService;

    public MapsController(ILogger<MapsController> logger, MapsService mapsService)
    {
        _logger = logger;
        _mapsService = mapsService;
    }

    [HttpGet]
    [Route("/google/routes/{posLat},{posLng},{desLat},{desLng}")]
    public async Task<ResponseDto> GetRoutes(double posLat, double posLng, double desLat, double desLng)
    {
        var pos = new LngLat
        {
            Lng = posLng,
            Lat = posLat
        };
        var des = new LngLat
        {
            Lng = desLng,
            Lat = desLat
        };
        return new ResponseDto
        {
            MessageToClient = "Alright",
            ResponseData = await _mapsService.GetTimeAndDuration(pos, des)
        };
    }
}