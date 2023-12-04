using api.TransferModels;
using infrastructure.datamodels;
using MimeKit;

namespace api;

public class MailService
{
    public void SendEmail(ConfirmationEmailDTO dto)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("TaxApp Inc.", Environment.GetEnvironmentVariable("fromemail")));
        message.To.Add(new MailboxAddress("Customer", dto.toemail));
        message.Subject = "Your order confirmation";

        message.Body = new TextPart("plain")
        {
            Text = $"""
                   Price of fare: {dto.price} DKK
                   Duration of fare: {dto.duration} min
                   Distance of fare: {dto.distance} km
                   Number of passengers: {dto.persons}
                   Taxi Company: {dto.company}
                   Enjoy your ride!
                   """
        };

        using (var client = new MailKit.Net.Smtp.SmtpClient())
        {
            client.Connect("smtp.gmail.com", 465, true);
            client.Authenticate(Environment.GetEnvironmentVariable("fromemail"), Environment.GetEnvironmentVariable("frompass") );
            client.Send(message);
            client.Disconnect(true);
        }
    }
}