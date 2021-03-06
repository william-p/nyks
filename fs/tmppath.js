"use strict";

const fs   = require('fs');
const path = require('path');
const os   = require('os');
const crypto = require('crypto');

var exitListenerAttached = false;
var filesToDelete = [];

function deleteOnExit(file_path) {
  if(!exitListenerAttached) {
    process.on('exit', cleanupFilesSync);
    process.on('fsgc', cleanupFilesSync); //force cleanup

    //makes sure exit is called event on sigint \o/
    process.on('SIGINT', process.exit);
    exitListenerAttached = true;
  }

  filesToDelete.push(file_path);
}


function cleanupFilesSync() {
  var toDelete;
  while((toDelete = filesToDelete.shift()) !== undefined) {
    try {
      if(fs.existsSync(toDelete))
        fs.unlinkSync(toDelete);
    } catch(err) {} //maybe buzy
  }
}


function tmppath(ext, trash, len) {
  ext = ext || "tmp"; len = len || 8;
  if(trash === undefined) trash = true;

  var body = crypto.randomBytes(len).toString('base64').replace(/\//g, '+').substr(0, len);
  var fname = ext + "-" + body + "." + ext;
  var file_path = path.join(os.tmpdir(), fname);

  var fullpath = fs.existsSync(file_path) ? tmppath(ext, trash, len + 1) : file_path;
  if(trash)
    deleteOnExit(fullpath);

  return fullpath;
}

module.exports = tmppath;
