import os
import json

concerts = []

with open('./concerts/concerts.json') as f:
    concerts = json.load(f)

concert_images = {}

for concert_id in os.listdir('./concerts/'):
    path = f'./concerts/{concert_id}'
    images_path = f'{path}/fotky'
    poster_path = f'{path}/plagat.jpg'

    if not os.path.isdir(path):
        continue

    concert_images[concert_id] = {
        'poster': None,
        'images': []
    }

    if os.path.exists(poster_path):
        concert_images[concert_id]['poster'] = poster_path[2:]


    if os.path.exists(images_path):

        for image in sorted(os.listdir(images_path)):
            image_path = f'{images_path}/{image}'

            concert_images[concert_id]['images'].append(image_path[2:])

for concert in concerts:
    concert_img = concert_images[concert['id']]
    
    concert['poster'] = concert_img['poster']
    concert['images'] = concert_img['images']

with open('./concerts/concerts.json', 'w') as f:
    json.dump(concerts, f, ensure_ascii=False)
