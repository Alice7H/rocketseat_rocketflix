import { API_KEY, BASE_URL, IMG_URL, language } from './api.js';

const btn = document.querySelector('.btn');
const elementContainer = document.querySelector('.container');
const elementInfo = document.querySelector('.info');
const elementImage = document.querySelector('.container img');
const elementTitle = document.querySelector('.container .title');

btn.addEventListener('click', async () => {
  removeClassesFromContainer();
  removeInfoMovie();

  try {
    const data = await getMovie(randomNumber());
    if (data.title !== undefined && data.overview !== undefined && data.poster !== undefined) {
      elementImage.src = `${IMG_URL}/${data.poster}`;
      elementImage.alt = data.title || 'Imagem não disponível';
      elementTitle.innerHTML = data.title || 'Desconhecido';
      elementInfo.innerHTML = data.overview;
    } else {
      throw new Error('Filme desconhecido');
    }
  } catch (error) {
    elementContainer.classList.add('not-found');
    elementImage.src = "./assets/images/poster.png";
    elementImage.alt = "Imagem Padrão";
    elementTitle.innerHTML = "Ops, hoje não é dia de assistir filme. Bora codar! 🚀";
    console.log(error);
  }
})

function getMovie(movie_id) {
  return axios.get(`${BASE_URL}/${movie_id}?${API_KEY}&${language}`)
    .then(response => {
      const data = {
        overview: response.data.overview,
        title: response.data.title,
        poster: response.data.poster_path,
      }
      return data;
    })
    .catch(error => error);
}
function randomNumber() {
  let number = Math.floor(Math.random() * 2000);
  return number;
}
function removeClassesFromContainer() {
  elementContainer.classList.remove('hidden');
  elementContainer.hidden = false;
  elementContainer.ariaHidden = false;
  elementContainer.classList.remove('not-found');
}
function removeInfoMovie() {
  elementInfo.innerHTML = '';
}