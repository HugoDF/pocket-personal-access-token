const pocket = require('../modules/pocket');

module.exports = function(req, res) {
  const {request_token: requestToken} = req.session;
  if (!requestToken) {
    return res.redirect('/');
  }

  const pocketUrl = pocket.getPocketAuthorizationUri(requestToken);
  return res.render('authorize.html', {
    pocketUrl
  });
};
