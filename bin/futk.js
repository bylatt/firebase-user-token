#!/usr/bin/env node

const yargs = require("yargs");
const { getToken } = require("../");
const { Clipboard } = require("@napi-rs/clipboard");

const { serviceAccount, apiKey, uid, email, phoneNumber, output, copy } = yargs
  .option("serviceAccount", {
    type: "string",
    describe: "Firebase service account file path",
  })
  .option("apiKey", { type: "string", describe: "Firebase API Key" })
  .option("output", {
    type: "string",
    describe: "Output of the program",
    choices: ["user", "token"],
  })
  .option("uid", { type: "string", describe: "Firebase user id" })
  .option("email", { type: "string", describe: "Firebase user email" })
  .option("phoneNumber", {
    type: "string",
    describe: "Firebase user phone number",
  })
  .option("copy", {
    type: "boolean",
    describe: "Copy output to clipboard",
  })
  .demandOption(["serviceAccount", "apiKey", "output"])
  .conflicts("uid", ["email", "phoneNumber"])
  .conflicts("email", ["uid", "phoneNumber"])
  .conflicts("phoneNumber", ["uid", "email"])
  .help().argv;

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
    const clipboard = new Clipboard();
    switch (output) {
      case "token":
        console.log(token);
        if (copy) {
          clipboard.setText(token);
        }
        break;
      case "user":
        console.log(user);
        if (copy) {
          clipboard.setText(JSON.stringify(user));
        }
        break;
      default:
        console.log("Error: invalid output");
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
}

main();
