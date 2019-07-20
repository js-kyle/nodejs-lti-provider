'use strict';
const lti = require('ims-lti');
// MemoryStore probably shouldn't be used in production
const nonceStore = new lti.Stores.MemoryStore();

const secrets = {
  key: 'secret'
};

const getSecret = (consumerKey, callback) => {
	const secret = secrets[consumerKey];
	if (secret) {
		return callback(null, secret);
	}

	let err = new Error(`Unknown consumer ${consumerKey}`);
	err.status = 403;

	return callback(err);
};

exports.handleLaunch = (req, res, next) => {
	if (!req.body) {
		let err = new Error('Expected a body');
		err.status = 400;
		return next(err);
	}

	const consumerKey = req.body.oauth_consumer_key;
	if (!consumerKey) {
		let err = new Error('Expected a consumer');
		err.status = 422;
		return next(err);
	}

	getSecret(consumerKey, function(err, consumerSecret) {
		if (err) {
			return next(err);
		}

		const provider = new lti.Provider(consumerKey, consumerSecret, nonceStore, lti.HMAC_SHA1);

		provider.valid_request(req, function(err, isValid) {
      if (err) {
        return next(err);
      }
      if (isValid) {
        req.session.regenerate(err => {
          if (err) next(err);

          req.session.contextId = provider.context_id;
          req.session.userId = provider.userId;
          req.session.username = provider.username;
          req.session.ltiConsumer = provider.body.tool_consumer_instance_guid;

          return res.redirect(301, '/application');
        });
      } else {
        return next(err);
      }
		});
	});
};
