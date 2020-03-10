#!/usr/bin/env python3
import fileinput
import os
import datetime

path = "./content/wiki/"
file_list = os.listdir(path)
path_list = [path + file +
             '/index.mdx' for file in file_list if 'img' not in file]
now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")

for filename in path_list:

	newline = 'updated: ' + now
	with fileinput.FileInput(filename, inplace=True) as file:
		for (index, line) in enumerate(file):
			if index == 1:
				print(line.replace(line, line + newline))
			else:
				print(line, end='')
	file.close()
