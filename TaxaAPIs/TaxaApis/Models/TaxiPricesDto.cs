using System.Collections.Generic;

namespace api.Models
{
    public class TaxiPricesDto
    {
        private List<TaxiCompany> taxiCompanies = new List<TaxiCompany>();
        private Dictionary<string, double> taxiPrices = new Dictionary<string, double>();

        public void AddTaxiCompany(string companyName)
        {
            taxiCompanies.Add(new TaxiCompany
            {
                CompanyName = companyName,
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

        public List<TaxiCompany> TaxiCompanies
        {
            get { return taxiCompanies; }
        }

        public Dictionary<string, double> TaxiPrices
        {
            get { return taxiPrices; }
        }
    }

}