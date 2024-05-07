import React, { SVGProps } from "react";
import { theme } from "~/styles";

const Check = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.4375"
        y="0.950684"
        width="30"
        height="30"
        rx="15"
        fill={fill || theme.lightgray}
      />
      <path
        d="M21.9375 11.6173L13.2708 20.284L8.9375 15.9506"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Check;
