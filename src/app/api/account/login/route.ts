import AccountLoginService from "./AccountLoginService";

export async function POST() {
  const accountLoginService = new AccountLoginService();
  return accountLoginService.execute();
}
