using EmbedIO;
using EmbedIO.Routing;
using EmbedIO.WebApi;

namespace StaticWebApp.Controller;


public class ApiController : WebApiController
{

    [Route(HttpVerbs.Get, "/status")]
    public object GetStatus()
    {
        try
        {
            object res = new { Message = "ok" };
            return res;
        }
        catch (System.Exception ex)
        {
            throw new Exception("An unhalnded exception occurred at ApiController: " + ex.Message);
        }

    }

    public class PostMessage
    {
        public string? Message { get; set; }
        public bool? Error { get; set; }

    }
    
    [Route(HttpVerbs.Post,"/post")]
    public object PostSomething([JsonData] PostMessage message)
    {
        Console.WriteLine($"Data from Post {message.Message?.ToString()} - {message.Error?.ToString()}");
        Response.Headers["Mi-Header"] = "HeaderRes";
        return new PostMessage {Message="Hello from MAUI",Error=false};
    }
}