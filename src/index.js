import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

// Initialize SlimSelect
new SlimSelect({
  select: '#breed-select',
});

// Select elements
const breedSelect = document.getElementById('breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const description = document.querySelector('.description');
const temperament = document.querySelector('.temperament');

// Fetch breeds and populate select
const loadBreeds = async () => {
  try {
    loader.classList.remove('hidden');
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    loader.classList.add('hidden');
  } catch (error) {
    loader.classList.add('hidden');
    Notiflix.Notify.failure('Failed to load breeds');
  }
};

// Fetch cat by breed and display info
const loadCatByBreed = async (breedId) => {
  try {
    loader.classList.remove('hidden');
    catInfo.classList.add('hidden');
    const cats = await fetchCatByBreed(breedId);
    const cat = cats[0];
    catImage.src = cat.url;
    breedName.textContent = cat.breeds[0].name;
    description.textContent = cat.breeds[0].description;
    temperament.textContent = cat.breeds[0].temperament;
    catInfo.classList.remove('hidden');
    loader.classList.add('hidden');
  } catch (error) {
    loader.classList.add('hidden');
    Notiflix.Notify.failure('Failed to load cat information');
  }
};

// Event listener for breed select change
breedSelect.addEventListener('change', (event) => {
  const breedId = event.target.value;
  if (breedId) {
    loadCatByBreed(breedId);
  }
});

// Load breeds on page load
loadBreeds();