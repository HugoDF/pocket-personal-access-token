const axios = require('axios');
const {APP_URL} = require('../../config');

const BASE_URL = 'https://getpocket.com/v3';
const REDIRECT_URI = `${APP_URL}/callback`;

const transport = axios.create({
  baseURL: BASE_URL,
  headers: {'X-Accept': 'application/json'}
});

async function getRequestToken(consumerKey) {
  const res = await transport.post('/oauth/request', {
    consumer_key: consumerKey,
    redirect_uri: REDIRECT_URI
  });
  console.log(res.data);
  const {code} = res.data;
  return code;
}

function getPocketAuthorizationUri(requestToken) {
  return `https://getpocket.com/auth/authorize?request_token=${requestToken}&redirect_uri=${REDIRECT_URI}`;
}

async function getAccessToken(consumerKey, requestToken) {
  try {
    const res = await transport.post('/oauth/authorize', {
      consumer_key: consumerKey,
      code: requestToken
    });
    const {access_token} = res.data;
    return access_token;
  } catch (error) {
    return null;
  }
}

module.exports = {
  getRequestToken,
  getAccessToken,
  getPocketAuthorizationUri
};
