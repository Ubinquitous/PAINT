import { ConnectedVerifyRequestDto } from "~/lib/dto/ConnectedVerifyRequestDto";

export interface GetStockTradeListRequestDto extends ConnectedVerifyRequestDto {
  accountPassword: string;
  connectedId: string;
}
