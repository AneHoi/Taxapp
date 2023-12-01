using System.Net.Http.Json;
using FluentAssertions;
using Newtonsoft.Json;

namespace testDir;

public class Tests
{
    private HttpClient _httpClient;

    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }

    public async Task Test1(string address, int expected)
    {
        //Arrange
        //ACT
        var answer = await _httpClient.GetStringAsync(address);
        
        //ASSERT
        int.Parse(answer).Should().Be(expected);
    }
}

class Response
{
    public int? ExpectedResponse { get; set; }
}