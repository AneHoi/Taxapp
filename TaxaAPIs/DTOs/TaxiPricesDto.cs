using System;
using System.Collections.Generic;
namespace DTOs;

public class TaxiPricesDto
{  

    private List<TaxiCompany> taxiCompanies = new List<TaxiCompany>();
    private Dictionary<string, double> taxiPrices = new Dictionary<string, double>();

    public void AddTaxiCompany(string companyName, string logoPath)
    {
        taxiCompanies.Add(new TaxiCompany
        {
            CompanyName = companyName,
            LogoPath = logoPath
        });
    }
}