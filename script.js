const loader = document.querySelector("#loader");
const imageContainer = document.querySelector("#imageContainer");

let photoArray = [];
let loadImageCount = 0;
let totalImages = 0;
let ready = false;

// Set unsplash api
const count = 28;
const unsplashApiKey = "5Sgf0C1OblMm50T1TMiaUWKlM3RqRGuPi4s7p7oG4XU";
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}&count=${count}`;

// Helper Function
function setAttributes( element, attributes){
    for( let key in attributes){
        element[key]  = attributes[key];
    }
}

// Check if all images were loaded
function loadImage(){
    loadImageCount++;
    if(loadImageCount === totalImages){
        ready = true;
        loader.hidden = true;
    }   
}

function getData(){
    fetch(unsplashUrl)
    .then( response => response.json())
    .then( data => {
        console.log(data);
        photoArray = data;
        totalImages = photoArray.length;
        displayPhotos();
    })
}

function displayPhotos(){
    loadImageCount = 0;
    photoArray.forEach( photo => {
        const item = document.createElement("a");
        setAttributes( item , { 
            href : photo.links.html,
            target: '_blank'
        })

        const img = document.createElement("img");
        setAttributes( img, 
            {
                src : photo.urls.regular,
                alt : photo.alt_description, 
                title : photo.alt_description
            });
        
        img.addEventListener("load", loadImage);
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}

// Check to see if scrolling near bottom of page, then load more photos
window.addEventListener("scroll", () => {
    // console.log(window.innerHeight);
    // console.log(window.scrollY);
    // console.log(window.innerHeight + window.scrollY);
    // console.log(document.body.offsetHeight);
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && ready){
        ready = false;
        getData();
    }
})

getData();