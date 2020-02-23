export class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
    this.submitButton = this.form.querySelector('.popup__button');
  }
  checkFieldValidity(input, type) {
    if (input.validity.valueMissing) return 'Это обязательное поле';
    switch (type) {
      case 'text':
        if (input.validity.tooShort || input.validity.tooLong) return 'Должно быть от 2 до 30 символов';
      case 'url':
        if (input.validity.typeMismatch) return 'Здесь должна быть ссылка';
    }
    return '';
  }
  checkInputValidity(event) {
    this.fields.forEach( field => {
      if (event.target === field.input) field.error.textContent = this.checkFieldValidity(field.input, field.input.type);
    } );
    this.setSubmitButtonState();
  }
  getFieldsData() {
    const data = {};
    this.fields.forEach( field => data[field.input.name] = field.input.value )
    return data;
  }
  setSubmitButtonState() {
    if ( this.fields.every( field => field.input.validity.valid ) ) this.setSubmitButtonEnabled();
    else this.setSubmitButtonDisabled();
  }
  setSubmitButtonDisabled() {
    this.submitButton.setAttribute('disabled', true);
    this.submitButton.classList.add('popup__button_disabled');
  }
  setSubmitButtonEnabled() {
    this.submitButton.removeAttribute('disabled');
    this.submitButton.classList.remove('popup__button_disabled');
  }
  setEventListeners() {
    this.form.addEventListener('input', this.checkInputValidity.bind(this));
  }
}