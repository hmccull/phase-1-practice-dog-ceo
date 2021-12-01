console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    // request all dog images 
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(imageData => imageData.message.forEach(img => renderImage(img)))

    // request all dog breeds
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(breedData => {for (let breed in breedData.message) renderBreed(breed)});
})

function renderImage(img) {
    const imageDiv = document.getElementById('dog-image-container');
    const imageEl = document.createElement('img');
    // set img src equal to passed argument 
    imageEl.src = `${img}`;
    // append img to image div
    imageDiv.appendChild(imageEl);
}

function renderBreed(breed) {
    const breedList = document.getElementById('dog-breeds');
    const breedEl = document.createElement('li');
    breedEl.className = 'breedName'
    // set breedEl content equal to breed data
    breedEl.innerText = `${breed}`;
    // append breedEl to ul 
    breedList.appendChild(breedEl);

    // event listener for click on breed text -> change text color
    breedEl.addEventListener('click', handleBreedColor)
}

// change the color of breed text when clicked 
function handleBreedColor(e) {
    e.target.style.color = 'blue';
}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreedsSelectListener(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartWith(letter) {
    updatedBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedsSelectListener() {
    let breedDropdown = document.querySelectorAll('#breed-dropdown');
    breedDropdown.addEventListener('change', (e) => {
        selectBreedsStartWith(e.target.value);
    })
}
