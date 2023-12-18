using infrastructure.datamodels;
using Newtonsoft.Json;

namespace infrastructure;

public class MapsRepository
{
    private readonly HttpClient _http;

    public MapsRepository(HttpClient http)
    {
        _http = http;
    }

    public async Task<AllRoutes> GetRoutes(LngLat position, LngLat destination)
    {

    var googleApiUrl = $"https://maps.googleapis.com/maps/api/directions/json?origin={position.Lat},{position.Lng}&destination={destination.Lat},{destination.Lng}&key={Environment.GetEnvironmentVariable("GOOGLEAPIKEY")}&mode=driving";

    var json = await _http.GetAsync(googleApiUrl);
    var str = await json.Content.ReadAsStringAsync(); 
    return JsonConvert.DeserializeObject<AllRoutes>(str);
    
    }

}