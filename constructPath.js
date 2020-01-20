var path = require('path');
var fs = require ('fs');
var nav = new Array();

var searchFilesFormPath = function(directoryPathInput){

    var directoryPath =  path.join(__dirname, directoryPathInput);
    files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        nav.push(path.basename(file,'.ejs'));
    });

    return nav;
}

module.exports = {
    searchFilesFormPath: searchFilesFormPath
}