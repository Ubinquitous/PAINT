import React from "react";
import * as L from "./style";

const Page = () => {
  return (
    <L.Container>
      <h1>PAINT</h1>
      <L.DisplayLayout>
        <L.IPhoneOuter src="/assets/IPhone14.png" />
        <L.DisplayContainer>
          <iframe
            src="http://localhost:3000"
            allowFullScreen
            width="325"
            height="689"
          />
        </L.DisplayContainer>
      </L.DisplayLayout>
    </L.Container>
  );
};

export default Page;
