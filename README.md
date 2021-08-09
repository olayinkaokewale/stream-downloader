# Online Video Stream Downloader
This program helps to download videos streamed online. It requires a little bit of IT knowledge to be able to use it but I hope to improve it as time goes by.

## Pre-requisites
You need the following to be installed on your Windows/Linux/Mac
1. [Node](https://nodejs.org/)
2. [ffmpeg](https://www.ffmpeg.org/)

## How to install
To install you need to take the following steps:
1. clone this repository on your PC/Mac by running:
> git clone `this repository link`
2. install the required node modules by running:
> npm install

## How to use
1. Open the site you want to download streamed video from
2. Inspect the site and go to the network tab of your developer console (use Chrome for best result)
3. Play and pause the video and wait for the `index.m3u..` file to show up
4. Create a file inside of the `files/` directory and save it as a `.txt` file e.g `1and2.txt` 
5. Copy the content of the `m3u` file and save it inside of your just created `txt` file
6. run `node file_formatter` to create a json files of the links needed to create the full video
7. open the `download.js` file and on `line 10` insert the name of the file you want to download.
8. run `npm start` to start downloading the video.

## Note
This was only tested on Mac, if you have issues running it on a Windows/Linux, please open an issue. Thanks

## Contribute
If you would like to contribute to this project, please fork the repository, make your changes, explain what has changed and push for review. Once accepted, your code would get merged to this project

## Disclaimer
This is made only for educational purposes. Please do not use this software maliciously.