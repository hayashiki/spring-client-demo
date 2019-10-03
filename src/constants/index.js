// Sever側のAPIのベースエンドポイント
export const API_BASE_URL = 'http://localhost:8000';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

// dev/prod環境によって適切にエンドポイントを変更する
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
