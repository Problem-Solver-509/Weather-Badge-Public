import requests
from pyowm.owm import OWM
import asyncio
from pyowm import OWM



API_KEY = '###############################'


class LocWeather:
    def __init__(self, lat=None, lon=None):
        self.lat = None
        self.lon = None
        self.location = None
        self.bbx_box = None

    def locator(self):
        try:
            self.location = requests.get("http://ip-api.com/json/##############").json()
            self.lat = round(self.location['lat'], 3)
            self.lon = round(self.location['lon'], 3)
        except ConnectionError as err:
            print('connection error with location ip-api')
            print(err)
        except:
            print('other error in location ip-api')

    def bbx_creator(self):


        loc_center = {'lon_left': round(self.lon + .01, 3), 'lon_right': round(self.lon - .01, 3),
                      'lat_bot': round(self.lat - .01, 3), 'lat_top': round(self.lat + .01, 3)}

        loc_n = {'lon_left': round(self.lon + .1, 3), 'lon_right': round(self.lon - .1, 3),
                 'lat_bot': round(self.lat - .01, 3), 'lat_top': round(self.lat + .1, 3)}

        loc_s = {'lon_left': round(self.lon + .1, 3), 'lon_right': round(self.lon - .1, 3),
                 'lat_bot': self.lat - .1, 'lat_top': self.lat - .01}

        loc_w = {'lon_left': round(self.lon + .1, 3), 'lon_right': round(self.lon + .01, 3),
                 'lat_bot': self.lat - .1, 'lat_top': round(self.lat + .1, 3)}

        loc_e = {'lon_left': round(self.lon - .01, 3), 'lon_right': round(self.lon - .1, 3),
                 'lat_bot': round(self.lat - .1, 3), 'lat_top': round(self.lat + .1, 3)}

        self.bbx_box = {'loc_center': loc_center, 'loc_n': loc_n, 'loc_s': loc_s,
                        'loc_w': loc_w, 'loc_e': loc_e}
        return 'Location bbx complete'

    @staticmethod
    def _weather_check(box):  # must call with self.bbx_box['??????']
        owm = OWM(API_KEY)
        mgr = owm.weather_manager()
        weather_at_origin = mgr.weather_at_places_in_bbox(box['lon_left'],
                                                          box['lat_bot'],
                                                          box['lon_right'],
                                                          box['lat_top'], zoom=5)
        return weather_at_origin


    def get_weather(self):
        out_dict = {}
        for k, v in self.bbx_box.items():
            print(k)
            print(v)
            print('========')
            print()
        for k, v in self.bbx_box.items():
            x1 = self._weather_check(v)
            out_dict[k] = x1

        return out_dict


if __name__ == '__main__':
    # y1 = LocWeather()
    # y1.locator()
    # y1.bbx_creator()
    # beleza = y1.get_weather()
    # for i in beleza:
    #     print(i.current.temp['feels_like'])
    #
    #
    owm = OWM(API_KEY)
    mgr = owm.weather_manager()
    obs_list = mgr.weather_at_places_in_bbox('#######, #######, #######, #######, zoom=5')

