console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    // request all dog images 
    loadImages();
    // request all dog breeds
    loadBreeds();
})

function loadImages() {
    // request all dog images 
    fetch("https://dog.ceo/api/breeds/image/random/4")
    // apply json parse to response
    .then(res => res.json())
    // iterate through image data object and pass values to renderImage as argument
    .then(imageData => imageData.message.forEach(img => renderImage(img)))
}

function loadBreeds() {
    // request all dog breeds
    fetch('https://dog.ceo/api/breeds/list/all')
    // apply json parse to response
    .then(res => res.json())
    // create var, assign to array created from the object keys from server promise
    .then(breedData => {
        breeds = Object.keys(breedData.message);
        // pass array of breeds to updateBreedList as argument
        updateBreedList(breeds);
        // invoke breed selector listener
        addBreedSelectorListener();
    });
}


function renderImage(img) {
    // set variable equal to parent element
    const imageDiv = document.getElementById('dog-image-container');
    // create child element 
    const imageEl = document.createElement('img');
    // set img src equal to passed argument from the loadImages fetch
    imageEl.src = `${img}`;
    // append img to image div
    imageDiv.appendChild(imageEl);
}

function renderBreed(breed) {
    // set variable equal to parent element
    const breedList = document.getElementById('dog-breeds');
    // create child element
    const breedEl = document.createElement('li');
    // set breedEl content equal to breed data
    breedEl.innerText = `${breed}`;
    // append breedEl to ul 
    breedList.appendChild(breedEl);

    // event listener for click on breed text -> change text color
    breedEl.addEventListener('click', handleBreedColor)
}

// create breed select event listener
function addBreedSelectorListener() {
    // set variable equal to desired element 
    let breedOptions = document.querySelector('#breed-dropdown');
    // add event listener to the dropdown 
    breedOptions.addEventListener('change', (e) => {
        // pass target element value to selectBreedsStartWith function
        selectBreedsStartWith(e.target.value);
    });
}

function selectBreedsStartWith(letter) {
    // iterate through breed list, pass each matched value to updateBreedList
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function updateBreedList(breeds) {
    // set variable equal to element that needs updated
    let ul = document.querySelector('#dog-breeds');
    // pass element to removeChildren function 
    removeChildren(ul);
    // iterate through filtered breeds list and pass each value to renderBreed 
    breeds.forEach(breed => renderBreed(breed));
}

// remove child elements that do not match dropdown menu option that user selects
function removeChildren(element) {
    // set variable equal to child element
    let child = element.lastElementChild
    // while child = true (are still elements being passed from the filtered breeds list)????????
    while (child) {
        // remove each element
        element.removeChild(child);
        // as each last child element is removed, update the child variable to the current last child element
        child = element.lastElementChild;
    }
}

// change the color of breed text when clicked 
function handleBreedColor(e) {
    e.target.style.color = 'blue';
}
