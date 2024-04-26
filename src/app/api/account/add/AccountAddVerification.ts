import { z } from "zod";

export const AccountAddVerification = z.object({
  password: z.string(),
  countryCode: z.string(),
  organization: z.string(),
  certFile: z.string(),
  certType: z.string(),
});
