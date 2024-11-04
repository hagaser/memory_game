import {showWin} from './index.js';

const closeCards = (openCards) => {
  setTimeout(() => { // 1000

  openCards.forEach(card => {

    const img = card.querySelector('img')

    const flipCard = () => {
      // second half of flip
      img.style.display = 'none';
      card.style.width = '50px';
      card.removeEventListener('transitionend', flipCard);
    }

    card.addEventListener('transitionend', flipCard);

    // first half of flip
    card.style.width = '1px';
    img.style.width = '0px';


  })}, 1000);
}

// delete card
const delCard = (card, cards) => {
  setTimeout(() => { // 1000
    
    // fall animation
    card.style.top = '1000px';
    card.addEventListener('transitionend',() => {
                      
      card.parentNode.removeChild(card);

      // if there are no more cards
      if (!cards.length) {
        showWin()
      }

    })
  }, 1000);
}

export const openCard = (card, img, openCards) => {

  const flipCard = () => {
    // second half of flip
    img.style.width = '50px';
    card.style.width = '50px';
    card.removeEventListener('transitionend', flipCard);
  }

  card.addEventListener('transitionend', flipCard);

  // first half of flip
  card.style.width = '1px';
  img.style.display = 'block';

  openCards.push(card);
}

export const checkMatch = (openCards, cards) => {
  // if cards match
  if (openCards[0].querySelector('img').id === 
      openCards[1].querySelector('img').id) {

    openCards.forEach(card => {
      delCard(card, cards)
    });
    openCards.length = 0;

  } else { // if not match

    closeCards([...openCards]);
    openCards.length = 0;

  }
}