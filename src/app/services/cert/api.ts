import { GetFormattedCertificationRequestDto } from "~/app/api/cert/GetFormattedCertificationRequestDto";
import { paint } from "..";

export const getLocalCertificateList = async () => {
  const { data } = await paint.get("/cert");
  return data;
};

export const requestCertificatePasswordMatch = async (
  request: GetFormattedCertificationRequestDto
) => {
  const { data } = await paint.post("/cert", request);
  return data;
};
