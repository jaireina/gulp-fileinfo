#gulp-fileinfo

## Information

<table>
<tr>
<td>Package</td><td>gulp-fileinfo</td>
</tr>
<tr>
<td>Description</td>
<td>Reads the names of the vynil files that are coming through the pipe or any other properties that you want. You can either show the file list in the console log or get an array with the list of files.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.10</td>
</tr>
</table>

## Usage

```js
var fileinfo = require('gulp-fileinfo');

gulp.task('default', function() {
  return gulp
  				.src('./lib/*.js')
  				.pipe(fileinfo());
});
```

This will output in the console all the list of files coming through the pipe. 

If you need to get the list of files in an array, you can pass a callback as part of the options, that function will receive the list of files in an array as a paramenter

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

By default, the plugin just reads the `relative` property of the files. If you want something different, you can:

### properties
You can get the value of one specific property different to 'relative' passing the name of the property you want to read, like this:
```json
{"properties": "path"}
```

You can also get In this case you need to set the properties prop as an array.
```json
{"properties": ['relative','path','basename']}
```

When the 'properties' value is an array, the filesList array will contain objects (instead of strings) with the properties desired for each file. For instance:

```json
[{"relative":"index.js", "path":"path/to/index.js", "basename":"" }]
```

You can get a list of the Vinyl files properties here: https://github.com/gulpjs/vinyl


