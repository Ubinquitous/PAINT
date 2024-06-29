"use client";

import React, { useEffect, useRef } from "react";
import * as L from "./style";
import { Logo } from "~/components/icons";
import { useRouter } from "next/navigation";
import { useUser } from "~/hooks/useUser";

const Splash = () => {
  const router = useRouter();
  setTimeout(() => router.push("/landing"), 1500);

  return (
    <L.SplashContainer>
      <Logo />
    </L.SplashContainer>
  );
};

export default Splash;
