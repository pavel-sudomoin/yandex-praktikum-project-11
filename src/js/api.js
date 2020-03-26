export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  async requestServer(url, options) {
    let response, json;

    try {
      response = await fetch(this.baseUrl + url, options);
    } catch(err) {
      throw new Error('Проверьте подключение к сети.');
    }

    if(!response.ok) throw new Error(`Сервер вернул ошибку ${response.status} (${response.statusText}).`);

    try {
      json = await response.json();
    } catch(err) {
      throw new Error('Сервер передал некорректные данные.');
    }

    return json;
  }
  
  getUserInfo() {
    return this.requestServer('/users/me', {"headers": this.headers});
  }

  getCards() {
    return this.requestServer('/cards', {"headers": this.headers});
  }

  setUserInfo(userData) {
    const options = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(userData)
    }
    return this.requestServer('/users/me', options);
  }

  changeAvatar(avatarData) {
    const options = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatarData)
    };
    console.log(options);
    return this.requestServer('/users/me/avatar', options);
  }

  addCard(cardData) {
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(cardData)
    }
    return this.requestServer('/cards', options);
  }

  deleteCard(cardId) {
    const options = {
      method: 'DELETE',
      headers: this.headers,
    }
    return this.requestServer(`/cards/${cardId}`, options);
  }

  addLike(cardId) {
    const options = {
      method: 'PUT',
      headers: this.headers,
    }
    return this.requestServer(`/cards/${cardId}/likes`, options);
  }

  deleteLike(cardId) {
    const options = {
      method: 'DELETE',
      headers: this.headers,
    }
    return this.requestServer(`/cards/${cardId}/likes`, options);
  }

}