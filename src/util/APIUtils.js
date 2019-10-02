import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })
  
  // このデモではアクセストークンをローカルストレージに保存する
  if(localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
  .then(res => 
    res.json().then(json => {
      if(!res.ok) {
        return Promise.reject(json);
      }
        return json;
      })
  );
};

export function getCurrentUser() {
  console.log(!localStorage.getItem(ACCESS_TOKEN))
  if(!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/api/users/me",
    method: 'GET'
  });
}

export function login(loginRequest) {
  return request({
      url: API_BASE_URL + "/api/v2/auth/login/email",
      method: 'POST',
      body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
      url: API_BASE_URL + "/api/v2/auth/signup/email",
      method: 'POST',
      body: JSON.stringify(signupRequest)
  });
}

export function refreshToken(tokenRequest) {
  return request({
      url: API_BASE_URL + "/api/v2/auth/signup/email",
      method: 'POST',
      body: JSON.stringify(tokenRequest)
  });
}
