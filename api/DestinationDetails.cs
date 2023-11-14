using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

public class DeastinationDetalis
{
    static async Task Main()
    {
        string apiKey = "";
        string startAddress = "";
        string endAddress = "";

        var startLocation = await GetLocationAsync(startAddress, apiKey);
        var endLocation = await GetLocationAsync(endAddress, apiKey);

        var directions = await GetDirectionsAsync(startLocation, endLocation, apiKey);
     }

    static async Task<JObject> GetLocationAsync(string address, string apiKey)
    {
        using (var httpClient = new HttpClient())
        {
            var response = await httpClient.GetStringAsync($"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={apiKey}");
            return JObject.Parse(response);
        }
    }

    static async Task<JObject> GetDirectionsAsync(JObject origin, JObject destination, string apiKey)
    {
        using (var httpClient = new HttpClient())
        {
            var response = await httpClient.GetStringAsync($"https://maps.googleapis.com/maps/api/directions/json?origin={origin["lat"]},{origin["lng"]}&destination={destination["lat"]},{destination["lng"]}&key={apiKey}");
            return JObject.Parse(response);
        }
    }
}