import { styled } from "@linaria/react";
import Link from "next/link";
import { flex, font, theme } from "~/styles";

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  gap: 16px;
  overflow-y: scroll;
  padding-bottom: 14%;
  background-color: ${theme.primary};
  ${flex.COLUMN_FLEX};
`;

export const Header = styled.header`
  color: ${theme.white};
  ${flex.COLUMN_FLEX};
  gap: 6dvh;
  padding: 50px 40px 10px 40px;
`;

export const Name = styled.span`
  color: ${theme.white};
  ${font.H2};
  font-weight: 500;
`;

export const Title = styled.h1`
  color: ${theme.white};
  ${font.D3};
  font-weight: 600;
`;

export const OptionButton = styled(Link)`
  color: ${theme.white};
  gap: 4px;
  margin-left: auto;
  ${font.H4};
  ${flex.VERTICAL};
`;

export const Body = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${theme.white};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 30px;
  gap: 32px;
  ${flex.COLUMN_FLEX};
`;

export const ScoreGraphWrap = styled.section`
  width: 100%;
  height: fit-content;
  padding: 40px 0;
  ${flex.CENTER};
`;

export const ScoreGraphOuter = styled.div`
  width: 44vw;
  height: 44vw;
  background-color: #f3f6fa;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  position: relative;
  ${flex.CENTER};
`;

export const PercentWrap = styled.div`
  z-index: 1;
  position: absolute;
`;

export const ScoreGraphInner = styled.div`
  width: 30vw;
  height: 30vw;
  background-color: ${theme.white};
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 9999px;
  ${flex.CENTER};
  z-index: 2;
`;

export const ScoreGraphScore = styled.div`
  ${font.H1};
  font-weight: 500;
  color: ${theme.gray};
  ${flex.VERTICAL};
  gap: 8px;

  h2 {
    color: ${theme.black};
    ${font.D2};
    font-weight: 600;
  }
`;

export const TopTextBox = styled.div`
  width: 100%;
  ${flex.CENTER};
`;

export const TopTextTag = styled.div`
  background-color: #e9efff;
  color: ${theme.primary};
  padding: 8px 20px;
  border-radius: 9999px;
  ${font.H2};
  ${flex.CENTER};
`;

export const AverageBox = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #f8f8fa;
  border-radius: 18px;
  ${flex.BETWEEN};
  justify-content: space-evenly;
`;

export const AverageScope = styled.span`
  ${font.H2};
  font-weight: 500;
`;

export const AverageScore = styled.span`
  gap: 4px;
  ${flex.VERTICAL};
  ${font.H2};
  font-weight: 500;
  h1 {
    color: ${theme.primary};
    ${font.H1};
  }
`;

export const Separator = styled.div`
  width: 2px;
  height: 28px;
  margin: 0 10px;
  background-color: ${theme.grey};
`;

export const TagItem = styled.div`
  width: 100%;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.05);
  background-color: ${theme.white};
  ${flex.BETWEEN};
`;

export const TagText = styled.span`
  ${font.H4};
`;

export const BodyScroller = styled.div`
  width: 100%;
  height: 10%;
`;

export const SectionBox = styled.div`
  gap: 14px;
  padding: 10px 0;
  ${flex.COLUMN_FLEX};
`;

export const SectionTitle = styled.h1`
  ${font.H2};
`;

export const TradeList = styled.ul`
  gap: 8px;
  ${flex.COLUMN_FLEX};
`;

export const ItemBox = styled.div`
  width: 100%;
  padding: 18px 22px;
  border-radius: 12px;
  background-color: #f8f8fa;
  ${flex.COLUMN_FLEX}
`;

export const ItemTitle = styled.h1`
  ${font.H2};
`;

export const ItemAmount = styled.h2`
  color: ${theme.gray};
  ${font.H3};
  font-weight: 500;
`;

export const ExpenditureBox = styled.div`
  width: 100%;
  ${flex.COLUMN_CENTER};
`;

export const ExpenditureText = styled.h1`
  text-align: center;
  ${font.H1};
  font-weight: 500;
`;

export const ExpenditureAmount = styled.h1`
  color: ${theme.gray};
  ${font.H1};
`;

export const AmountWarning = styled.span<{ isWarning: boolean }>`
  ${font.D3};
  color: ${(props) => (props.isWarning ? theme.red : theme.primary)};
`;
