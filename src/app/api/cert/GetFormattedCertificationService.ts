import GenerateCertTokenService from "../token/cert/GenerateCertTokenService";
import { prismaClient } from "~/lib/prismaClient";
import environment from "~/lib/globalEnv";
import { GetFormattedCertificationRequestDto } from "./GetFormattedCertificationRequestDto";
import { NextRequest } from "next/server";

const GetFormattedCertificationService = (req: NextRequest) => {
  const execute = async () => {
    const request = (await req.json()) as GetFormattedCertificationRequestDto;

    return new Promise((resolve) => {
      const generateCertTokenService = new GenerateCertTokenService();
      const socket = new WebSocket(environment.CERT_SOCKET_URL);

      socket.onopen = () => {
        sendCertificateToken();
      };

      socket.addEventListener("message", async (message) => {
        const res = JSON.parse(message.data);

        console.log(res);
        const isError = res[1].data.code === "CF-09992";
        const isSuccessCertificate =
          res[1].call_back === "codefcert_checkLicense" &&
          res[1].data.code === "CF-00000";

        const isPasswordError =
          res[1].call_back === "codefcert_getExportCertificationB64" &&
          !res[1].data.SUCCESS;
        const isSuccessGetCertification =
          res[1].call_back === "codefcert_getExportCertificationB64" &&
          res[1].data.SUCCESS;

        if (isError) {
          await generateCertTokenService.execute();
          sendCertificateToken();
        }
        if (isSuccessCertificate) {
          await sendRequestCertification();
        }
        if (isPasswordError) {
          socket.close();
          resolve({ status: 400, message: "비밀번호가 일치하지 않습니다." });
        }
        if (isSuccessGetCertification) {
          socket.close();
          resolve({
            status: 200,
            message: "공동인증서 인증에 성공했습니다.",
            data: res[1].data.CONVERT,
          });
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

      const sendRequestCertification = async () => {
        socket.send(
          `["codefcert_getExportCertificationB64",${JSON.stringify(request)}]`
        );
      };
    });
  };
  return { execute };
};

export default GetFormattedCertificationService;
