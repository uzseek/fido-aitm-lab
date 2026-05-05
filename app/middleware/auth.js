function requireAuth(req, res, next) {
  if (!req.session.authenticated) {
    return res.redirect('/login');
  }

  next();
}

function requirePendingMfa(req, res, next) {
  if (!req.session.pendingMfa) {
    return res.redirect('/login');
  }

  next();
}

module.exports = {
  requireAuth,
  requirePendingMfa,
};
