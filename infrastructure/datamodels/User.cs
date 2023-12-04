namespace infrastructure.datamodels;

/**
 * This datamodel is for users
 */
public class User
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public int Tlfnumber { get; set; }
    public required string Email { get; set; }
}