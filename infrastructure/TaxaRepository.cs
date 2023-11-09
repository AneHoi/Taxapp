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


    public async Task<double[]> GetTaxaPrices(int km, int min, int per)
    {
        var addressLookupUrl = "http://localhost:5000/GetTaxaPrices/" + km + "," + min + "," + per;
        var response = await _httpClient.GetAsync(addressLookupUrl);
        return JsonSerializer.Deserialize<double[]>(await response.Content.ReadAsStringAsync()) ??
               throw new InvalidOperationException();
    }
}


class Response
{
    public double[] response {get; set; }
}