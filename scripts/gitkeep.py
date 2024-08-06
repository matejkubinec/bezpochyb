import os

for dir in os.listdir('./concerts/'):
    path = f'./concerts/{dir}'

    if not os.path.isdir(path):
        continue

    with open(f'{path}/.gitkeep', 'w') as f:
        f.write('')
