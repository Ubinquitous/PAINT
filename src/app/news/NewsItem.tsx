import { styled } from "@linaria/react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Column, Row } from "~/components/Flex";
import { flex, font, theme } from "~/styles";

interface NewsItemProps {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

const NewsItem = ({ title, description, link, pubDate }: NewsItemProps) => {
  return (
    <Container href={link} target="_blank">
      <Row justifyContent="space-between">
        <Column>
          <Title dangerouslySetInnerHTML={{ __html: title }} />
          <Description dangerouslySetInnerHTML={{ __html: description }} />
        </Column>
      </Row>
      <Row justifyContent="space-between" alignItems="center">
        <MoreButton>자세히 보기</MoreButton>
        {dayjs(pubDate).format("YYYY년 M월 D일 A h시 m분")}
      </Row>
    </Container>
  );
};

const Container = styled(Link)`
  width: 100%;
  padding: 20px 24px;
  border-radius: 12px;
  background-color: #f6f8ff;
  gap: 10px;
  ${flex.COLUMN_FLEX};
`;

const Title = styled.h1`
  white-space: pre-wrap;
  ${font.H2};
`;

const Description = styled.p`
  ${font.p2};
  color: ${theme.gray};
`;

const CardImage = styled(Image)`
  width: 70px;
  height: auto;
  border-radius: 8px;
`;

const MoreButton = styled.button`
  border-radius: 999px;
  border: 1px solid ${theme.gray};
  width: fit-content;
  padding: 3px 8px;
  ${font.p2};
  ${flex.CENTER};
`;

export default NewsItem;
