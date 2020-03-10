#! /bin/bash

for file in _posts/*
do
    mkdir ${file%%.*}
	cp ${file} ${file%%.*}/index.mdx
done
