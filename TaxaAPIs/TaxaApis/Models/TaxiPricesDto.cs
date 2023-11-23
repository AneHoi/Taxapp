using System.Collections.Generic;

namespace api.Models
{
    public class TaxiPricesDto
    {
        public List<TaxiCompany> taxiCompanies { get; set; } = new List<TaxiCompany>();
        public Dictionary<string, double> taxiPrices { get; set; } = new Dictionary<string, double>();

        public void AddTaxiCompany(string companyName)
        {
            taxiCompanies.Add(new TaxiCompany
            {
                companyName = companyName,
            });
        }

        public void SetTaxiCompanyPrice(string companyName, double price)
        {
            taxiPrices[companyName] = price;
        }

        public double GetTaxiCompanyPrice(string companyName)
        {
            if (taxiPrices.TryGetValue(companyName, out double price))
            {
                return price;
            }

            // Handle the case where the company name is not found (e.g., return a default value)
            return 0.0;
        }
/*
        public List<TaxiCompany> TaxiCompanies
        {
            get { return taxiCompanies; }
            
        }

        public Dictionary<string, double> TaxiPrices
        {
            get { return taxiPrices; }
        }*/
    }

}