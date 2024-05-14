"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

export const withLoginUser = (Component: () => ReactNode) => {
  const WrappedComponent = () => {
    const router = useRouter();

    useLayoutEffect(() => {
      if (!localStorage.getItem("access_token")) {
        alert("유효기간이 만료되었어요. 서비스에 다시 로그인해주세요!");
        router.push("/login");
      }
      // eslint-disable-next-line
    }, []);
    return <Component />;
  };

  return WrappedComponent;
};
