const pocket = require('../modules/pocket');

module.exports = async function(req, res) {
  const {consumer_key} = req.body;
  const requestToken = await pocket.getRequestToken(consumer_key);
  req.session.consumer_key = consumer_key;
  req.session.request_token = requestToken;
  console.log(requestToken);
  return res.redirect('/authorize');
};
