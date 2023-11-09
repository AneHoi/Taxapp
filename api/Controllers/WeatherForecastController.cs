using Microsoft.AspNetCore.Mvc;

namespace Taxapp.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    //CONTROLLER/GUI = API
    //BLL = Service --> processing and calculations sends to DAL
    //DAL = Infrastructure --> Call Google API. Call API's.
    /**
     * 1. get destinations fom controller
     * 2. send data to BLL
     * 3. send data to DAL
     * 4. send data to Google API and get data back
     * 5. send data to BLL
     * 6. process data and send "Distance, persons, time...." DAL
     * 7. DAL recive data from our own API's and sends it back op to BLL
     * 8. BLL sends data back up to GUI
    */
}
