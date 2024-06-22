"use client";

import React from "react";
import * as L from "./style";
import Footer from "~/components/common/Footer";
import { Logo } from "~/components/icons";
import { useQuery } from "@tanstack/react-query";
import { accountQuery } from "~/services/account/query";
import NewsItem from "./NewsItem";
import { useUser } from "~/hooks/useUser";

const News = () => {
  const { data: newsList, isSuccess } = useQuery(accountQuery.getNews());
  const { user } = useUser();
  return (
    <L.Container>
      <L.Header>
        <L.LogoWrap>
          <Logo width={60} />
        </L.LogoWrap>
        <L.Title>
          {user.userName}님을 위한
          <br />
          fit한 최신 금융 뉴스
        </L.Title>
      </L.Header>
      <L.Body>
        <L.AccountText>따끈따끈 금융 뉴스</L.AccountText>
        <L.NewsList>
          {isSuccess &&
            newsList.data.items.map((news: any) => (
              <NewsItem key={news.name} {...news} />
            ))}
        </L.NewsList>
      </L.Body>
      <L.BodyScroller />
      <Footer />
    </L.Container>
  );
};

export default News;
