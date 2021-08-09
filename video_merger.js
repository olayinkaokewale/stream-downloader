// let videoStitch = require('video-stitch');
const fs = require('fs');
// let videoConcat = videoStitch.concat;
const { exec } = require('child_process');

try {
    // const concatClipsFormat = [
    //     { "fileName": "./downloads/11/seg-4-v1-a1.ts" },
    //     { "fileName": "./downloads/11/seg-5-v1-a1.ts" },
    //     { "fileName": "./downloads/11/seg-6-v1-a1.ts" },
    //     { "fileName": "./downloads/11/seg-7-v1-a1.ts" },
    //     { "fileName": "./downloads/11/seg-8-v1-a1.ts" },
    //     { "fileName": "./downloads/11/seg-9-v1-a1.ts" },
    //     { "fileName": "./downloads/11/seg-10-v1-a1.ts" },
    // ];
    // videoConcat({
    //     silent: true, // optional. if set to false, gives detailed output on console
    //     overwrite: false
    // })
    // .clips(concatClipsFormat)
    // .output(`downloads/001.mp4`)
    // .concat()
    // .then(outputFileName => {
    //     console.log("Output File: ", outputFileName)
    // })
    // .catch(err => {
    //     console.log(err, "<== Concat Error");
    // });

    const folderName = "9_and_10";
    const files = [];
    const fileList = fs.readdirSync(`./downloads/${folderName}`);
    fileList.sort((a,b) => Number(a.split("-")[1]) - Number(b.split("-")[1])).forEach(clip => {
        files.push(`./downloads/${folderName}/${clip}`);
    });
    const finalTsFile = `./downloads/${folderName}/${folderName}.ts`;
    const catStr = `cat ${files.join(" ")} > ${finalTsFile}`;

    exec(catStr, (err, stdout, stderr) => {
        if (err) console.log(err, "<== Video Merge Error");
        const finalMp4File = `./converted/${folderName}.mp4`;
        const conv2mp4Cmd = `ffmpeg -i ${finalTsFile} -acodec copy -vcodec copy ${finalMp4File}`;
        exec(conv2mp4Cmd, (err, stdout, stderr) => {
            if (err) console.log(err, "<== Video Conversion Error");
        });
    });
} catch(err) {
    console.log(err, "<== Merging Error");
}