import { z } from "zod";

export const AccountRegisterVerification = z.object({
  password: z.string(),
  birthDate: z.string().min(6).max(6),
  identity: z.string(),
  userName: z.string(),
  countryCode: z.string(),
  organization: z.string(),
  certFile: z.string(),
  certType: z.string(),
});
