const express = require('express');
const QRCode = require('qrcode');

const users = require('../data/users');

const {
  getTotpSecret,
  verifyTotp,
} = require('../services/totp');

const {
  requirePendingMfa,
} = require('../middleware/auth');

const loginPage = require('../views/login');
const loginFailedPage = require('../views/loginFailed');
const mfaSetupPage = require('../views/mfaSetup');
const mfaVerifyPage = require('../views/mfaVerify');
const mfaFailedPage = require('../views/mfaFailed');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.send(loginPage());
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password
  );

  if (user) {
    req.session.pendingMfa = true;

    req.session.userId = user.id;
    req.session.username = user.username;

    return res.redirect('/mfa/verify');
  }

  return res.send(loginFailedPage());
});

router.get('/mfa/setup', async (req, res) => {
  const mfaSecret = getTotpSecret();

  const qrCodeImage = await QRCode.toDataURL(
    mfaSecret.otpauth_url
  );

  res.send(
    mfaSetupPage(
      qrCodeImage,
      mfaSecret.base32
    )
  );
});

router.get(
  '/mfa/verify',
  requirePendingMfa,
  (req, res) => {
    res.send(mfaVerifyPage());
  }
);

router.post('/mfa/verify', (req, res) => {
  const { token } = req.body;

  const verified = verifyTotp(token);

  if (!verified) {
    return res.send(mfaFailedPage());
  }

  req.session.authenticated = true;
  req.session.pendingMfa = false;

  return res.redirect('/dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
