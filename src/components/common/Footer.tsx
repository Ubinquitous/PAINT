import { styled } from "@linaria/react";
import { flex, font, theme } from "~/styles";
import BookIcon from "../icons/BookIcon";
import HomeIcon from "../icons/HomeIcon";
import InvestIcon from "../icons/InvestIcon";
import SpendIcon from "../icons/SpendIcon";

const navigateList = [
  { icon: <HomeIcon />, name: "홈" },
  { icon: <SpendIcon />, name: "지출" },
  { icon: <InvestIcon />, name: "주식" },
  { icon: <BookIcon />, name: "뉴스" },
];

const Footer = () => {
  return (
    <Container>
      {navigateList.map((navigate) => (
        <Navigate key={navigate.name}>
          {navigate.icon}
          <NavigateText>{navigate.name}</NavigateText>
        </Navigate>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  width: 100%;
  padding: 14px 10%;
  background-color: ${theme.white};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.06);
  position: fixed;
  bottom: 0;
  ${flex.BETWEEN};
`;

const Navigate = styled.li`
  width: 30px;
  height: 54px;
  gap: 8px;
  ${flex.COLUMN_CENTER};
`;

const NavigateText = styled.span`
  ${font.H3};
  color: ${theme.grey};
  margin-top: auto;
`;

export default Footer;
