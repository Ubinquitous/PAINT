import { SVGProps } from "react";
import { theme } from "~/styles";

const HomeIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.0375977 23.7676V8.0775L12.0376 0.232422L24.0376 8.0775V23.7676H15.0376V14.6151H9.0376V23.7676H0.0375977Z"
        fill={fill || theme.grey}
      />
    </svg>
  );
};

export default HomeIcon;
