export class Popup {
  constructor(container) {
    this.container = container;
  }
  initialization(htmlCode) {
    this.content = this.create(htmlCode);
  }
  create(htmlCode) {
    const elem = document.createElement('div');
    elem.insertAdjacentHTML('beforeend', htmlCode);
    return elem.firstElementChild;
  }
  open() {
    this.container.appendChild(this.content);
    this.container.classList.add('popup_is-opened');
  }
  close() {
    if ( !this.container.contains(this.content) ) return;
    this.container.removeChild(this.content);
    this.container.classList.remove('popup_is-opened');
  }
  setEventListeners() {
    this.content.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
  }
}

export class PopupWithForm extends Popup {
  initialization(...args) {
    super.initialization(...args);
    this.form = this.content.querySelector('.popup__form');
    this.submitButton = this.form.querySelector('.popup__button');
    this.submitButtonText = this.submitButton.textContent;
    this.isLoading = false;
  }
  open() {
    this.form.reset();
    this.setSubmitButtonDisabled();
    this.hideAllErrors();
    super.open();
  }
  close() {
    if (this.isLoading) return;
    super.close();
  }
  showOpenError() {
    alert('Редактирование данной информации невозможно. Перезагрузите страницу');
  }
  hideAllErrors() {
    this.content.querySelectorAll('.popup__error').forEach( error => error.textContent = '');
  }
  setSubmitButtonDisabled() {
    this.submitButton.setAttribute('disabled', true);
    this.submitButton.classList.add('popup__button_disabled');
  }
  startLoading() {
    this.submitButton.textContent = 'Загрузка...';
    this.isLoading = true;
  }
  stopLoading() {
    this.submitButton.textContent = this.submitButtonText;
    this.isLoading = false;
  }
}

export class NewCardPopup extends PopupWithForm {
  initialization() {
    super.initialization( this.getTemplate() );
  }
  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.user-info__button-add').addEventListener('click', this.open.bind(this));
  }
  disablePopupOpening() {
    document.querySelector('.user-info__button-add').addEventListener('click', this.showOpenError.bind(this));
  }
  getTemplate() {
    return `<div class="popup__content">
              <img src="./images/close.svg" alt="" class="popup__close">
              <h3 class="popup__title">Новое место</h3>
              <form class="popup__form" name="form-add" novalidate>
                <div class="popup__input-cover">
                  <input type="text" name="name" required minlength="2" maxlength="30" class="popup__input popup__input_type_name" placeholder="Название">
                  <span class="popup__error popup__error_type_name"></span>
                </div>
                <div class="popup__input-cover">
                  <input type="url" name="link" required class="popup__input popup__input_type_link-url" placeholder="Ссылка на картинку">
                  <span class="popup__error popup__error_type_link-url"></span>
                </div>
                <button type="submit" class="button popup__button popup__button_disabled" disabled="true">Сохранить</button>
              </form>
            </div>`;
  }
}

export class EditProfilePopup extends PopupWithForm {
  initialization() {
    super.initialization( this.getTemplate() );
    this.userNameElem = document.querySelector('.user-info__name');
    this.userInfoElem = document.querySelector('.user-info__job');
  }
  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.user-info__button-edit').addEventListener('click', this.open.bind(this));
  }
  disablePopupOpening() {
    document.querySelector('.user-info__button-edit').addEventListener('click', this.showOpenError.bind(this));
  }
  open() {
    super.open();
    this.form.elements.name.value = this.userNameElem.textContent;
    this.form.elements.about.value = this.userInfoElem.textContent;
  }
  getTemplate() {
    return `<div class="popup__content">
              <img src="./images/close.svg" alt="" class="popup__close">
              <h3 class="popup__title">Редактировать профиль</h3>
              <form class="popup__form" name="form-edit" novalidate>
                <div class="popup__input-cover">
                  <input type="text" name="name" required minlength="2" maxlength="30" class="popup__input popup__input_type_name" placeholder="Имя">
                  <span class="popup__error popup__error_type_name"></span>
                </div>
                <div class="popup__input-cover">
                  <input type="text" name="about" required minlength="2" maxlength="30" class="popup__input popup__input_type_info" placeholder="О себе">
                  <span class="popup__error popup__error_type_info"></span>
                </div>
                <button type="submit" class="button popup__button popup__button_disabled" disabled="true">Сохранить</button>
              </form>
            </div>`;
  }
}

export class ChangeAvatarPopup extends PopupWithForm {
  initialization() {
    super.initialization( this.getTemplate() );
  }
  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.user-info__photo').addEventListener('click', this.open.bind(this));
  }
  disablePopupOpening() {
    document.querySelector('.user-info__photo').addEventListener('click', this.showOpenError.bind(this));
  }
  getTemplate() {
    return `<div class="popup__content">
              <img src="./images/close.svg" alt="" class="popup__close">
              <h3 class="popup__title">Обновить аватар</h3>
              <form class="popup__form" name="form-avatar" novalidate>
                <div class="popup__input-cover">
                  <input type="url" name="link" required class="popup__input popup__input_type_link-url" placeholder="Ссылка на аватар">
                  <span class="popup__error popup__error_type_link-url"></span>
                </div>
                <button type="submit" class="button popup__button popup__button_disabled" disabled="true">Сохранить</button>
              </form>
            </div>`;
  }
}

export class FullSizeCardPopup extends Popup {
  initialization() {
    super.initialization( this.getTemplate() );
  }
  setEventListeners() {
    super.setEventListeners();
    document.querySelector('.places-list').addEventListener('click', this.open.bind(this));
  }
  open(event) {
    if (!event.target.classList.contains('place-card__image')) return;
    super.open();
    this.container.querySelector('.popup__full-size-card-image').src = event.target.style.backgroundImage.slice(4, -1).replace(/"/g, "");
  }
  getTemplate() {
    return `<div class="popup__content popup__content_full-size-card">
              <img src="./images/close.svg" alt="" class="popup__close">
              <img class="popup__full-size-card-image">
            </div>`;
  }
}