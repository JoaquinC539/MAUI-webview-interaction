using System.Web;

namespace StaticWebApp;
public partial class WebViewPage : ContentPage
{
    
    public WebViewPage()
    {
        InitializeComponent();

        WebViewElement.Navigating +=NavigatingHandler;
        SetUpComponent();        
    }

    public void SetUpComponent()
    {
        // WebViewElement.Source = new UrlWebViewSource {Url="https://www.google.com/"};    
        WebViewElement.Source = new UrlWebViewSource { Url = $"http://192.168.1.4:5173/?cachebuster={DateTime.Now.Ticks}" };        
        WebViewElement.Reload();
    }
    
    public void NavigatingHandler(object sender, WebNavigatingEventArgs e)
    {
        Console.WriteLine("URL navegating to " + e.Url);
        if (!e.Url.Contains("cachebuster"))
        {
            e.Cancel = true;
            UriBuilder urlBuilder = new UriBuilder(e.Url);
            var query = HttpUtility.ParseQueryString(urlBuilder.Query);
            query["cachebuster"] = DateTime.Now.Ticks.ToString();
            urlBuilder.Query = query.ToString();
            string finalUrl = urlBuilder.ToString();
            Console.WriteLine("Changing url to: " + finalUrl);
            WebViewElement.Source = new UrlWebViewSource { Url = finalUrl };
        }
    }
}