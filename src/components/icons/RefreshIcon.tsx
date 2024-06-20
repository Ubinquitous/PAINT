import { SVGProps } from "react";

const RefreshIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="17"
      height="19"
      {...props}
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0003 6H16.0003V1M15.7103 14.357C14.7787 15.7921 13.4117 16.8907 11.8097 17.4917C10.2078 18.0926 8.45541 18.1641 6.80985 17.6957C5.16429 17.2273 3.71224 16.2436 2.66688 14.8892C1.62153 13.5348 1.03793 11.8809 1.00179 10.1703C0.965639 8.45977 1.47884 6.78269 2.46604 5.3853C3.45325 3.98791 4.86244 2.94382 6.48675 2.40633C8.11105 1.86883 9.86489 1.86623 11.4908 2.39893C13.1167 2.93162 14.5289 3.97154 15.5203 5.366"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon;
