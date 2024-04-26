import { z } from "zod";

export const GetFormattedCertificationVerification = z.object({
  certPassword: z.string(),
  certPath: z.string(),
  keyPath: z.string(),
});
