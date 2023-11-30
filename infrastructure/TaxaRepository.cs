using Dapper;
using infrastructure.datamodels;
using Npgsql;

namespace infrastructure;

public class TaxaRepository
{
    private NpgsqlDataSource _dataSource;

    public TaxaRepository(NpgsqlDataSource datasource)
    {
        _dataSource = datasource;
    }

    public IEnumerable<TaxiCompaniesQuery> GetTaxiCompanies()
    {
        string sql = $@"SELECT * FROM taxapp.taxicompanies;";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<TaxiCompaniesQuery>(sql);
        }
    }
    
}