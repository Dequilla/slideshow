var slideshows = []; // An object array filled with slideshow-references so we can track all the slideshows on the page

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

function nextSlide(name)
{
    let slideshow = retrieveSlideshowByName(name);
    slideshow.slides[slideshow.currentIndex].style.display = "none";
    slideshow.currentIndex += 1;

    // If slideshow reached its end
    if(slideshow.currentIndex >= slideshow.slides.length)
        slideshow.currentIndex = 0; // Set to first slide

    slideshow.slides[slideshow.currentIndex].style.display = "block";
}

function prevSlide(name)
{
    let slideshow = retrieveSlideshowByName(name);
    slideshow.slides[slideshow.currentIndex].style.display = "none";
    slideshow.currentIndex -= 1;

    // If slideshow reached its end
    if(slideshow.currentIndex < 0)
        slideshow.currentIndex = slideshow.slides.length - 1; // Set to first slide

    slideshow.slides[slideshow.currentIndex].style.display = "block";
}

function createSlide(parentDiv, slideObject, width, height, referenceObject)
{
    let slideWrapper = document.createElement("div");
    slideWrapper.className += " slide";
    parentDiv.appendChild(slideWrapper);
    referenceObject.slides.push(slideWrapper);

    slideWrapper.style.width = width;
    slideWrapper.style.height = height;
    slideWrapper.style.display = "none";

    // background
    if(undefined !== slideObject["background"])
    {
        // Change the background of the slide
        slideWrapper.style.background = slideObject["background"];
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
            nrOfSlides = jsonSrcObject.slides.length;

            // Create a reference to this slideshow
            let slideshowObject = {
                name: slideshowName,
                wrapper: parentDiv,
                slides: [],
                currentIndex: 0
            }
            slideshows.push(slideshowObject);

            for(x = 0; x < jsonSrcObject.slides.length; x++)
            {
                createSlide(parentDiv, jsonSrcObject.slides[x], width, height, slideshowObject);
            }
        });

        // Add controls
        let controlWrapper = document.createElement("div");
        controlWrapper.className += " slideshow-control-wrapper";

        // Previous slide button
        let content = '<img src="gfx/arrow-left.png" class="slideshow-prev" onclick="prevSlide(\'' + slideshowName + '\')"></img>';
        let prev = $.parseHTML(content);
        controlWrapper.appendChild(prev[0]);

        // Center buttons
        for(y = 0; y < nrOfSlides; y++)
        {
            let centerb = document.createElement("img");
            centerb.src = "gfx/center-dot.png";
            centerb.className += " slideshow-center";
            controlWrapper.appendChild(centerb);
        }

        // Next slide button
        content = '<img src="gfx/arrow-right.png" class="slideshow-next" onclick="nextSlide(\'' + slideshowName + '\')"></img>';
        let next = $.parseHTML(content);
        controlWrapper.appendChild(next[0]);

        parentDiv.appendChild(controlWrapper);
    }
}
