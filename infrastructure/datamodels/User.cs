namespace infrastructure.datamodels;

/**
 * This datamodel is for users
 */
public class User
{
    public int id { get; set; }
    public string username { get; set; }
    public int tlfnumber { get; set; }
    public string email { get; set; }
}