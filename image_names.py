import os
import json

images_path = "./images"
dir_list = os.listdir(images_path)
print(dir_list)

img_dict = {}

for entry in dir_list:
    subpath = images_path + "/" + entry
    if os.path.isdir(subpath):
        sublist = os.listdir(subpath)
        img_dict[entry] = sublist
print(img_dict)

with open('./scripts/image_names.json', 'w', encoding='utf-8') as f:
    json.dump(img_dict, f, ensure_ascii=False, indent=4)
