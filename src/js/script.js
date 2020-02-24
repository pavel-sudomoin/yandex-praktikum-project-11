import "../pages/index.css";

import {Api} from './api.js';

import {NewCardPopup, EditProfilePopup, ChangeAvatarPopup, FullSizeCardPopup} from './popup.js';

import {Card} from './card.js';

import {CardList} from './card-list.js';

import {UserInfo} from './user-info.js';

import {FormValidator} from './form-validator.js';


const baseUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort7' : 'https://praktikum.tk/cohort7'

const api = new Api({
  "baseUrl": baseUrl,
  "headers": {
    "authorization": "d5066112-0f15-4652-8789-daa06285b3ec",
    "Content-Type": "application/json"
  }
});


const popupElem = document.querySelector('.popup');

const newCardPopup = new NewCardPopup(popupElem);

const editProfilePopup = new EditProfilePopup(popupElem);

const changeAvatarPopup = new ChangeAvatarPopup(popupElem);

const fullSizeCardPopup = new FullSizeCardPopup(popupElem);

const popups = [newCardPopup, editProfilePopup, changeAvatarPopup, fullSizeCardPopup];

popups.forEach(popup => popup.initialization());


const cardList = new CardList(document.querySelector('.places-list'));

const userInfo = new UserInfo(document.querySelector('.user-info'));


const newCardFormValidator = new FormValidator(newCardPopup.form, fildsFromForm(newCardPopup.form));

const editProfileFormValidator = new FormValidator(editProfilePopup.form, fildsFromForm(editProfilePopup.form));

const changeAvatarFormValidator = new FormValidator(changeAvatarPopup.form, fildsFromForm(changeAvatarPopup.form));


function cardsInitialization() {
  return api.getCards()
    .then(cardsData => {
      cardList.addCard(...cardsData.map(cardData => new Card(cardData)));
      newCardPopup.setEventListeners();
      return true;
    })
    .catch(err => {
      alert(`Не удалось загрузить карточки. ${err.message}`);
      newCardPopup.disablePopupOpening();
      return false;
    });
}

function userInitialization() {
  return api.getUserInfo()
    .then(userData => {
      userInfo.setUserInfo(userData);
      editProfilePopup.setEventListeners();
      changeAvatarPopup.setEventListeners();
      return true;
    })
    .catch(err => {
      alert(`Не удалось загрузить информацию пользователя. ${err.message}`);
      editProfilePopup.disablePopupOpening();
      changeAvatarPopup.disablePopupOpening();
      return false;
    });
}

function initialization() {
  Promise.all([cardsInitialization(), userInitialization()])
    .then(messages => {
      if (messages.some(mess => !mess)) return;
      cardList.setUserId(userInfo.data._id);
      cardList.renderAllDeleteIcons();
      cardList.renderAllLikes();
    })
}

function fildsFromForm(form) {
  const fields = [];
  for (let inputElement of form.querySelectorAll('.popup__input')) {
    let field = {};
    field.input = inputElement;
    field.error = form.querySelector('.' + Array.from(inputElement.classList).find(str => str.includes('popup__input_type')).replace('input', 'error'));
    fields.push(field);
  }
  return fields;
}

function newCardFormSubmitHandler(event) {
  const cardData = newCardFormValidator.getFieldsData();
  newCardPopup.startLoading();
  api.addCard(cardData)
    .then(json => {
      cardList.addCard(new Card(json));
      newCardPopup.stopLoading();
      newCardPopup.close();
    })
    .catch(err => alert(`Не удалось добавить карточку. ${err.message}`))
    .finally(() => newCardPopup.stopLoading());
  event.preventDefault();
}

function editProfileFormSubmitHandler(event) {
  const userData = editProfileFormValidator.getFieldsData();
  editProfilePopup.startLoading();
  api.setUserInfo(userData)
    .then(json => {
      userInfo.setUserInfo(json);
      editProfilePopup.stopLoading();
      editProfilePopup.close();
    })
    .catch(err => alert(`Не удалось обновить информацию пользователя. ${err.message}`))
    .finally(() => editProfilePopup.stopLoading());
  event.preventDefault();
}

function changeAvatarFormSubmitHandler(event) {
  const avatarData = { avatar: changeAvatarFormValidator.getFieldsData().link };
  changeAvatarPopup.startLoading();
  api.changeAvatar(avatarData)
    .then(json => {
      userInfo.setUserInfo(json);
      changeAvatarPopup.stopLoading();
      changeAvatarPopup.close();
    })
    .catch(err => alert(`Не удалось обновить аватар. ${err.message}`))
    .finally(() => changeAvatarPopup.stopLoading());
  event.preventDefault();
}

function cardListHandler(event) {
  if (event.target.classList.contains('place-card__delete-icon')) deleteCardHandler(event.target);
  else if (event.target.classList.contains('place-card__like-icon')) likeCardHandler(event.target);
}

function closePopupsByEsc(event) {
  if (event.keyCode === 27) popups.forEach(popup => popup.close());
}

function deleteCardHandler(targetElem) {
  const cardId = cardList.getCardIdByElement(targetElem);

  if (!confirm('Вы действительно хотите удалить эту карточку?')) return;

  api.deleteCard(cardId)
    .then(() => cardList.deleteCardById(cardId))
    .catch(err => alert(`Не удалось удалить картинку. ${err.message}`));
}

function likeCardHandler(targetElem) {
  const cardId = cardList.getCardIdByElement(targetElem);
  if (cardList.checkCurrentUserLike(cardId)) deleteLike(cardId);
  else addLike(cardId);
}

function addLike(cardId) {
  api.addLike(cardId)
    .then(json => cardList.updateExistingCard(json))
    .catch(err => alert(`Не удалось добавить лайк. ${err.message}`));
}

function deleteLike(cardId) {
  api.deleteLike(cardId)
    .then(json => cardList.updateExistingCard(json))
    .catch(err => alert(`Не удалось удалить лайк. ${err.message}`));
}

function autoUpdate(interval) {
  setInterval(refreshAllCards, interval);
}

function refreshAllCards() {
  api.getCards()
    .then(cardsData => cardList.refreshAllCards(...cardsData.map(cardData => new Card(cardData))))
    .catch(err => console.log(`Не удалось обновить карточки. ${err.message}`));
}


newCardPopup.form.addEventListener('submit', newCardFormSubmitHandler);
editProfilePopup.form.addEventListener('submit', editProfileFormSubmitHandler);
changeAvatarPopup.form.addEventListener('submit', changeAvatarFormSubmitHandler);
cardList.container.addEventListener('click', cardListHandler);
document.addEventListener('keyup', closePopupsByEsc);


newCardFormValidator.setEventListeners();
editProfileFormValidator.setEventListeners();
changeAvatarFormValidator.setEventListeners();
fullSizeCardPopup.setEventListeners();


initialization();
autoUpdate(10000);