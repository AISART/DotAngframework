using Microsoft.AspNetCore.Http;

namespace DotAng.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Erro", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-control-Allow-Origin", "*");
        }
    }
}