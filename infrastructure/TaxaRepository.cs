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


    public async Task<TaxiPricesDto> GetTaxaPricesAsync(int km, int min, int per)
    {
        var addressLookupUrl = $"http://localhost:5000/GetTaxaPrices/{km},{min},{per}";
        var response = await _httpClient.GetAsync(addressLookupUrl);

        // Check for successful response status
        response.EnsureSuccessStatusCode();

        // Deserialize the response content
        var content = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<TaxiPricesDto>(content) ??
               throw new InvalidOperationException("Failed to deserialize response");
    }



}

