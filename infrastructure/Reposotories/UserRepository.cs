using Dapper;
using infrastructure.datamodels;
using Npgsql;

namespace infrastructure.Reposotories;

/**
 * Another class that is directly connected to the database.
 * This class focuses on the users-table
 */
public class UserRepository
{
    private readonly NpgsqlDataSource _dataSource;

    public UserRepository(NpgsqlDataSource dataSource)
    {
        _dataSource = dataSource;
    }

    public User Create(string fullName, int tlfnumber, string email)
    {
        const string sql = $@"
INSERT INTO Taxapp.users (full_name, tlfnumber, email)
VALUES (@fullName, @tlfnumber, @email)
RETURNING
    id as {nameof(User.Id)},
    full_name as {nameof(User.FullName)},
    tlfnumber as {nameof(User.Tlfnumber)},
    email as {nameof(User.Email)};
";
        using var connection = _dataSource.OpenConnection();
        return connection.QueryFirst<User>(sql, new { fullName, tlfnumber, email });
    }

    /**
     * Returns the user, with the given ID.
     */
    public User? GetById(int id)
    {
        const string sql = $@"
SELECT
    id as {nameof(User.Id)},
    full_name as {nameof(User.FullName)},
    tlfnumber as {nameof(User.Tlfnumber)}
    email as {nameof(User.Email)}
FROM taxapp.users
WHERE id = @id;
";
        using var connection = _dataSource.OpenConnection();
        return connection.QueryFirstOrDefault<User>(sql, new { id });
    }

    public IEnumerable<User> GetAll()
    {
        const string sql = $@"
SELECT
    id as {nameof(User.Id)},
    full_name as {nameof(User.FullName)},
    tlfnumber as {nameof(User.Tlfnumber)}
    email as {nameof(User.Email)}
FROM taxapp.users
";
        using (var conn = _dataSource.OpenConnection())
        {
            return conn.Query<User>(sql);
        }
    }
}