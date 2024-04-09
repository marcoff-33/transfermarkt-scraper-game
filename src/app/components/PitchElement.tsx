import React, { SVGProps } from "react";

export interface PitchSvgProps extends React.SVGProps<SVGSVGElement> {}

export default function PitchElement(props: PitchSvgProps) {
  const { fill, className, color, stroke, opacity, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 452 684"
      height="100%"
      width="100%"
      opacity={opacity}
      className={className}
      {...rest}
    >
      <rect
        opacity="0"
        viewBox="0 0 452 684"
        height="100%"
        width="100%"
        ry="6"
      />
      <g stroke={stroke} stroke-width="3" fill={fill}>
        <path d="m11.22 22.62v638.8h429.6v-638.8z" fill={fill} />
        <path d="m11.26 342h429.4" stroke={fill} />
        <circle cy="342" cx="226" r="54.8" fill={fill} />
        <circle cy="342" cx="226" r="2" fill={fill} />
        <g id="a">
          <path
            d="m9.9 30.07c4.85 0 8.82-4 8.82-8.9m162.5 100.8a54.91 54.91 0 0 0 89.6 0m76.3-99.63v99.63h-242.2l.2-99.63m98.6.20v-15.6l44.6.003v15.6m-77.9-.20v34.4h111.2v-34.4m160.5 7.7c-4.9 0-8.8-4-8.8-8.9"
            stroke={stroke}
          />
          <circle cy="90" cx="226" r="2" fill={fill} />
        </g>
        <use transform="scale(1,-1)" y="-684" href="#a" />
      </g>
    </svg>
  );
}
