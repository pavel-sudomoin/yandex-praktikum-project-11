export class CardList {
  constructor(container, cards) {
    this.container = container;
    this.cards = [];
    this.userId = undefined;
    if (cards) this.addCard(cards);
  }
  _addCard(card) {
    this.cards.push(card);
    this.container.appendChild(card.elem);
    card.showDeleteIcon(this.userId);
    card.refreshCardLikes(this.userId);
  }
  addCard(...cards) {
    cards.forEach( card => this._addCard(card) );
  }
  _updateCard(card, newData) {
    card.data.likes = newData.likes;
    card.data.owner = newData.owner;
    card.refreshCardLikes(this.userId);
  }
  updateExistingCard(newData) {
    const card = this.cards[ this._getCardIndexById(newData._id) ];
    this._updateCard(card, newData);
  }
  refreshAllCards(...newCards) {
    let i = 0;
    const minLength = Math.min(this.cards.length, newCards.length);
    for (i; i < minLength; i++) {
      if (this.cards[i].data._id !== newCards[i].data._id) break;
      this._updateCard(this.cards[i], newCards[i].data);
    }
    this._deleteCardsByIndex(i, this.cards.length - i);
    if (i <= newCards.length) this.addCard( ...newCards.slice(i) );
  }
  _deleteCardsByIndex(startIndex, numberOfCards = 1) {
    this.cards.splice(startIndex, numberOfCards).forEach( card => card.remove() );
  }
  deleteCardById(cardId) {
    const cardIndex = this._getCardIndexById(cardId);
    this._deleteCardsByIndex(cardIndex)
  }
  renderAllLikes() {
    this.cards.forEach( card => card.refreshCardLikes(this.userId) );
  }
  renderAllDeleteIcons() {
    this.cards.forEach( card => card.showDeleteIcon(this.userId) );
  }
  setUserId(id) {
    this.userId = id;
  }
  getCardIdByElement(targetElem) {
    const cardElem = targetElem.closest('.place-card');
    return this.cards.find( card => card.elem === cardElem ).data._id;
  }
  checkCurrentUserLike(cardId) {
    const card = this.cards[ this._getCardIndexById(cardId) ];
    return card.checkCurrentUserLike(this.userId);
  }
  _getCardIndexById(cardId) {
    return this.cards.findIndex( card => card.data._id === cardId );
  }
}