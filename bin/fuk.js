#!/usr/bin/env node

const argv = require("yargs").argv;
const { getToken } = require("../");

const { serviceAccount, apiKey, uid, email, phoneNumber } = argv;

async function main() {
  try {
    const token = await getToken({
      serviceAccount,
      apiKey,
      uid,
      email,
      phoneNumber,
    });
    console.log(token);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

main();
