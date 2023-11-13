using System.Net.Http.Json;
using System.Text.Json;
using api.Controllers;

namespace infrastructure;

public class TaxaRepository
{
    private HttpClient _httpClient;

    public TaxaRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }


    public Task<double[]> GetTaxaPrices(int km, int min, int per)
    {
        var addressLookupUrl = "http://localhost:5000/GetTaxaPrices/" + km + "," + min + "," + per;
        var response = _httpClient.GetAsync(addressLookupUrl).Result;
        return Task.FromResult(JsonSerializer.Deserialize<double[]>(response.Content.ReadAsStringAsync().Result) ??
                               throw new InvalidOperationException());
    }

}


class Response
{
    public double[] response {get; set; }
}