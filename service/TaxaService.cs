using infrastructure;
using infrastructure.datamodels;

namespace service;

public class TaxaService
{
    private readonly TaxaRepository _taxaRepository;

    public TaxaService(TaxaRepository taxaRepository)
    {
        _taxaRepository = taxaRepository;
    }

    public List<TaxiDTO> GetTaxiPrices(double km, int min, int persons)
    {
        var taxiDTOs = new List<TaxiDTO>();
        var taxiCompanies = _taxaRepository.GetTaxiCompanies();
        foreach (var taxiCompaniesQuery in taxiCompanies)
        {
            var taxiDto = new TaxiDTO
            {
                CompanyName = taxiCompaniesQuery.companyName,
                CompanyLogo = taxiCompaniesQuery.companyImgUrl,
                TaxiPrice = (taxiCompaniesQuery.startPrice + taxiCompaniesQuery.kmPrice * km +
                             taxiCompaniesQuery.minPrice * min) * persons
            };
            taxiDTOs.Add(taxiDto);
        }

        return taxiDTOs;
    }
}