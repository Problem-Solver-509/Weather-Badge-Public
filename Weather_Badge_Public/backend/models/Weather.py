import requests
from pyowm.owm import OWM
import asyncio
from pyowm import OWM



API_KEY = '#######################################'


class Weather:
    def __init__(self, lat=None, lon=None):
        self.lat = lat
        self.lon = lon
        self.location = None


    def locator(self):
        try:
            self.location = requests.get("http://ip-api.com/json/################").json()
            self.lat = round(self.location['lat'], 3)
            self.lon = round(self.location['lon'], 3)
        except ConnectionError as err:
            print('connection error with location ip-api')
            print(err)
        except:
            print('other error in location ip-api')


    @staticmethod
    def _weather_check(latitude, longitude):  # must call with self.bbx_box['??????']
        owm = OWM(API_KEY)
        mgr = owm.weather_manager()
        weather_at_origin = mgr.weather_at_coords(latitude, longitude).weather.status
        return weather_at_origin


    def get_weather(self):
        center = self._weather_check(self.lat, self.lon)
        weather_n = self._weather_check(self.lat + .1, self.lon)
        weather_s = self._weather_check(self.lat - .1, self.lon)
        weather_w = self._weather_check(self.lat, self.lon - .1)
        weather_e = self._weather_check(self.lat, self.lon + .1)
        weather_nn = self._weather_check(self.lat + .2, self.lon)
        weather_ss = self._weather_check(self.lat - .2, self.lon)
        weather_ww = self._weather_check(self.lat, self.lon - .2)
        weather_ee = self._weather_check(self.lat, self.lon + .2)


        out_dict = {'center': center, 'n': weather_n, 'nn': weather_nn, 's': weather_s, 'ss': weather_ss,
                    'w': weather_w, 'ww': weather_ww, 'e': weather_e, 'ee': weather_ee}


        return out_dict


if __name__ == '__main__':
    x1 = Weather()
    x1.locator()
    x2 = x1.get_weather()
    for k, v in x2.items():
        print(k)
        print(v)
        print('=======')
        print()

    print(x2)


# {'center': 'Thunderstorm', 'n': 'Thunderstorm', 'nn': 'Thunderstorm', 's': 'Thunderstorm', 'ss': 'Clouds',
# 'w': 'Thunderstorm', 'ww': 'Clouds', 'e': 'Thunderstorm', 'ee': 'Clouds'}
#
# Process finished with exit code 0

# {'center': 'Fog', 'n': 'Rain', 'nn': 'Rain', 's': 'Fog', 'ss': 'Mist', 'w': 'Fog', 'ww': 'Clouds', 'e': 'Fog',
# 'ee': 'Rain'}

