from pyowm import OWM


owm = OWM('##################################')
mgr = owm.weather_manager()
observation = mgr.weather_at_place('########')
w = observation.weather
# status = w.detailed_status()
# icon = w.get_weather_icon()
humidity = w.humidity
rain = w.rain
details = w.detailed_status
# print(w)
print()
print('humidity')
print(humidity)
print()
print('details')
print(details)
print()
print('rain?')
if rain == {}:
    print('there is no rain')
else:
    print(rain)
