
using infrastructure;

namespace service;

public class TaxaService
{
    
    private readonly TaxaRepository _taxaRepository;

    public TaxaService(TaxaRepository taxaRepository)
    {
        _taxaRepository = taxaRepository;
    }
    public object? GetTaxaPrices(int km, int min, int per)
    {
        return _taxaRepository.GetTaxaPrices(km, min, per);
    }
}


