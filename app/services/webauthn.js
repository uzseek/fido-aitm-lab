const { TextEncoder } = require('util');
const {
  generateRegistrationOptions,
  verifyRegistrationResponse,

  generateAuthenticationOptions,
  verifyAuthenticationResponse,

} = require('@simplewebauthn/server');

async function createRegistrationOptions(user) {
  return await generateRegistrationOptions({
    rpName: 'Shinano Securities',
    rpID: 'localhost',

    userID: new TextEncoder().encode(
      String(user.id)
    ),
    
    userName: user.username,

    attestationType: 'none',

    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
  });
}

async function verifyRegistration(
  response,
  expectedChallenge
) {
  return verifyRegistrationResponse({
    response,

    expectedChallenge,

    expectedOrigin: 'http://localhost:3000',

    expectedRPID: 'localhost',
  });
}

async function createAuthenticationOptions(
  user
) {
  return await generateAuthenticationOptions({
    rpID: 'localhost',

    allowCredentials:
      user.webauthnCredentials.map(
        (credential) => ({
          id: credential.id,
          type: 'public-key',
        })
      ),

    userVerification: 'preferred',
  });
}

async function verifyAuthentication(
  response,
  expectedChallenge,
  credential
) {

  return await verifyAuthenticationResponse({
    response,

    expectedChallenge,

    expectedOrigin:
      'http://localhost:3000',

    expectedRPID:
      'localhost',

    credential: {
      id: credential.id,

      publicKey:
        credential.publicKey,

      counter:
        credential.counter,
    },
  });
}

module.exports = {
  createRegistrationOptions,
  verifyRegistration,

  createAuthenticationOptions,
  verifyAuthentication,
};
