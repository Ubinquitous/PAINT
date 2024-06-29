"use client";

import React, { useEffect, useState } from "react";
import * as L from "./style";
import { PartyEmoji } from "~/components/images";
import Image from "next/image";
import Button from "~/components/atoms/Button";
import TermsAgreeModal from "./TermsAgreeModal";
import { useUser } from "~/hooks/useUser";
import { useRouter } from "next/navigation";

const Main = () => {
  const [isStart, setIsStart] = useState(false);
  const { isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return router.push("/home");
  });

  return (
    <L.Container>
      <L.StyledImage
        src="/assets/common/tutorial.png"
        width={999}
        height={999}
        alt="tutorial"
      />
      <L.ServiceSloganText>
        과소비로 텅 비어버린 지갑,
        <div>
          <span>페인트</span>로 다시 칠해드릴게요
        </div>
      </L.ServiceSloganText>
      {isStart && <TermsAgreeModal onClose={() => setIsStart(false)} />}
      <Button onClick={() => setIsStart(true)}>시작하기</Button>
    </L.Container>
  );
};

export default Main;
