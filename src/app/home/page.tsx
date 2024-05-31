"use client";

import Footer from "~/components/common/Footer";
import { Logo } from "~/components/icons";
import { withComma } from "~/utils";
import BankItem from "./BankItem";
import * as L from "./style";

const Page = () => {
  return (
    <L.Container>
      <L.Header>
        <L.LogoWrap>
          <Logo width={60} />
        </L.LogoWrap>
        <L.Title>
          박우빈님, 오늘도 <br />
          현명한 소비 하셨나요?
        </L.Title>
        <L.SubTitle>5월에 총 {withComma(428_410)}원 사용했어요</L.SubTitle>
      </L.Header>
      <L.Body>
        <L.BannerImage
          src="/assets/common/shinhan_card.png"
          alt="신한 카드"
          width={999}
          height={999}
        />
        <L.AccountText>내 계좌</L.AccountText>
        <L.BankList>
          <BankItem
            organization="0032"
            accountName="자유저축통장"
            balance={1_294_500}
          />
          <BankItem
            organization="0088"
            accountName="주거래우대통장"
            balance={182_000}
          />
          <BankItem
            organization="0034"
            accountName="주택청약"
            balance={420_000}
          />
        </L.BankList>
      </L.Body>
      <Footer />
    </L.Container>
  );
};

export default Page;
