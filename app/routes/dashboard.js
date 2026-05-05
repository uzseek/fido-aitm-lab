const express = require('express');

const {
  requireAuth,
} = require('../middleware/auth');

const dashboardPage = require('../views/dashboard');

const router = express.Router();

router.get(
  '/dashboard',
  requireAuth,
  (req, res) => {
    res.send(
      dashboardPage(req.session.username)
    );
  }
);

module.exports = router;
