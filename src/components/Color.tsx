import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
  onClick?: () => void;
}
const Color = ({ color, onClick }: IProps) => {
  return (
    <span
      className="w-[25px] h-[25px] rounded-full cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={onClick}
    ></span>
  );
};

export default Color;
