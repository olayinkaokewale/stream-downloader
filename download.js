const fs = require('fs');
const Downloader = require('nodejs-file-downloader');
// let videoStitch = require('video-stitch');
// let videoConcat = videoStitch.concat;
const { exec } = require('child_process');

const folderName = "./files/json/";

// Insert your file name here e.g. `1and2` without the file extension
const fileName = "1_and_2";

const jsonFile = require(`${folderName}${fileName}.json`);
const { links } = jsonFile;
// console.log(links[0]);

const cacheFolder = "./files/cache/";
let lastDownloaded = 0
try {
    lastDownloaded = fs.readFileSync(`${cacheFolder}${fileName}`, 'utf-8');
} catch(err) {}

console.log("Last Downloaded: ", lastDownloaded);

// To save last downloaded to cache
const saveToCache = lastDwnld => {
    try {
        fs.writeFileSync(`${cacheFolder}${fileName}`, `${lastDwnld}`);
    } catch(err) {
        console.log("Unable to write to file");
    }
}
// saveToCache(48);

// To download the file
const downloadFolder = "./downloads/";
let downloadFailed = false;
const fileDownload = async (link) => {//Wrapping the code with an async function, just for the sake of example.

    const downloader = new Downloader({
      url: link,//If the file name already exists, a new file with the name 200MB1.zip is created.
      cloneFiles:false,
    //   skipExistingFileName:true,
      maxAttempts:3,//Default is 1.  
      directory: `${downloadFolder}${fileName}`,//This folder will be created, if it doesn't exist.               
    })
    try {
      await downloader.download();//Downloader.download() returns a promise.
      console.log(`${lastDownloaded} Downloaded`);
      saveToCache(lastDownloaded);
    } catch (error) {//IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
      //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
      console.log(`Download failed for: ${lastDownloaded}`);
      downloadFailed = true;
    //   saveToCache(lastDownloaded);
    }
}

// function to merge the clips together
const mergeVideo = () => {
    try {
        const files = [];
        const fileList = fs.readdirSync(`./downloads/${fileName}`);
        fileList.sort((a,b) => Number(a.split("-")[1]) - Number(b.split("-")[1])).forEach(clip => {
            files.push(`./downloads/${fileName}/${clip}`);
        });
        const finalTsFile = `./converted/ts/${fileName}.ts`;
        const catStr = `cat ${files.join(" ")} > ${finalTsFile}`;

        exec(catStr, (err, stdout, stderr) => {
            if (err) console.log(err, "<== Video Merge Error");
            const finalMp4File = `./converted/${fileName}.mp4`;
            const conv2mp4Cmd = `ffmpeg -i ${finalTsFile} -acodec copy -vcodec copy ${finalMp4File}`;
            exec(conv2mp4Cmd, (err, stdout, stderr) => {
                if (err) console.log(err, "<== Video Conversion Error");
            });
        });
    } catch(err) {
        console.log(err, "<== Merging Error");
    }
}

// const downloadPath = "/Users/olayinkaokewale/Desktop/UnimibVideos/downloader/downloads/";
if (lastDownloaded == links.length-1) {
    mergeVideo();
} else {
    (async () => {
        while (!downloadFailed && (lastDownloaded < links.length)) {
            await fileDownload(links[lastDownloaded])
            lastDownloaded++;
        }
    
        // console.log(lastDownloaded, links.length);
        if (lastDownloaded == links.length) mergeVideo()
    })();
}

