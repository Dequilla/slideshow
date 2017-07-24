# Slideshow
A small slideshow library for webbapps.

## Try it out!
You can take a look at it in action [here](https://dequilla.github.io/slideshow/)

And learn more about how to use it [here](https://github.com/Dequilla/slideshow/blob/master/WIKI.md)

To try it out locally without a server you will need to use firefox since chromes security in loading files locally is too strict.

Otherwise upload this to a server and it should work.

## Usage
Every slideshow is meant to be defined with a json document and to add it to the source page you just include it:
```html
<script src="./slideshow.js"></script>
<script src="./jquery-3.2.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="slideshow.css">
```
Then you can create one using:

```html
<div class="slideshow" data-slide-name="a_unique_identifier" data-slide-src="path/to/json/file"></div>
```


## JSON structure
Here is an example slideshow.
```json
{
    "width":"100%",
    "height":"100%",
    "auto-trans":4000,
    "slides":[
        {"background":"#FFF", "img":{"src":"example-content/BIG.png","width":"100%","height":"100%"}},
        {"background":"#FFF", "img":{"src":"example-content/RESPONSIVE.png","width":"100%","height":"100%"}},
        {"background":"#FFF", "img":{"src":"example-content/office.jpeg","width":"100%","height":"100%"}}
    ]
}
```

Alot of the rules you can include are just straight up CSS rules such as:
 - width
 - height
 - background

Some have a sort of special layout such as:
 - auto-trans wich takes a number(no quotes) that represents how fast in milliseconds it should rotate
