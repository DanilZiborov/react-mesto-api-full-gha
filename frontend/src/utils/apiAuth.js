class ApiAuth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
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

  register(password, email) {
    return this._request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
  }

  authorize(password, email) {
    return this._request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email })
    })
  }


}

const apiAuth = new ApiAuth({ baseUrl: 'http://localhost:3001' })

export default apiAuth;
