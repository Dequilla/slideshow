var slideshows = []; // An object array filled with slideshow-references so we can track all the slideshows on the page

function automaticTransition(name)
{
    nextSlide(name);
}

// Name of the slideshow you want to retrieve
function retrieveSlideshowByName(name)
{
    let result;
    for(i = 0; i < slideshows.length; i++)
    {
        if(slideshows[i].name === name)
        {
            result = slideshows[i];
        }
    }

    return result;
}

// Name is the unique identifier of the slideshow
function goToSlide(name, index)
{
    let slideshow = retrieveSlideshowByName(name);

    // Make sure its a valid index
    if(index < slideshow.slides.length && index >= 0)
    {
        // Fade out the old slide
        slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadein");
        slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadeout");

        // Update center knobs
        slideshow.slideCenterKnobs[slideshow.currentIndex].src = "gfx/center-dot.png";

        // Update the index
        slideshow.currentIndex = index;

        // Fade in the new slide
        slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadein");
        slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadeout");

        // Update center knobs
        slideshow.slideCenterKnobs[slideshow.currentIndex].src = "gfx/center-dot-active.png";
    }
}

// Name is the unique identifier of the slideshow
function nextSlide(name)
{
    let slideshow = retrieveSlideshowByName(name);

    // Fade out the old slide
    slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadein");
    slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadeout");

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = "gfx/center-dot.png";

    slideshow.currentIndex += 1;

    // If slideshow reached its end
    if(slideshow.currentIndex >= slideshow.slides.length)
        slideshow.currentIndex = 0; // Set to first slide

    // Fade in the new slide
    slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadein");
    slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadeout");

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = "gfx/center-dot-active.png";
}

// Name is the unique identifier of the slideshow
function prevSlide(name)
{
    let slideshow = retrieveSlideshowByName(name);

    // Fade out the old slide
    slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadein");
    slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadeout");

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = "gfx/center-dot.png";

    slideshow.currentIndex -= 1;

    // If slideshow reached its end
    if(slideshow.currentIndex < 0)
        slideshow.currentIndex = slideshow.slides.length - 1; // Set to first slide

    // Fade in the new slide
    slideshow.slides[slideshow.currentIndex].classList.add("slideshow-fadein");
    slideshow.slides[slideshow.currentIndex].classList.remove("slideshow-fadeout");

    // Update center knobs
    slideshow.slideCenterKnobs[slideshow.currentIndex].src = "gfx/center-dot-active.png";
}

function createSlide(parentDiv, slideObject, width, height, referenceObject)
{
    let slideWrapper = document.createElement("div");
    slideWrapper.className += " slide";
    parentDiv.appendChild(slideWrapper);
    referenceObject.slides.push(slideWrapper);

    slideWrapper.style.width = "100%";
    slideWrapper.style.height = "100%";
    slideWrapper.style.position = "absolute";
    slideWrapper.classList.add("slideshow-fadeout");

    // Background (can be any css background rule such as hex color, rgba or img url)
    if(undefined !== slideObject["background"])
    {
        // Change the background of the slide
        slideWrapper.style.background = slideObject["background"];
    }

    // Image (an img html element)
    if(undefined !== slideObject["img"])
    {
        let img = document.createElement("img");
        img.className += " slideshow-inner-element";
        img.src = slideObject["img"].src;

        if(undefined !== slideObject["img"].width)
        {
            img.style.width = slideObject["img"].width;
        }

        if(undefined !== slideObject["img"].height)
        {
            img.style.height = slideObject["img"].height;
        }

        slideWrapper.appendChild(img);
    }
}


window.onload = function()
{
    // Get every slideshow on this page
    var parentDivs = document.getElementsByClassName("slideshow");

    // Go through each and every slideshow div and setup it's content
    for(i = 0; i < parentDivs.length; i++)
    {
        // Retrieve URI of json source file
        let parentDiv = parentDivs[i];
        let slideshowSrcURI = parentDiv.getAttribute("data-slide-src");
        let nrOfSlides = 0;
        let slideshowName = parentDiv.getAttribute("data-slide-name");

        // Get the JSON file as a JS object
        $.getJSON(slideshowSrcURI, function(jsonSrcObject) {
            let width = jsonSrcObject.width;
            let height = jsonSrcObject.height;
            nrOfSlides = jsonSrcObject["slides"].length;

            parentDiv.style.width = width;
            parentDiv.style.height = height;

            // Auto transition based on timer?
            if(undefined !== jsonSrcObject["auto-trans"])
            {
                setInterval(function(){automaticTransition(slideshowName)}, jsonSrcObject["auto-trans"]);
            }

            // Create a reference to this slideshow
            let slideshowObject = {
                name: slideshowName,
                wrapper: parentDiv,
                slides: [],
                slideCenterKnobs: [],
                currentIndex: 0
            }
            slideshows.push(slideshowObject);

            for(x = 0; x < jsonSrcObject.slides.length; x++)
            {
                createSlide(parentDiv, jsonSrcObject.slides[x], width, height, slideshowObject);
            }

            let slideshow = retrieveSlideshowByName(slideshowName);
            slideshow.slides[0].classList.add("slideshow-fadein"); // Make sure the first slide is visible

            // Add controls
            let controlWrapper = document.createElement("div");
            controlWrapper.className += " slideshow-control-wrapper";

            // Previous slide button
            let content = '<div class="slideshow-prev-wrapper" onclick="prevSlide(\'' + slideshowName + '\')"><img src="gfx/arrow-left.png" class="slideshow-prev"></img></div>';
            let prev = $.parseHTML(content);
            controlWrapper.appendChild(prev[0]);

            // Center buttons
            let centerWrapper = document.createElement("div");
            centerWrapper.classList.add("slideshow-center-wrapper");
            for(y = 0; y < nrOfSlides; y++)
            {
                let centerbstring = '<img class="slideshow-center" src="gfx/center-dot.png" onclick="goToSlide(\'' + slideshowName + '\',' + y + ')"></img>';
                let centerb = $.parseHTML(centerbstring);
                centerWrapper.appendChild(centerb[0]);
                slideshowObject.slideCenterKnobs[y] = centerb[0];
            }
            controlWrapper.appendChild(centerWrapper);

            // Make sure the first of the center knobs are active
            slideshow.slideCenterKnobs[0].src = "./gfx/center-dot-active.png";

            // Next slide button
            content = '<div class="slideshow-next-wrapper" onclick="nextSlide(\'' + slideshowName + '\')"><img src="gfx/arrow-right.png" class="slideshow-next"></img></div>';
            let next = $.parseHTML(content);
            controlWrapper.appendChild(next[0]);

            parentDiv.appendChild(controlWrapper);
        }); // End json request
    } // End for loop of slideshowDivs
}
