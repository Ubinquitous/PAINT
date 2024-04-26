import crypto from "crypto";
import constants from "constants";
import environment from "./globalEnv";

export const publicEncRSA = (data: string) => {
  var pubkeyStr =
    "-----BEGIN PUBLIC KEY-----\n" +
    environment.PUBLIC_KEY +
    "\n-----END PUBLIC KEY-----";
  var bufferToEncrypt = new Buffer(data);
  var encryptedData = crypto
    .publicEncrypt(
      { key: pubkeyStr, padding: constants.RSA_PKCS1_PADDING },
      bufferToEncrypt
    )
    .toString("base64");
  return encryptedData;
};
