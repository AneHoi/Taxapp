using System.Net.Http.Json;
using FluentAssertions;

namespace testDir;

public class Tests
{
    private HttpClient _httpClient;
    
    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }

    [TestCase("http://localhost:5000/FalseTaxiPrice/3,5,1", 99)]
    [TestCase("http://localhost:5000/DefinetlyNotTaxaPrice/6,10,2", 295)]
    public async Task Test1(string address, int expected)
    {
        //Arrange
        //ACT
        var response = await _httpClient.GetFromJsonAsync<Reponse>(address);
        //ASSERT
        response.Response.Should().Be(expected);
    }
    
}

class Reponse
{
    public int Response {get; set; }
}