using System.ComponentModel.DataAnnotations;

namespace api.dtoModels;

public class RegisterDto
{
    [Required] public required string FullName { get; set; }
    
    [Required] [MinLength(8)] public int Tlfnumber { get; set; }

    [Required] public required string Email { get; set; }

    [Required] [MinLength(8)] public required string Password { get; set; }
}