# Slideshow
A small slideshow library for webbapps.

## Usage
Every slideshow is meant to be defined with a json document and to add it to the source page you just include it:
```html
<script src="./slideshow.js"></script>
<script src="./jquery-3.2.1.min.js"></script>
<link rel="stylesheet" ,="" type="text/css" href="slideshow.css">
```
Then you can create one using:

```html
<div class="slideshow" data-slide-name="a_unique_identifier" data-slide-src="path/to/json/file"></div>
```
