import { ConnectedCommonVerifyRequestDto } from "./ConnectedCommonVerifyRequestDto";

export interface ConnectedVerifyRequestDto
  extends ConnectedCommonVerifyRequestDto {
  account: string;
  startDate: string;
  endDate: string;
}
