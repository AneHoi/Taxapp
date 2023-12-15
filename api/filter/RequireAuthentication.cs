using System.Security.Authentication;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.filter;

/**
 * Protecting our end-point by using a filter, that we define here
 */
public class RequireAuthentication : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        //If sessionData is empty, we cannot let anyone into, where this filter is present
        if (context.HttpContext.GetSessionData() == null) throw new AuthenticationException();
    }
}