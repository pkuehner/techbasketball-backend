'use strict';

const isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return next()
  }
  return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

module.exports = function(app) {
  const blogEntry = require('../controllers/blogEntryController');

  app.route('/entries')
      .get(blogEntry.listAll)
  app.post('/entries', isLoggedIn, blogEntry.create);
  app.route('/entries/:entryId')
      .get(blogEntry.read)
      .put(isLoggedIn, blogEntry.update)
      .delete(isLoggedIn, blogEntry.delete);
};
