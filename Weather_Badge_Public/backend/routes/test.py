import requests

url = 'http://127.0.0.1:5000/change_origin'
my_obj = {'lat': '####', 'lon': '######'}

x = requests.post(url, json=my_obj)

print(x.text)
