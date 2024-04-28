import { z } from "zod";

export const ConnectedCommonVerifyVerficiation = z.object({
  organization: z.string(),
});
