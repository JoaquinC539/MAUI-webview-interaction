namespace StaticWebApp;
public partial class WebViewPage : ContentPage
{
    
    public WebViewPage()
    {
        InitializeComponent();
        SetUpComponent();
    }

    public void SetUpComponent()
    {
        // WebViewElement.Source = new UrlWebViewSource {Url="https://www.google.com/"};    
        WebViewElement.Source = new UrlWebViewSource { Url = $"http://192.168.1.4:8080?cachebuster={DateTime.Now.Ticks}" };
        WebViewElement.Reload();   
    }
}