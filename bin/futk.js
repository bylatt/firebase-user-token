#!/usr/bin/env node

const argv = require("yargs").argv;
const { getToken } = require("../");

const { serviceAccount, apiKey, uid, email, phoneNumber, output } = argv;

async function main() {
  try {
    const res = await getToken({
      serviceAccount,
      apiKey,
      uid,
      email,
      phoneNumber,
    });
    const { token, user } = res;
    switch (output) {
      case "token":
        console.log(token);
        break;
      case "user":
        console.log(user);
        break;
      default:
        console.log("Error: invalid output");
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

main();
