const express = require('express');

const users = require('../data/users');

const {
  requireAuth,
} = require('../middleware/auth');

const {
  createRegistrationOptions,
  verifyRegistration,

  createAuthenticationOptions,
  verifyAuthentication,

} = require('../services/webauthn');

const webauthnRegisterPage = require('../views/webauthnRegister');
const webauthnLoginPage = require('../views/webauthnLogin');

const router = express.Router();

router.get(
  '/webauthn/register',
  requireAuth,
  async (req, res) => {
    res.send(webauthnRegisterPage());
  }
);

router.get(
  '/webauthn/login',
  (req, res) => {
    res.send(
      webauthnLoginPage()
    );
  }
);

router.post(
  '/webauthn/register/options',
  requireAuth,
  async (req, res) => {
    const user = users.find(
      (u) => u.id === req.session.userId
    );

    const options =
      await createRegistrationOptions(user);

    req.session.currentChallenge =
      options.challenge;

    res.setHeader(
      'Content-Type',
      'application/json'
    );

    res.json(options);
  }
);

router.post(
  '/webauthn/register/verify',
  requireAuth,
  express.json(),
  async (req, res) => {

    try {

      const user = users.find(
        (u) => u.id === req.session.userId
      );

      const verification =
        await verifyRegistration(
          req.body,
          req.session.currentChallenge
        );

      const { verified, registrationInfo } =
        verification;

      if (!verified) {
        return res.json({
          verified: false,
        });
      }

      const credential =
        registrationInfo.credential;

      user.webauthnCredentials.push({
        id: credential.id,
        publicKey: credential.publicKey,
        counter: credential.counter,
      });

      res.json({
        verified: true,
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        error: 'Verification failed',
      });
    }
  }
);

router.post(
  '/webauthn/login/options',
  async (req, res) => {

    const user = users[0];

    const options =
      await createAuthenticationOptions(
        user
      );

    req.session.currentChallenge =
      options.challenge;

    res.json(options);
  }
);

router.post(
  '/webauthn/login/verify',
  express.json(),
  async (req, res) => {

    try {

      const user = users[0];

      console.log(req.body);

      const dbCredential =
        user.webauthnCredentials.find(
          (credentialItem) =>
            credentialItem.id === req.body.id
        );

      if (!dbCredential) {

        return res.json({
          verified: false,
        });
      }

      const verification =
        await verifyAuthentication(
          req.body,
          req.session.currentChallenge,
          dbCredential
        );

      const {
        verified,
        authenticationInfo,
      } = verification;

      if (verified) {

        dbCredential.counter =
          authenticationInfo.newCounter;

        req.session.authenticated = true;

        req.session.username =
          user.username;
      }

      return res.json({
        verified,
      });

    } catch (err) {

      console.error(err);

      return res.json({
        verified: false,
      });
    }
  }
);

module.exports = router;
