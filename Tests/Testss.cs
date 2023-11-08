using System.Net.Http.Json;
using FluentAssertions;

namespace apiTests;

public class Tests
{
    private HttpClient _httpClient;
    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }

    [TestCase("/FalseTaxiPrice/" + 3 "," + 5 + "," + 1, 55)]
    public async Task Test1(string address, int expected)
    {
        //Arrange
        //ACT
        var response = await _httpClient.GetFromJsonAsync<Reponse>("");
        //ASSERT
        response.Response.Should().Be(expected);
    }
    
    public 
}

class Reponse
{
    public int Response {get; set; }
}