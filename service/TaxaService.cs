
using api.Models;
using infrastructure;

namespace service;

public class TaxaService
{
    
    private readonly TaxaRepository _taxaRepository;

    public TaxaService(TaxaRepository taxaRepository)
    {
        _taxaRepository = taxaRepository;
    }
    public async Task<TaxiPricesDto> GetTaxaPricesAsync(int km, int min, int per)
    {
        try
        {
            var taxiPricesDto = await _taxaRepository.GetTaxaPricesAsync(km, min, per);
            // Optionally, you can perform additional processing or mapping here
            return taxiPricesDto;
        }
        catch (Exception ex)
        {
            // Handle exceptions if needed
            throw new InvalidOperationException($"Failed to get taxi prices: {ex.Message}", ex);
        }
    }


}


