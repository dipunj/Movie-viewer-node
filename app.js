const find    = require('find');
const path    = require('path');
const fs      = require('fs');
const express = require('express');
const argv    = require('yargs').argv
var app       = express();
var things    = require('./things.js');
app.use('/', things);

const dirname = argv.dir || "./";
const cache_dir = argv.cachedir || "../node-file-server"

console.log(dirname);
console.log(cache_dir);
var err_callback = function (err) {if (err) throw err;}


/**
 * Recursively Gets all the files matching regex in dirname
 * @param  {regular expression} regex   regex for filenames
 * @param  {string} dirname parent directory
 * @return {JSON}         contains all the filenames in JSON
 */

function getFiles(regex,dirname) {
	console.log("Collecting database...");
	var list = [];
	var file = find.fileSync(regex, dirname);
	for (var i = file.length - 1; i >= 0; i--) {
		list.push(path.basename(file[i],path.extname(file[i])));
	}
	return list;
}

var videos = getFiles(/\.mp4$|\.mkv$/,dirname);
var documents = getFiles(/\.pdf$|\.txt$/,dirname);



// Save the created data base
fs.open(`${cache_dir}/videos.json`, 'w', err_callback);
fs.open(`${cache_dir}/documents.json`, 'w', err_callback);
fs.writeFile("../node-file-server/videos.json", videos, 'utf8', err_callback)
fs.writeFile("../node-file-server/documents.json", documents, 'utf8', err_callback)

console.log("Database files successfully written to disk");

app.listen(3000, function () { console.log('Node server started on port 3000!') });