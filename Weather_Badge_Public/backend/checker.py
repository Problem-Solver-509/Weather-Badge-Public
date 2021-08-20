import requests
from pyowm import OWM
from pyowm.owm import OWM

API_key = '##################################'


response_1 = requests.get("http://ip-api.com/json/###############").json()
print('my lat and lon')
print(response_1["lat"], response_1['lon'])
lat = response_1['lat']
lon = response_1['lon']
response_2 = OWM("api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}")


owm = OWM(API_key)
mgr = owm.weather_manager()
one_call = mgr.one_call(lat, lon)

# function to take in lat and lon and return a bbx list of coordinates for weather_at_origin
lon_left, lat_bottom, lon_right, lat_top = 0, 0, 0, 0

weather_lon_lat = OWM("api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}")

# weather_at_bbx = mgr.weather_at_places_in_bbox(lon_left, lat_bottom, lon_right, lat_top, zoom=5)

# print(weather_lon_lat)

temperature = one_call.current.temp['feels_like']
rain = one_call.current.rain
done_temp = (temperature - 273.15) * 1.8 + 32
print()
print('houston feels like')
print(round(done_temp, 1))





weather_at_origin = mgr.weather_at_coords(lat, lon).weather.status
print(weather_at_origin)
