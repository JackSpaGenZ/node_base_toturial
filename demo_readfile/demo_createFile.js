
// The File System module has methods for creating new files:

// fs.appendFile()
// fs.open()
// fs.writeFile()

// var http = require('http');
var fs = require('fs');
  
//just only create a file named mynewfile1.txt: with content : "Hello content"

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

// allow open and edit file if file exist then create a empty file named mynewfile2.txt

fs.open('mynewfile1.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

//alternative a file exist if file doesn't exist create a new file 

fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});