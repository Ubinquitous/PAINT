"use client";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Loader from "~/components/atoms/Loader";
import Footer from "~/components/common/Footer";
import { Logo } from "~/components/icons";
import { useUser } from "~/hooks/useUser";
import { accountQuery } from "~/services/account/query";
import { withComma } from "~/utils";
import { GetAccountListDto } from "../api/account/list/GetAccountListDto";
import BankItem from "./BankItem";
import NewsItem from "./NewsItem";
import { newsList } from "./newsList";
import * as L from "./style";

const Page = () => {
  const month = dayjs().month() + 1;
  const router = useRouter();
  const { user } = useUser();
  const { data: spendList, isSuccess: spendListSuccess } = useQuery(
    accountQuery.getSpendOfMonth(month)
  );
  const { data: accountList, isSuccess: accountListSuccess } = useQuery(
    accountQuery.getAccountList()
  );

  const handleOpenTradeModal = (accountNumber: string) => {
    router.push(`/trade/${accountNumber}`);
  };

  return (
    <L.Container>
      <L.Header>
        <L.LogoWrap>
          <Logo width={60} />
        </L.LogoWrap>
        <L.Title>
          {user.userName}님, 오늘도 <br />
          현명한 소비 하셨나요?
        </L.Title>
        <L.SubTitle>
          이번 달에 {spendListSuccess && withComma(spendList.expenditure)}원
          사용했어요
        </L.SubTitle>
      </L.Header>
      <L.Body>
        <L.BannerImage
          src="/assets/common/shinhan_card.png"
          alt="신한 카드"
          width={999}
          height={999}
        />
        <L.AccountText>내 계좌</L.AccountText>
        {accountListSuccess ? (
          <L.BankList>
            {accountList.data.map((account: GetAccountListDto) => (
              <BankItem
                onClick={() => handleOpenTradeModal(account.accountNumber)}
                key={account.id}
                organization={account.organization}
                accountName={account.accountName}
                balance={account.accountBalance}
              />
            ))}
          </L.BankList>
        ) : (
          <Loader />
        )}
        <L.AccountText>뉴스</L.AccountText>
        <L.NewsList>
          {newsList.map((news) => (
            <NewsItem key={news.name} {...news} />
          ))}
        </L.NewsList>
      </L.Body>
      <L.BodyScroller />
      <Footer />
    </L.Container>
  );
};

export default Page;
