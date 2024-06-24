import { styled } from "@linaria/react";
import { flex, font } from "~/styles";

const tag = {
  현명해요: {
    background: "#CCFFCE",
    text: "#00C708",
  },
  갑작스러워요: {
    background: "#FFCCCC",
    text: "#C70000",
  },
  위험해요: {
    background: "#FFF7CC",
    text: "#EDD816",
  },
  괜찮아요: {
    background: "#CCE3FF",
    text: "#0043C7",
  },
  국민연금: {
    background: "#FFF8D4",
    text: "#FEDC28",
  },
  퇴직연금: {
    background: "#D4E0FF",
    text: "#2897FE",
  },
  주택연금: {
    background: "#D4FFD6",
    text: "#28FE64",
  },
  개인연금: {
    background: "#FF9F9F",
    text: "#CF3737",
  },
} as any;

interface TagProps {
  type: string;
}

const Tag = ({ type }: TagProps) => {
  return <Container {...tag[type]}>{type}</Container>;
};

const Container = styled.div<{ background: string; text: string }>`
  border-radius: 9999px;
  width: fit-content;
  padding: 4px 8px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.text};
  ${font.p2};
  ${flex.CENTER};
`;

export default Tag;
