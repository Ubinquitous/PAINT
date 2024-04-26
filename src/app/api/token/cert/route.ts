import GenerateCertTokenService from "./GenerateCertTokenService";

export async function POST() {
  const generateCertTokenService = new GenerateCertTokenService();
  return generateCertTokenService.execute();
}
