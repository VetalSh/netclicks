'use strict';

const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2',
      API_KEY = '5e88a32d78c5ff4a0f999344bad9a728';
// menu
const leftMenu = document.querySelector('.left-menu'),
      hamburger = document.querySelector('.hamburger'),
      tvShowsList = document.querySelector('.tv-shows__list'),      
      modal = document.querySelector('.modal');


const DBService = class {
  getData = async (url) => {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Не удалось получить данные
              по адресу ${url}`)
    }
  }

  getTestData = () => {
    return this.getData('test.json')
  }
}

const renderCard = responce => {
  console.log(responce);
  tvShowsList.textContent = '';

  responce.results.forEach(({ backdrop_path: backdrop,
                              name: title,
                              poster_path: poster,
                              vote_average: vote
                              }) => {

    const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
    const backdropIMG = poster ? IMG_URL + backdrop : 'img/no-poster.jpg';
    const voteElem = '';

    const card = document.createElement('li');
    card.className = 'tv-shows__item';
    card.innerHTML = `
      <a href="#" class="tv-card">
          <span class="tv-card__vote">${vote}</span>
          <img class="tv-card__img"
              src="${posterIMG}"
              data-backdrop="${backdropIMG}"
              alt="${title}">
          <h4 class="tv-card__head">${title}</h4>
      </a>    
    `;

    tvShowsList.append(card);
  });

}

new DBService().getTestData().then(renderCard); 
      
// Open and close menu
hamburger.addEventListener('click', () => {
  leftMenu.classList.toggle('openMenu');
  hamburger.classList.toggle('open');
});

document.addEventListener('click', event => {
  const target = event.target;
  if (!event.target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
  }
});

leftMenu.addEventListener('click', event => {
  const target = event.target,  
        dropdown = target.closest('.dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
  }

});

// open modal window
tvShowsList.addEventListener('click', event => {

  event.preventDefault();

  const target = event.target,
        card = target.closest('.tv-card');

  if (card) {
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hide');
  }
});

// close modal window
modal.addEventListener('click', event => {

  if(event.target.closest('.cross') ||
      event.target.classList.contains('modal')) {
    document.body.style.overflow = '';
    modal.classList.add('hide');
  }

});

// change card view

const changeImage = event => {
  const card = event.target.closest('.tv-shows__item');
  
  if (card) {
    const img = card.querySelector('.tv-card__img');
    // const changeImg = img.dataset.backdrop;    
    // if(changeImg) {
    //   img.dataset.backdrop = img.src;
    //   img.src = changeImg;
    // }

    if (card) {
      const img = card.querySelector('.tv-card__img');
      if (img.dataset.backdrop) {
        [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
      }
    }
  }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);




 