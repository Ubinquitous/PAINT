import { SVGProps } from "react";
import { theme } from "~/styles";

const SpendIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 30 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 24C4.35 24 2.9375 23.4125 1.7625 22.2375C0.5875 21.0625 0 19.65 0 18V6C0 4.35 0.5875 2.9375 1.7625 1.7625C2.9375 0.5875 4.35 0 6 0H24C25.65 0 27.0625 0.5875 28.2375 1.7625C29.4125 2.9375 30 4.35 30 6V18C30 19.65 29.4125 21.0625 28.2375 22.2375C27.0625 23.4125 25.65 24 24 24H6ZM6 6H24C24.55 6 25.075 6.0625 25.575 6.1875C26.075 6.3125 26.55 6.5125 27 6.7875V6C27 5.175 26.7065 4.469 26.1195 3.882C25.5325 3.295 24.826 3.001 24 3H6C5.175 3 4.469 3.294 3.882 3.882C3.295 4.47 3.001 5.176 3 6V6.7875C3.45 6.5125 3.925 6.3125 4.425 6.1875C4.925 6.0625 5.45 6 6 6ZM3.225 10.875L19.9125 14.925C20.1375 14.975 20.3625 14.975 20.5875 14.925C20.8125 14.875 21.025 14.775 21.225 14.625L26.4375 10.275C26.1625 9.9 25.8125 9.594 25.3875 9.357C24.9625 9.12 24.5 9.001 24 9H6C5.35 9 4.7815 9.169 4.2945 9.507C3.8075 9.845 3.451 10.301 3.225 10.875Z"
        fill={fill || theme.grey}
      />
    </svg>
  );
};

export default SpendIcon;
