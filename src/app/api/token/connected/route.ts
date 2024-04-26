import GenerateConnectedTokenService from "./GenerateConnectedTokenService";

export async function POST() {
  const generateConnectedTokenService = new GenerateConnectedTokenService();
  return generateConnectedTokenService.execute();
}
