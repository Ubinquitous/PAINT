"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { userContext } from "~/context";
import { getUser } from "~/services/user/api";
import { UserType } from "~/types/user.type";
import { Storage } from "~/utils";

export const useUser = () => {
  const [user, setUser] = useAtom(userContext);

  const { data: userInfo } = useQuery<UserType>({
    queryKey: ["user.info"],
    queryFn: getUser,
    enabled: !!Storage.getItem("access_token"),
  });

  useEffect(() => {
    if (userInfo) setUser({ ...userInfo, isLoggedIn: true });
  }, [setUser, userInfo]);

  return {
    user,
    isLoggedIn: !!userInfo,
  };
};
