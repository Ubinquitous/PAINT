import constants from "constants";
import crypto from "crypto";
import environment from "./globalEnv";

export const publicEncRSA = (data: string) => {
  var pubkeyStr =
    "-----BEGIN PUBLIC KEY-----\n" +
    environment.PUBLIC_KEY +
    "\n-----END PUBLIC KEY-----";
  var bufferToEncrypt = Buffer.from(data);
  var encryptedData = crypto
    .publicEncrypt(
      { key: pubkeyStr, padding: constants.RSA_PKCS1_PADDING },
      bufferToEncrypt
    )
    .toString("base64");
  return encryptedData;
};
