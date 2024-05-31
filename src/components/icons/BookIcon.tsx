import { SVGProps } from "react";
import { theme } from "~/styles";

const BookIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="21"
      height="26"
      viewBox="0 0 21 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.97314 25.5C2.28564 25.5 1.69731 25.2554 1.20814 24.7662C0.718978 24.2771 0.473978 23.6883 0.473145 23V3C0.473145 2.3125 0.718144 1.72417 1.20814 1.235C1.69814 0.745833 2.28648 0.500833 2.97314 0.5H17.9731C18.6606 0.5 19.2494 0.745 19.7394 1.235C20.2294 1.725 20.474 2.31333 20.4731 3V23C20.4731 23.6875 20.2286 24.2762 19.7394 24.7662C19.2502 25.2562 18.6615 25.5008 17.9731 25.5H2.97314ZM9.22314 11.75L12.3481 9.875L15.4731 11.75V3H9.22314V11.75Z"
        fill={fill || theme.grey}
      />
    </svg>
  );
};

export default BookIcon;
