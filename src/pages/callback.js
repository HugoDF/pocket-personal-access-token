const pocket = require('../modules/pocket');

module.exports = async function(req, res) {
  const {request_token: requestToken, consumer_key: consumerKey} = req.session;
  if (!requestToken) {
    return res.redirect('/authorize');
  }

  let accessToken = req.session.access_token;
  if (accessToken) {
    return res.render('callback.html', {
      consumerKey,
      accessToken
    });
  }

  accessToken = await pocket.getAccessToken(consumerKey, requestToken);
  if (!accessToken) {
    return res.redirect('/authorize');
  }

  req.session.access_token = accessToken;
  res.render('callback.html', {
    consumerKey,
    accessToken
  });
};
