export class Card {
  constructor(cardData) {
    this.elem = this.create(cardData);
    this.data = cardData;
  }
  create(cardData) {
    const cardElem = document.createElement('div');
    cardElem.classList.add('place-card');
    cardElem.insertAdjacentHTML('beforeend', `
      <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class="place-card__like-wrap">
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-counter"></p>
        </div>
      </div>`);
    cardElem.querySelector(".place-card__name").textContent = cardData.name;
    cardElem.querySelector(".place-card__image").style.backgroundImage = `url(${cardData.link})`;
    return cardElem;
  }
  remove() {
    this.elem.parentElement.removeChild(this.elem);
  }
  showDeleteIcon(userId) {
    if (userId !== this.data.owner._id) return;
    this.elem.querySelector('.place-card__delete-icon').classList.add('place-card__delete-icon_visible');
  }
  addLike() {
    this.elem.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
  }
  deleteLike() {
    this.elem.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
  }
  refreshCardLikes(userId) {
    this.elem.querySelector('.place-card__like-counter').textContent = this.data.likes.length;
    if ( this.checkCurrentUserLike(userId) ) this.addLike();
    else this.deleteLike();
  }
  checkCurrentUserLike(userId) {
    return this.data.likes.some( likeAuthor => likeAuthor._id === userId );
  }
}