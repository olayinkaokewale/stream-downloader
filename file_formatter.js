const fs = require('fs');

const folderName = "./files";

fs.readdir(folderName, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        console.log(file);
        if(file.endsWith(".txt")) {
            const fileName = file.replace(".txt", "");
            fs.readFile(`./files/${fileName}.txt`, 'utf-8', (err, data) => {
                if (err) throw err;
            
                const links = data.split('\n');
                const newLinks = [];
                for (const link of links) {
                    if (link.startsWith("https://")) {
                        newLinks.push(link);
                    } 
                }
                const stringToSave = JSON.stringify({links: newLinks});
                // console.log(stringToSave, "<== New Links");
                fs.writeFile(`./files/json/${fileName}.json`, stringToSave, (err, data) => {
                    if (err) throw err;
                });
            });
        }
    });
});

