"use client";

import React from "react";
import * as L from "./style";
import { useUser } from "~/hooks/useUser";
import Footer from "~/components/common/Footer";

const MyPage = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <L.Container>
      <L.Header>
        <L.Title>마이페이지</L.Title>
      </L.Header>
      <L.Body>
        <L.MyPageInfoBox>
          <L.MyPageText>이름 · {user.userName}</L.MyPageText>
          <L.MyPageText>생년월일 · {user.birthDate}</L.MyPageText>
          <L.MyPageLogoutButton>로그아웃</L.MyPageLogoutButton>
        </L.MyPageInfoBox>
      </L.Body>
      <Footer />
    </L.Container>
  );
};

export default MyPage;
