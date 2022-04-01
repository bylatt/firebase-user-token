const admin = require("firebase-admin");
const axios = require("axios");

async function createUserToken(auth, apiKey, uid) {
  const customToken = await auth.createCustomToken(uid);
  const res = await axios({
    url: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${apiKey}`,
    method: "post",
    data: {
      token: customToken,
      returnSecureToken: true,
    },
    json: true,
  });

  return res.data.idToken;
}

async function getUser(auth, uid, email, phoneNumber) {
  if (uid) {
    return auth.getUser(uid);
  } else if (email) {
    return auth.getUserByEmail(email);
  } else if (phoneNumber) {
    return auth.getUserByPhoneNumber(phoneNumber);
  }
}

function validateOptions(options) {
  const { serviceAccount, apiKey, uid, email, phoneNumber } = options;
  if (!serviceAccount) {
    throw new Error("Service account required, please provide serviceAccount");
  }
  if (!apiKey) {
    throw new Error("Api key required, please provide apiKey");
  }
  if (!uid && !email && !phoneNumber) {
    throw new Error(
      "User identity required, please provide one of uid, email or phoneNumber"
    );
  }
}

async function getToken(options) {
  validateOptions(options);
  const { serviceAccount, apiKey, uid, email, phoneNumber } = options;
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  const auth = app.auth();
  const user = await getUser(auth, uid, email, phoneNumber);
  const token = await createUserToken(auth, apiKey, user.uid);
  return token;
}

module.exports = { getUser, createUserToken, getToken };
