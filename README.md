#gulp-fileinfo

## Information

<table>
<tr>
<td>Package</td><td>gulp-fileinfo</td>
</tr>
<tr>
<td>Description</td>
<td>Reads the names of the vynil files that are coming through the pipe or any other properties that you want (See the <a href="https://github.com/gulpjs/vinyl" target="_blank">Vinyl docs</a> for a full list of properties). You can either show the file list in the console or get an array with the list of files.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```js
var gulp = require('gulp');
var fileinfo = require('gulp-fileinfo');

gulp.task('default', function() {
  return gulp
  	.src('./lib/*.js')
  	.pipe(fileinfo());
});
```

This will output to the console the list of files coming through the pipe.

If you need to get the list of files in an array, you can pass a callback function as part of the options, that function will receive the list of files in an array as a paramenter

```js
var fileinfo = require('gulp-fileinfo');

gulp.task('default', function() {
  var doSomethingWithTheFilesList = function (filesList){
    //do something with the filesList array here
  }
  
  gulp
    .src('./lib/*.js')
	  .pipe(fileinfo({ callback: doSomethingWithTheFilesList }));
});

```

The fileList variable will be an array of strings containing the name of the files in the pipe.

## Options

By default, the gulp only reads the `relative` property of the files. If you want something different, you can use:

### options.properties
Specifies the name of the property you want to read (instead of reading the `relative` property) from the files in the pipe, like this:
```json
{"properties": "path"}
```

If you want to read more than one properties at once, you need to set the `properties` property as an array of all the properties you want to read.
```json
{"properties": ["relative","path","basename"]}
```

When the `properties` value is an array, the filesList array will contain objects (instead of strings), for instance:

```json
[{"relative":"index.js", 
  "path":"path/to/index.js", 
  "basename":"" }]
```

You can get a full list of the Vinyl files properties here: https://github.com/gulpjs/vinyl


### options.callback
Callback function that will be invoked once all the files have been read. It receives as a parameter the filesList array containing all the info read from the files in the pipe.
