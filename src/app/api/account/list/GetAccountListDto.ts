export interface GetAccountListDto {
  id: number;
  organization: string;
  accountName: string;
  accountNumber: string;
  accountDisplay: string;
  accountBalance: number;
  accountCreatedAt: string;
  accountRefreshedAt: string;
}
