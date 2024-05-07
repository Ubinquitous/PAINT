"use client";

import React, { useState } from "react";
import * as L from "./style";
import { PartyEmoji } from "~/components/images";
import Image from "next/image";
import Button from "~/components/atoms/Button";
import TermsAgreeModal from "./TermsAgreeModal";

const Main = () => {
  const [isStart, setIsStart] = useState(false);

  return (
    <L.Container>
      <L.TutorialSliderContainer>
        <L.TutorialSliderLegend>
          <Image src={PartyEmoji} alt="emoji" width={50} height={50} />
        </L.TutorialSliderLegend>
      </L.TutorialSliderContainer>
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
