namespace infrastructure.datamodels;

public class TaxiCompaniesQuery
{
    public int taxiID { get; set; }
    public string companyName { get; set; }
    public double startPrice { get; set; }
    public double kmPrice { get; set; }

    public double minPrice { get; set; }
    public byte[] companyImgUrl { get; set; }
}