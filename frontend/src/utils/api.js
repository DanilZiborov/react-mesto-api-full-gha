class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}:`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getJson)
  }

  getInitialCards(token) {
    return this._request(`${this._baseUrl}/cards`, { headers: { "Authorization": `Bearer ${token}`, ...this._headers } })
  }

  getUserInfo(token) {
    return this._request(`${this._baseUrl}/users/me`, { headers: { "Authorization": `Bearer ${token}`, ...this._headers } })

  }

  editUserInfo({ name, about }, token) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`, ...this._headers },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addNewCard({ name, link }, token) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${token}`, ...this._headers },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  deleteCard(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`, ...this._headers }
    })
  }

  putLike(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: { "Authorization": `Bearer ${token}`, ...this._headers }
    })
  }

  deleteLike(cardId, token) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}`, ...this._headers }
    })
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return isLiked ? this.deleteLike(cardId, token) : this.putLike(cardId, token);
  }

  changeAvatar({ avatar }, token) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`, ...this._headers },
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    "Content-Type": "application/json",
  }
})

export default api;

