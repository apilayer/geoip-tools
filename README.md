
![Maintained YES](https://img.shields.io/badge/Maintained%3F-yes-green.svg)  
![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

# ![logo](https://github.com/jolav/geoip-tools/blob/master/_public/icons/geoip128.png?raw=true) **[GEOIP-TOOLS](https://geoip.tools)**  


Free GeoIP service that provides a public HTTPS (SSL access) API to retrieve geolocation information from any IPv4, IPv6 or hostname.

version 0.2.4

### **[API DOCS](https://geoip.tools)**

HTTP Request Template:  
`GET https://geoip.tools/v1/{format}/?q={IP-or-hostname}`

<span>Supported formats : <span class="red">json</span>, <span class="red">xml</span></span> and <span class="red">csv</span><br>
<span>If no IP or hostname is provided it retrieves your own IP</span><br>
<span>IPv4 and IPv6 supported</span><br>
<span>CORS support out of the box makes geoip.tools perfect to your front end apps</span><br>


* **Examples:**  

[https://geoip.tools/v1/json](https://geoip.tools/v1/json)  


[https://geoip.tools/v1/json/?q=geoip.tools](https://geoip.tools/v1/json/?q=geoip.tools)
 
 
[https://geoip.tools/v1/xml/?q=192.168.200.200](https://geoip.tools/v1/xml/?q=192.168.200.200)
 
[https://geoip.tools/v1/xml/?q=2a00:1450:4006:803::200e](https://geoip.tools/v1/xml/?q=2a00:1450:4006:803::200e)


* **Usage Limits:**  

300 requests per minute (432.000 API requests daily). Once reached subsequent requests will result in error 503 until your quota is cleared.  
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
