namespace service;

/**
 * Class for tokens
 */
public class JwtOptions
{
    public required byte[] secret { get; init; }
    //TimeSpan is a data-type, that measures how much time it has to live
    public required TimeSpan lifetime { get; init; }
    public string? address { get; set; }
}