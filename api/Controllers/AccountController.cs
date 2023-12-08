using api.dtoModels;
using Microsoft.AspNetCore.Mvc;
using service;

namespace Taxapp.Controllers;

/**
 * This controller class controls the accounts
 */
public class AccountController: ControllerBase
{
    private readonly AccountService _service;

    public AccountController(AccountService service)
    {
        _service = service;
    }

    [HttpPost]
    [Route("/account/login")]
    public ResponseDto Login([FromBody] LoginDto dto)
    {
        var user = _service.Authenticate(dto.email, dto.password);
        return new ResponseDto
        {
            MessageToClient = "Successfully authenticated",
            ResponseData = user
        };
        
    }

    [HttpPost]
    [Route("/account/register")]
    public ResponseDto Register([FromBody] RegisterDto dto)
    {
        Console.WriteLine("Hi Im: \t\t" + dto.username + "\nmy number:\t" + dto.tlfnumber.ToString() + "\nmy email:\t" + dto.email + "\nPassword:\t" + dto.password);
        var user = _service.Register(dto.username, dto.tlfnumber, dto.email, dto.password);
        return new ResponseDto
        {
            MessageToClient = "Successfully registered",
            ResponseData = user
        };
    }

    [HttpGet]
    [Route("/account/whoami")]
    public ResponseDto WhoAmI()
    {
        throw new NotImplementedException();
    }
}