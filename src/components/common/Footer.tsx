import { styled } from "@linaria/react";
import { usePathname } from "next/navigation";
import { flex, font, theme } from "~/styles";
import {
  BookIcon,
  HomeIcon,
  InvestIcon,
  PensionIcon,
  SpendIcon,
} from "../icons";

const navigateList = [
  { icon: HomeIcon, name: "홈", router: "/home" },
  { icon: SpendIcon, name: "관리", router: "/analysis" },
  { icon: InvestIcon, name: "주식", router: "/invest" },
  { icon: BookIcon, name: "뉴스", router: "/news" },
  { icon: PensionIcon, name: "연금", router: "/pension" },
];

const Footer = () => {
  const currentPath = usePathname();

  return (
    <Container>
      {navigateList.map((navigate) => {
        const isCurrent = currentPath === navigate.router;
        const NavigationIcon = navigate.icon;
        return (
          <Navigate key={navigate.name}>
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

const Navigate = styled.li`
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
