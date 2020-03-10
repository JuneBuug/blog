#! /bin/bash

for file in content/wiki/*
do
    if [[ $file == *.md && $file != *'index.md' ]] 

    then 
        echo $file
        mkdir ${file%%.*} 
        cp $file ${file%%.*}/index.mdx 
    fi
done
