console.log('%c HI', 'color: firebrick')

// ! GLOBAL VARIABLES 

document.addEventListener('DOMContentLoaded', (e) => {
    // invoke function to load images on page load 
    loadImages();
    // function to load breed list on page load
    loadBreeds();
})

// ! FETCH FUNCTIONS 

function loadImages() {
    // send request to server 
    fetch('https://dog.ceo/api/breeds/image/random/4')
    // parse response with json method
    .then(res => res.json())
    // pass parsed response to renderImages to DOM
    .then(imageData => imageData.message.forEach(image => renderImage(image)));
}

function loadBreeds() {
    // send request to server 
    fetch('https://dog.ceo/api/breeds/list/all')
    // parse response with json method
    .then(res => res.json())
    // pass parsed response to renderBreed to DOM
    .then(breedData => {
        breeds = Object.keys(breedData.message);
        updateBreedList(breeds);
        addBreedSelectorListener();
    })
}

// ! RENDER FUNCTIONS -- DOM MANIPULATION

function renderImage(image) {
    // find image section
    const imageSection = document.querySelector('#dog-image-container');
    // create element to display images
    const imgEl = document.createElement('img');
    // set new img element src to current image url
    imgEl.src = `${image}`;
    // append current image to imageSection
    imageSection.appendChild(imgEl);
}

function renderBreed(breed) {
    // find breedList
    const breedList = document.querySelector('#dog-breeds');
    // create element to display breed
    const breedEl = document.createElement('li');
    // set new img element src to current image url
    breedEl.innerText = `${breed}`;
    // append current breed to breed
    breedList.appendChild(breedEl);
    // add event listener for click to change text color 
    breedEl.addEventListener('click', handleBreedElColor);
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    // pass element to removeChildren function 
    removeChildren(ul);
    // iterate through filtered breeds list and pass each value to renderBreed 
    breeds.forEach(breed => renderBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild

    while (child) {
        // remove each element
        element.removeChild(child);
        // as each last child element is removed, update the child variable to the current last child element
        child = element.lastElementChild;
    }
}

// ! FIGURE OUT WAY CHANGE EVENT IS NOT WORKING 
function addBreedSelectorListener() {
    // get element for event listener
    let breedOptions = document.querySelector('#breed-dropdown');
    breedOptions.addEventListener('change', (e) => {
        handleBreedChangeSelection(e.target.value);
    }); 
}

// ! HANDLER FUNCTIONS

function handleBreedElColor (e) {
    // change the color of the breedEl when clicked 
    e.target.style.color = 'blue';
}

function handleBreedChangeSelection(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}