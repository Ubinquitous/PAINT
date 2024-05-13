import { queryOptions } from "@tanstack/react-query";
import { getLocalCertificateList } from "./api";

export const certQuery = {
  getCertList: () =>
    queryOptions({
      queryKey: ["query.cert"],
      queryFn: getLocalCertificateList,
    }),
};
