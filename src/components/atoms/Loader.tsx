import { styled } from "@linaria/react";
import { BounceLoader } from "react-spinners";
import { flex, theme } from "~/styles";

const Loader = () => {
  return (
    <Container>
      <BounceLoader color={theme.primary} size={30} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  ${flex.CENTER};
`;

export default Loader;
