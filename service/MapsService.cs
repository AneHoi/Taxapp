using infrastructure;
using infrastructure.datamodels;
using MimeKit;
using Newtonsoft.Json;

namespace service;

public class MapsService
{
    private readonly MapsRepository _mapsRepository;

    public MapsService(MapsRepository mapsRepository)
    {
        _mapsRepository = mapsRepository;
    }

    public async Task<TimeAndDistance> GetTimeAndDuration(LngLat position, LngLat destination)
    {
        var timeAndDistance = new TimeAndDistance();
        AllRoutes response = await _mapsRepository.GetRoutes(position, destination);
        if (response.routes.Count > 0)
        {
            // Assuming there is at least one route in the response
            var firstRoute = response.routes[0];

            // Summing up distance and duration from all legs of the first route
            double totalDistance = Math.Round((double)firstRoute.legs.Sum(leg => leg.distance.value) / 1000, 1);
            int totalDurationInMinutes = (int)Math.Round(firstRoute.legs.Sum(leg => leg.duration.value) / 60.0);

            // Assuming TimeAndDistance has properties named Distance and Duration
            timeAndDistance.km = totalDistance;
            timeAndDistance.min = totalDurationInMinutes;
        }

        return timeAndDistance;
    }

    
}