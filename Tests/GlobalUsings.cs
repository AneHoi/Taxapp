global using NUnit.Framework;
using System.Net.Http.Json;
using Bogus;
using Dapper;
using FluentAssertions;
using FluentAssertions.Execution;
using Newtonsoft.Json;


public class Tests
{
    private HttpClient _httpClient;
    
    [SetUp]
    public void Setup()
    {
        _httpClient = new HttpClient();
    }

    [Test]
    public void Test1()
    {
        var distance = 5;
        var minutes = 10;
        var persons = 1;
        
        var response = await _httpClient.PutAsJsonAsync("http://localhost:5000//DefinetlyNotTaxaPrice/"
            ,distance,minutes,persons);
        var responseObject = JsonConvert.DeserializeObject<int>(
            await response.Content.ReadAsStringAsync());
        
        using (new AssertionScope())
        {
            responseObject.Should().BeEquivalentTo(book, Helper.MyBecause(responseObject, book));
            response.IsSuccessStatusCode.Should().BeTrue();
        }
    }
    
}