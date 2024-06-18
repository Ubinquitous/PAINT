import { styled } from "@linaria/react";
import Image from "next/image";
import Link from "next/link";
import { Column, Row } from "~/components/Flex";
import { flex, font, theme } from "~/styles";

interface NewsItemProps {
  name: string;
  description: string;
  href: string;
  src: string;
}

const NewsItem = ({ name, description, href, src }: NewsItemProps) => {
  return (
    <Container href={href} target="_blank">
      <Row justifyContent="space-between">
        <Column>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </Column>
        <CardImage src={src} width={999} height={999} alt={name} />
      </Row>
      <MoreButton>자세히 보기</MoreButton>
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
