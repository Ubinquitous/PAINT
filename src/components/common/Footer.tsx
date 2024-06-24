import { styled } from "@linaria/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { flex, font, theme } from "~/styles";
import {
  BookIcon,
  HomeIcon,
  InvestIcon,
  MyPageIcon,
  PensionIcon,
  SpendIcon,
} from "../icons";

const navigateList = [
  { icon: HomeIcon, name: "홈", router: "/home" },
  { icon: SpendIcon, name: "관리", router: "/manage" },
  { icon: PensionIcon, name: "연금", router: "/pension" },
  { icon: BookIcon, name: "뉴스", router: "/news" },
  { icon: MyPageIcon, name: "마이", router: "/mypage" },
];

const Footer = () => {
  const currentPath = usePathname();

  return (
    <Container>
      {navigateList.map((navigate) => {
        const isCurrent = currentPath === navigate.router;
        const NavigationIcon = navigate.icon;
        return (
          <Navigate href={navigate.router} key={navigate.name}>
            <NavigationIcon fill={isCurrent ? theme.primary : theme.grey} />
            <NavigateText isCurrent={isCurrent}>{navigate.name}</NavigateText>
          </Navigate>
        );
      })}
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

const Navigate = styled(Link)`
  width: 30px;
  height: 54px;
  gap: 8px;
  ${flex.COLUMN_CENTER};
`;

const NavigateText = styled.span<{ isCurrent?: boolean }>`
  ${font.H3};
  color: ${(props) => (props.isCurrent ? theme.primary : theme.grey)};
  margin-top: auto;
`;

export default Footer;
