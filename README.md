# ![logo](https://github.com/jolav/geoip-tools/blob/master/_public/icons/geoip48.png?raw=true) **[GEOIP-TOOLS](https://geoip.tools)**  


Web server that retrieves geolocation information from any IPv4, IPv6 or hostname.

Free GeoIP service that provides a public HTTPS (SSL access) API to retrieve geolocation information from any IPv4, IPv6 or hostname.

version 0.1.9

### **[API DOCS](https://geoip.tools)**

HTTP Request Template:  
`GET https://geoip.tools/v1/{format}/?q={IP-or-hostname}`

<span>Supported formats : <span class="red">json</span>, <span class="red">xml</span></span> and <span class="red">csv</span><br>
<span>If no IP or hostname is provided it retrieves your own IP</span><br>
<span>IPv4 and IPv6 supported</span><br><br>


* **Examples:**  

[https://geoip.tools/v1/json](https://geoip.tools/v1/json)  


[https://geoip.tools/v1/json/?q=geoip.tools](https://geoip.tools/v1/json/?q=geoip.tools)
 
 
[https://geoip.tools/v1/xml/?q=94.177.251.222](https://geoip.tools/v1/xml/?q=94.177.251.222)
 
[https://geoip.tools/v1/xml/?q=2a00:1450:4006:803::200e](https://geoip.tools/v1/xml/?q=2a00:1450:4006:803::200e)


* **Usage Limits:**  

120 requests per minute. Once reached subsequent requests will result in error 503 until your quota is cleared.  
If you need more quota contact us.  
Our API requires no key or signup.

* **Example** 

```json
{   
  "ip": "192.168.200.200",
  "country_code": "GB",
  "country_name": "United Kingdom",
  "region_code": "ENG",
  "region_name": "England",
  "city": "London",
  "zip_code": "SL1",
  "time_zone": "Europe/London",
  "latitude": 50.0500,
  "longitude": 0.6172   
}
```

<hr>

## **Acknowledgment**

* This site includes GeoLite2 data created by MaxMind, available from [maxmind.com](http://maxmind.com)
