"use client";

import React from "react";
import * as L from "./style";
import { Logo } from "~/components/icons";
import { useRouter } from "next/navigation";

const Splash = () => {
  const router = useRouter();
  setTimeout(() => router.push("/main"), 1500);

  return (
    <L.SplashContainer>
      <Logo />
    </L.SplashContainer>
  );
};

export default Splash;
