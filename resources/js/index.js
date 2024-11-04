import.meta.glob('../img/**');
import {openCard, checkMatch} from './card-operations.js';



export const showWin = () => {
  document.getElementById('win').style.display = 'inline-block';
  document.getElementById('game-block').style.display = 'none';
}


const clickEvent = (target, openCards, cards) => {

  const card = target // card = img-div
  const img = card.querySelector('img');

  // if card not opened
  if (img.style.display != 'block'){
    
    openCard(card, img, openCards);
        
    // if two cards is opened
    if (openCards.length > 1) {

      checkMatch(openCards, cards);

    }
  }
}



window.onload = () => {
    
  
  // displaying slider value
  const slider = document.getElementById("slider");

  if (slider) { // checking for a slider
    const cardsNumber = document.getElementById("cards-number");
    slider.addEventListener("input", () => {
      // displaying the slider value
      cardsNumber.innerHTML = `Колличество карточек: ${slider.value}`;
    });
  }
    

  const openCards = [];
  // gets all the cards
  const cards = document.getElementsByClassName('img-div');
    
  Array.from(cards).forEach(card => { // for each card
    card.addEventListener('click', function() {
      
      clickEvent(this, openCards, cards)

    });
  })
}