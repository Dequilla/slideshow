var deq_slideshows = []; // An object array filled with slideshow-references so we can track all the slideshows on the page
var controlImagePaths = {
    imageLeft: "",
    imageRight: "",
    imageCenter: "",
    imageCenterActive: ""
}

function deq_getMetaTagByName(name)
{
    var tags = document.getElementsByTagName("META");
    let result = "";
    for(i = 0; i < tags.length; i++)
    {
        if(tags[i].name === name)
        {
            result = tags[i];
        }
    }

    return result;
}

function deq_addLoadEvent(func)
{
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

function deq_automaticTransition(name)
{
    let slideshow = deq_retrieveSlideshowByName(name);

    if(slideshow.delayTransition === false)
    {
        deq_nextSlide(name);
    }

    // Reset the delay if we passed it
    slideshow.delayTransition = false;
}

// Name of the slideshow you want to retrieve
function deq_retrieveSlideshowByName(name)
{
    let result;
    for(i = 0; i < deq_slideshows.length; i++)
    {
        if(deq_slideshows[i].name === name)
        {
            result = deq_slideshows[i];
        }
    }

    return result;
}

// Name is the unique identifier of the slideshow
function deq_goToSlide(name, index)
{
    let slideshow = deq_retrieveSlideshowByName(name);

    // Make sure its a valid index
    if(index < slideshow.slides.length && index >= 0)
    {
        // Make sure the user doesn't get auto changed on instantly
        slideshow.delayTransition = true;

        // Fade out the old slide
        if(slideshow.transition === "fade")
        {
            slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadein");
            slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadeout");
        }

        // Update center knobs
        slideshow.slideCenterKnobs[slideshow.currentIndex].src = controlImagePaths.imageCenter;

        // Update the index
        slideshow.currentIndex = index;

        // Fade in the new slide
        if(slideshow.transition === "fade")
        {
            slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadein");
            slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadeout");
        }

        // Update center knobs
        slideshow.slideCenterKnobs[slideshow.currentIndex].src = controlImagePaths.imageCenterActive;

        // Transition using scroll
        if(slideshow.transition === "scroll")
        {
            let positionString = "-" + slideshow.currentIndex + "00%";
            slideshow.wrapperInner.style.transform = "translateX(" + positionString + ")";
        }
    }
}

// Name is the unique identifier of the slideshow
function deq_nextSlide(name)
{
    let slideshow = deq_retrieveSlideshowByName(name);

    // Make sure the user doesn't get auto changed on instantly
    slideshow.delayTransition = true;

    // Fade transition - fade out old
    if(slideshow.transition === "fade")
    {
        slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadein");
        slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadeout");
    }

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = controlImagePaths.imageCenter;

    // Update index
    slideshow.currentIndex += 1;

    // If slideshow reached its end
    if(slideshow.currentIndex >= slideshow.slides.length)
        slideshow.currentIndex = 0; // Set to first slide

    // Fade transition - fade in new
    if(slideshow.transition === "fade")
    {
        slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadein");
        slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadeout");
    }

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = controlImagePaths.imageCenterActive;

    if(slideshow.transition === "scroll")
    {
        let positionString = "-" + slideshow.currentIndex + "00%";
        slideshow.wrapperInner.style.transform = "translateX(" + positionString + ")";
    }
}

// Name is the unique identifier of the slideshow
function deq_prevSlide(name)
{
    let slideshow = deq_retrieveSlideshowByName(name);

    // Make sure the user doesn't get auto changed on instantly
    slideshow.delayTransition = true;

    // Fade transition - fade out old
    if(slideshow.transition === "fade")
    {
        slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadein");
        slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadeout");
    }

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = controlImagePaths.imageCenter;

    // Update index
    slideshow.currentIndex -= 1;

    // If slideshow reached its end
    if(slideshow.currentIndex < 0)
        slideshow.currentIndex = slideshow.slides.length - 1; // Set to first slide

    // Fade in the new slide
    if(slideshow.transition === "fade")
    {
        slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadein");
        slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadeout");
    }

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = controlImagePaths.imageCenterActive;

    if(slideshow.transition === "scroll")
    {
        let positionString = "-" + slideshow.currentIndex + "00%";
        slideshow.wrapperInner.style.transform = "translateX(" + positionString + ")";
    }
}

function deq_createSlide(parentDiv, slideObject, width, height, referenceObject, slideNr, transDur)
{
    let slideWrapper = document.createElement("div");
    slideWrapper.className += " slide";
    parentDiv.appendChild(slideWrapper);
    referenceObject.slides.push(slideWrapper);

    if(referenceObject.transition === "fade")
    {
        slideWrapper.classList.add("slideshow-fadeout");
        slideWrapper.style["transition-duration"] = transDur;
    }
    else if(referenceObject.transition === "scroll")
    {
        // Move them to a position accordingly
        referenceObject.wrapperInner.classList.add("slideshow-scroll");
        referenceObject.wrapperInner.style["transition-duration"] = transDur;
    }
    else
    {
        // Otherwise use fade
        slideWrapper.classList.add("slideshow-fadeout");
        slideWrapper.style["transition-duration"] = transDur;

        console.log("SLIDESHOW: Your specified transition does not match any supported. (scroll or fade)");
    }

    // Background (can be any css background rule such as hex color, rgba or img url)
    if(undefined !== slideObject["background"])
    {
        // Change the background of the slide
        slideWrapper.style.background = slideObject["background"];
    }

    // Links - always first element
    let links = slideObject["links"];
    if(undefined !== links)
    {
        for(l = 0; l < links.length; l++)
        {
            let link = document.createElement("a");
            link.href = links[l].url;

            if(undefined !== links[l].width)
                link.style.width = links[l].width;
            else
                link.style.width = "100%";

            if(undefined !== links[l].height)
                link.style.height = links[l].height;
            else
                link.style.height = "100%";

            if(undefined !== links[l].top)
                link.style.top = links[l].top;
            else
                link.style.top = "0";

            if(undefined !== links[l].left)
                link.style.left = links[l].left;
            else
                link.style.left = "0";

            if(undefined !== links[l].in)
            {
                if(links[l].in === "new")
                {
                    link.setAttribute("target", "_blank");
                }
                else if(links[l].in === "same")
                {
                    link.setAttribute("target", "_self");
                }
                else
                {
                    link.setAttribute("target", "_self");
                }
            }
            else
            {
                link.setAttribute("target", "_blank");
            }

            link.classList.add("slideshow-link");
            //link.classList.add("slideshow-inner-element");

            slideWrapper.appendChild(link);
        }
    }

    // Image (an img html element)
    if(undefined !== slideObject["img"])
    {
        let img = document.createElement("img");
        img.className += " slideshow-inner-element";
        img.src = slideObject["img"].src;

        slideWrapper.appendChild(img);
    }

}

function deq_init()
{
    // Get every slideshow on this page
    var parentDivs = document.getElementsByClassName("slideshow");

    // Load our general css
    $('head').append('<!-- General css rules for slideshows -->\n<link rel="stylesheet" type="text/css" href="slideshow/slideshow.css">');

    // Load the theme
    let theme = deq_getMetaTagByName("slideshow").getAttribute("theme");
    if(theme === "") theme = "original";
    let themeURI = "slideshow/themes/" + theme + "/theme.json";
    $.getJSON(themeURI, function(themeSrcObject) {
        let cssURI = "slideshow/themes/" + theme + "/" + themeSrcObject["css-src"];

        // Load in css theme file
        $('head').append('<!-- Theme css rules for slideshows -->\n<link rel="stylesheet" type="text/css" href="' + cssURI + '">')

        controlImagePaths.imageLeft = "slideshow/themes/" + theme + "/" + themeSrcObject["arrow-left"];
        controlImagePaths.imageRight = "slideshow/themes/" + theme + "/" + themeSrcObject["arrow-right"];
        controlImagePaths.imageCenter = "slideshow/themes/" + theme + "/" + themeSrcObject["center-dot"];
        controlImagePaths.imageCenterActive = "slideshow/themes/" + theme + "/" + themeSrcObject["center-dot-active"];

        // Go through each and every slideshow div and setup it's content
        for(i = 0; i < parentDivs.length; i++)
        {
            // Retrieve URI of json source file
            let parentDiv = parentDivs[i];
            let slideshowSrcURI = parentDiv.getAttribute("data-slide-src");
            let nrOfSlides = 0;
            let slideshowName = parentDiv.getAttribute("data-slide-name");
            let transitionType = "fade";
            let transitionDuration = "1.0s";

            let parentInnerDiv = document.createElement("div");
            parentDiv.appendChild(parentInnerDiv);

            // Get the JSON file as a JS object
            $.getJSON(slideshowSrcURI, function(jsonSrcObject) {
                let width = jsonSrcObject.width;
                let height = jsonSrcObject.height;
                nrOfSlides = jsonSrcObject["slides"].length;

                // Auto transition based on timer?
                if(undefined !== jsonSrcObject["auto-trans"])
                {
                    setInterval(function(){deq_automaticTransition(slideshowName)}, jsonSrcObject["auto-trans"]);
                }

                // What type of transition does it have
                if(undefined !== jsonSrcObject["transition"])
                {
                    transitionType = jsonSrcObject["transition"];
                }
                else // If none specified use fade
                {
                    transitionType = "fade";
                }

                // Duration of transition
                if(undefined !== jsonSrcObject["transition-duration"])
                {
                    transitionDuration = jsonSrcObject["transition-duration"];
                }
                else
                {
                    transitionDuration = "1.0s";
                }

                // Create a reference to this slideshow
                let slideshowObject = {
                    name: slideshowName,
                    wrapper: parentDiv,
                    wrapperInner: parentInnerDiv,
                    slides: [],
                    slideCenterKnobs: [],
                    transition: transitionType,
                    currentIndex: 0,
                    delayTransition: false
                }
                deq_slideshows.push(slideshowObject);

                for(x = 0; x < jsonSrcObject.slides.length; x++)
                {
                    deq_createSlide(parentInnerDiv, jsonSrcObject.slides[x], width, height, slideshowObject, x, transitionDuration);
                }

                let slideshow = deq_retrieveSlideshowByName(slideshowName);
                if(slideshowObject.transition === "fade")
                {
                    slideshow.slides[0].classList.add("slideshow-fadein"); // Make sure the first slide is visible
                }
                else if(slideshowObject.transition === "scroll")
                {

                }

                // Add controls
                // let controlWrapper = document.createElement("div");
                // controlWrapper.className += " slideshow-control-wrapper";

                // Previous slide button
                let content = '<div class="slideshow-prev-wrapper" onclick="deq_prevSlide(\'' + slideshowName + '\')"><img src="' + controlImagePaths.imageLeft + '" class="slideshow-prev"></img></div>';
                let prev = $.parseHTML(content);
                parentDiv.appendChild(prev[0]);

                // Center buttons
                let centerWrapper = document.createElement("div");
                centerWrapper.classList.add("slideshow-center-wrapper");
                for(y = 0; y < nrOfSlides; y++)
                {
                    let centerbstring = '<img class="slideshow-center" src="' + controlImagePaths.imageCenter + '" onclick="deq_goToSlide(\'' + slideshowName + '\',' + y + ')"></img>';
                    let centerb = $.parseHTML(centerbstring);
                    centerWrapper.appendChild(centerb[0]);
                    slideshowObject.slideCenterKnobs[y] = centerb[0];
                }
                parentDiv.appendChild(centerWrapper);

                // Make sure the first of the center knobs are active
                slideshow.slideCenterKnobs[0].src = controlImagePaths.imageCenterActive;

                // Next slide button
                content = '<div class="slideshow-next-wrapper" onclick="deq_nextSlide(\'' + slideshowName + '\')"><img src="' + controlImagePaths.imageRight + '" class="slideshow-next"></img></div>';
                let next = $.parseHTML(content);
                parentDiv.appendChild(next[0]);

                // parentDiv.appendChild(controlWrapper);
            }); // End json request
        } // End for loop of slideshowDivs
    }); // End load json for theme
}

// Add deq_init() to window.onload
deq_addLoadEvent(deq_init);
