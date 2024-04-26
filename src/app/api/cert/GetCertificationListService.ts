import { NextResponse } from "next/server";
import GenerateCertTokenService from "../token/cert/GenerateCertTokenService";
import { prismaClient } from "~/lib/prismaClient";
import environment from "~/lib/globalEnv";

const GetCertificationListService = () => {
  const execute = () => {
    return new Promise((resolve) => {
      const generateCertTokenService = new GenerateCertTokenService();
      const socket = new WebSocket(environment.CERT_SOCKET_URL);

      socket.onopen = () => {
        sendCertificateToken();
      };

      socket.addEventListener("message", async (message) => {
        const res = JSON.parse(message.data);

        const isError = res[1].data.code === "CF-09992";
        const isSuccessCertificate =
          res[1].call_back === "codefcert_checkLicense" &&
          res[1].data.code === "CF-00000";
        const isSuccessGetCertList =
          res[1].call_back === "codefcert_getCertification";

        if (isError) {
          await generateCertTokenService.execute();
          sendCertificateToken();
        }
        if (isSuccessCertificate) {
          await sendRequestCertList();
        }
        if (isSuccessGetCertList) {
          resolve(res[1].data);
        }
      });

      const sendCertificateToken = async () => {
        const { access_token } = (await prismaClient.token.findUnique({
          where: { token_name: "cert" },
        })) || { access_token: null };
        socket.send(
          `["codefcert_checkLicense",{"codefToken": "${access_token}"}]`
        );
      };

      const sendRequestCertList = async () => {
        socket.send(`["codefcert_getCertification",""]`);
      };
    });
  };
  return { execute };
};

export default GetCertificationListService;
