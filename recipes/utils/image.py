import requests, io
from PIL import Image

URL = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
r = requests.get(URL, stream=True)
if r.status_code == 200:
    with io.BytesIO() as b:
        for chunk in r:
            b.write(chunk)

        # img = Image.open(b)
        # img.save("../../media/images/recipes/google.png")
        b.seek(0)
        with open("../../media/images/recipes/google.png", 'wb') as f:
                for chunk in b:
                    f.write(chunk)
