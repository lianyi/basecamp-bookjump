'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://127.0.0.1:9000',
  SESSION_SECRET: 'bookjump-secret',
  GOOGLE_BOOKS_API_KEY: 'AIzaSyCIyPwF5PpJ3DtsialmkUhRP6W2KWhwWAs',
  MONGODB_URI: 'mongodb://heroku_vj8vk4t6:bkf7tds7u7lps47p41gscg1drm@ds163377.mlab.com:63377/heroku_vj8vk4t6',
  TWITTER_ID: 'y1wpQmkGXYS9k1LrlYt2uWEgE',
  TWITTER_SECRET: 'dhFhRB9ZotcTjsJl7Z9UKxMr5YHRI9mSHyJBRWiRNfixX8yPra',
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
//# sourceMappingURL=local.env.js.map
