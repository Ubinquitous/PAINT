"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "~/components/atoms/Loader";
import Footer from "~/components/common/Footer";
import { Logo } from "~/components/icons";
import { accountQuery } from "~/services/account/query";
import { withComma } from "~/utils";
import { GetAccountListDto } from "../api/account/list/GetAccountListDto";
import BankItem from "./BankItem";
import * as L from "./style";

const Page = () => {
  const { data: accountList, isSuccess } = useQuery({
    ...accountQuery.getAccountList(),
  });
  console.log(accountList);

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
        {isSuccess ? (
          <L.BankList>
            {accountList.data.map((account: GetAccountListDto) => (
              <BankItem
                key={account.id}
                organization={account.organization}
                accountName={account.accountName}
                balance={account.accountBalance}
              />
            ))}
            {/* <L.BodyFucker /> */}
          </L.BankList>
        ) : (
          <Loader />
        )}
      </L.Body>
      <L.BodyScroller />
      <Footer />
    </L.Container>
  );
};

export default Page;
