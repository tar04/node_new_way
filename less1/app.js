const fs = require("fs");
const path = require("path");

//Є дві папки із хлопчиками та дівчатками, випадково розкиданими, потрібно посортувати їх по папках

// function formatPeople(folder1, folder2) {
//
//     fs.readdir(`${folder1}`, (err, files) => {
//         err && console.log(err);
//
//         let param = 'male';
//         if (folder1.includes('boys')) {
//             param = 'female'
//         }
//
//         for (let file of files) {
//
//             fs.readFile(`${folder1}/${file}`, (err1, data) => {
//                 err && console.log(err1 );
//
//                 const singlePerson = JSON.parse(data);
//
//                 if (singlePerson.gender === param) {
//
//                     fs.rename(`${folder1}/${file}`, `${folder2}/${file}`, err2 => {
//                         err2 && console.log(err2)
//                     })
//                 }
//             })
//         }
//     })
// }
//
// formatPeople('./boys', './girls');
// formatPeople('./girls', './boys');

//Є папка із великою вкладеністю, потрібно витягнути усі файли наверх

function flatFiles(dir = './test') {

    fs.readdir(dir, (err, files) => {
        err && console.log(err);

        for (const file of files) {

            fs.stat(path.resolve(dir, file), (err1, stats) => {
                err1 && console.log(err1);

                if (stats.isDirectory()) {
                    flatFiles(path.resolve(dir, file));
                } else {
                    fs.rename(path.resolve(dir, file), `./test/${file}`, err2 => {
                        err2 && console.log(err2)
                    })
                }

            })

        }
    })
}

flatFiles();