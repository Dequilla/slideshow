# Table of contents
* [1. Usage](#Usage)
  * [1.1 Inclusion](#Inclusion)
  * [1.2 Use](#Use)
* [2. Source](#Source)
  * [2.1 Definitions](#Definitions)
  * [2.2 Outer](#Outer)
  * [2.3 Inner](#Inner)

---

## __1. Usage__
### 1.1 Inclusion
To use the slideshows you will need to include some scripts and CSS in your html files head.
```html
<script src="./jquery-3.2.1.min.js"></script>
<script src="./slideshow.js"></script>

<!-- General CSS rules to make slideshows function -->
<link rel="stylesheet" type="text/css" href="gfx/slideshow.css" />

<!-- Theme CSS rules deciding how everything inside the slideshows should look -->
<link rel="stylesheet" type="text/css" href="themes/original.css" />
```


### 1.2 Use
After you have included the necessary files all you need to do is create a JSON file that represents your slideshow:
```json
{
    "width":"100%",
    "height":"100%",
    "auto-trans":4000,
    "transition":"scroll",
    "transition-duration":"1.0s",
    "slides":[
        {"background":"#FFF", "img":{"src":"example-content/BIG.png","width":"100%","height":"100%"}},
        {"background":"#FFF", "img":{"src":"example-content/RESPONSIVE.png","width":"100%","height":"100%"}},
        {"background":"#FFF", "img":{"src":"example-content/office.jpeg","width":"100%","height":"100%"}}
    ]
}
```
And then include it in your html like so:
```html
<div class="slideshow" data-slide-name="a_unique_identifier" data-slide-src="path/to/json/src"></div>
```
(All the attributes are necessary, that includes the class)

---

## __2. Source__
### 2.1 Definitions
Each and every JSON source file will contain a bunch of definitons of what it will contain and how it will look. Some of these represents CSS rules and can therefore be treated as such whilst some of them are normal numbers, strings etc.

If you are unfamiliar with JSON you can look through [here](https://www.w3schools.com/js/js_json_intro.asp).

### 2.2 Outer
Here I will list all the outer attributes that has an effect on the whole slideshow:

 * __width__: CSS rule corresponding to the size of the slideshow
 * __height__: CSS rule corresponding to the size of the slideshow
 * __auto-trans__: A number that represents how fast it should change slide, omit to not have automatic transitions
 * __transition__: A string representing what type of transition to use (fade or scroll)
 * __transition-duration__: A CSS rule that decides how long every transition will take
 * __slides__: A JSON array containing all the slides

### 2.3 Inner
Here I will list all the inner attributes that has an effect upon the slides:
 * __background__: Same as CSS background, can be an img or color
 * __img__: A image, similar to background except you have more controll over the styling
   * __src__: Path to the source image
   * __width__: CSS width
   * __height__: CSS height
