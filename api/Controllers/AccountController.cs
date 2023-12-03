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
    [Route("/api/account/login")]
    public ResponseDto Login([FromBody] LoginDto dto)
    {
        var user = _service.Authenticate(dto.Email, dto.Password);
        return new ResponseDto
        {
            MessageToClient = "Successfully authenticated",
            ResponseData = user
        };
        
    }

    [HttpPost]
    [Route("/api/account/register")]
    public ResponseDto Register([FromBody] RegisterDto dto)
    {
        var user = _service.Register(dto.FullName, dto.Tlfnumber, dto.Email, dto.Password);
        return new ResponseDto
        {
            MessageToClient = "Successfully registered",
            ResponseData = user
        };
    }

    [HttpGet]
    [Route("/api/account/whoami")]
    public ResponseDto WhoAmI()
    {
        throw new NotImplementedException();
    }
}