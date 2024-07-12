import axios from 'axios';

// Set API key
axios.defaults.headers.common['x-api-key'] = 'live_DZEVyJW3VcBIexNIe3baRDqWHCXVAhgw8tJCASx5USwQZM7mdoM34w9t2SuiEjMc';

// Function to fetch the list of cat breeds
export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds'); // URL corect pentru producție
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
};

// Function to fetch cat images by breed ID
export const fetchCatByBreed = async (breedId) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`); // URL corect pentru producție
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat by breed');
  }
};