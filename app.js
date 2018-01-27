const find    = require('find');
const path    = require('path');
const fs      = require('fs');
const express = require('express');
const argv    = require('yargs').argv
var app       = express();
var routes    = require('./routes/index.js');
var ejs       = require('ejs');
var omdb      = require('omdb');
// Only requests to / will be handled by routes

app.use('/', routes);

// Set view engine to EJS
app.use(express.static('views'));
app.use(express.static('public'));
app.set('view engine','ejs')

const dirname = argv.dir || "./";
const cache_dir = argv.cachedir || "../node-file-server"
var err_callback = function (err) {if (err) throw err;}

console.log(`Using ${dirname} as root node for database...`);
console.log("Using" + cache_dir + "to store JSON db");

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

 exports.videos = videos;
 exports.documents = documents;

 app.get('/movies.html', function (req, res) {
 	res.sendFile('/movies.html',{ root: __dirname + "/" })
 });

// Save the created data base
fs.open(`${cache_dir}/videos.json`, 'w', err_callback);
fs.open(`${cache_dir}/documents.json`, 'w', err_callback);
fs.writeFile(`${cache_dir}/videos.json`, videos, 'utf8', err_callback)
fs.writeFile(`${cache_dir}/documents.json`, documents, 'utf8', err_callback)

console.log("Database files successfully written to disk");

app.listen(3000, function () { console.log('Node server started on port 3000!') });