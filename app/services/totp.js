const speakeasy = require('speakeasy');

const mfaSecret = speakeasy.generateSecret({
  name: 'FIDO-AiTM-Lab',
});

function getTotpSecret() {
  return mfaSecret;
}

function verifyTotp(token) {
  return speakeasy.totp.verify({
    secret: mfaSecret.base32,
    encoding: 'base32',
    token,
  });
}

module.exports = {
  getTotpSecret,
  verifyTotp,
};
