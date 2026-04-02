import urllib.request, urllib.parse, re

try:
    query = 'maternity photography newborn doula'
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'src=\"(//external-content\.duckduckgo\.com/iu/\?u=.*?)\"', html)
    if not matches:
        print('No matches')
    else:
        for i, m in enumerate(matches[:3]):
            img_url = 'https:' + m
            img_url = urllib.parse.unquote(img_url.split('u=')[1].split('&')[0])
            print(f'Downloading {img_url}')
            urllib.request.urlretrieve(img_url, f'duck_img_{i}.jpg')
            print(f'Saved duck_img_{i}.jpg')
except Exception as e:
    print(e)
