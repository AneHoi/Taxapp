using System.Net.Http.Json;
using System.Text.Json;
using api.Controllers;
using api.Models;

namespace infrastructure;

public class TaxaRepository
{
    private HttpClient _httpClient;

    public TaxaRepository(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }


        public Task<TaxiPricesDto> GetTaxaPrices(int km, int min, int per)
        {
            var addressLookupUrl = "http://localhost:5000/GetTaxaPrices/" + km + "," + min + "," + per;
            var response = _httpClient.GetAsync(addressLookupUrl).Result;
            return Task.FromResult(JsonSerializer.Deserialize<TaxiPricesDto>(response.Content.ReadAsStringAsync().Result) ??
                                   throw new InvalidOperationException());
        }

}

